import { NextResponse, type NextRequest } from "next/server"
import { v4 as uuidv4 } from 'uuid';
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

// Proxy to JSONPlaceholder
export async function GET() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      next: { revalidate: 60 }, // Cache for 60 seconds, better than no-store for performance
    })

    if (!res.ok) {
      throw new Error(`Failed to fetch posts: ${res.status}`)
    }

    const posts = (await res.json()) as Post[]
  
    // Fetch users to get usernames
    const usersRes = await fetch("https://jsonplaceholder.typicode.com/users", {
      next: { revalidate: 3600 }, // Cache users for longer as they change less frequently
    })

    if (!usersRes.ok) {
      throw new Error(`Failed to fetch users: ${usersRes.status}`)
    }

    const users = (await usersRes.json()) as User[]

    // Enhance posts with user data
    const enhancedPosts = posts.map((post: Post) => {
      const user = users.find((u: User) => u.id === post.userId)
      return {
        ...post,
        username: user ? user.username : "Unknown",
      } as EnhancedPost
    })

    return NextResponse.json({
      posts: enhancedPosts,
      skip: 0,
    })
  } catch (error) {
    console.error("Error fetching posts:", error)
    return NextResponse.json({ message: "Failed to fetch posts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  let body;
  const generatedId = uuidv4();
  
  try {
    body = await request.json();
  } catch (err) {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const { title, body: content } = body;

  if (!title || !content) {
    return NextResponse.json({ message: "Title and body are required" }, { status: 400 });
  }

  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        body: content,
        userId: 1,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to create post: ${errorText}`);
    }

    const fakeResponse = await res.json();

    // Inject your real ID before returning
    const newPost = {
      ...fakeResponse,
      id: generatedId,
    };
    console.log(newPost)
    return NextResponse.json({ message: "Post created successfully", data: newPost }, { status: 201 });

  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ message: "Failed to create post", error: String(error) }, { status: 500 });
  }
}

