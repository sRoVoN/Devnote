// app/api/notes/route.ts

import { NextResponse, type NextRequest } from "next/server"
import { v4 as uuidv4 } from 'uuid'

export type User = {
  id: number
  username: string
}
export type Post = {
  id: string
  userId: number
  title: string
  body: string
}
type EnhancedPost = Post & {
  username: string
}
// 🔐 In-memory store for custom notes (UUID-based)
const customNotes: EnhancedPost[] = []
// GET all notes
export async function GET() {
  try {
    // Fetch demo notes from JSONPlaceholder
    const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10", {
      headers: { "content-type": "application/json" },
      next: { revalidate: 60 },
    })

    if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status}`)

    const posts = (await res.json()) as Post[]

    // Fetch users
    const usersRes = await fetch("https://jsonplaceholder.typicode.com/users", {
      next: { revalidate: 3600 },
    })

    if (!usersRes.ok) throw new Error(`Failed to fetch users: ${usersRes.status}`)

    const users = (await usersRes.json()) as User[]

    // Enhance posts
    const enhancedPosts: EnhancedPost[] = posts.map(post => {
      const user = users.find(u => u.id === post.userId)
      return {
        ...post,
        username: user?.username ?? "Unknown",
      }
    })
    // Combine demo and custom notes
    const allNotes = [...customNotes, ...enhancedPosts]
    return NextResponse.json({ data: allNotes, skip: 0 })
  } catch (error) {
    console.error("Error fetching posts:", error)
    return NextResponse.json({ message: "Failed to fetch posts" }, { status: 500 })
  }
}

// POST a new note
export async function POST(request: NextRequest) {
  let body
  const generatedId = uuidv4()

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 })
  }

  const { title, body: content } = body

  if (!title || !content) {
    return NextResponse.json({ message: "Title and body are required" }, { status: 400 })
  }

  try {
    // Still send to JSONPlaceholder for mock response
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body: content, userId: 1 }),
    })

    if (!res.ok) throw new Error("Failed to create post")

    const fakePost = await res.json()

    const newNote: EnhancedPost = {
      id: generatedId,
      title,
      body: content,
      userId: 1,
      username: "customUser", // or get from session later
    }
    // ✅ Save in memory
    customNotes.push(newNote)

    return NextResponse.json({ message: "Post created successfully", data: newNote }, { status: 201 })
  } catch (error) {
    console.error("Error creating post:", error)
    return NextResponse.json({ message: "Failed to create post", error: String(error) }, { status: 500 })
  }
}
