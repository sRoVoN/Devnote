// app/api/notes/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'

type RouteContext = {
  params: {
    id: string
  }
}

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  const { id } = context.params

  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    headers: { 'Content-Type': 'application/json' },
  })

  const data = await res.json()
  return NextResponse.json({ data })
}

export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  const { id } = context.params

  if (!id) {
    return NextResponse.json({ message: 'Post ID is required' }, { status: 400 })
  }

  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
    })

    if (!res.ok) throw new Error('Failed to delete post')

    return NextResponse.json({ message: 'Post deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error('DELETE error:', error)
    return NextResponse.json({ message: 'Failed to delete post' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  const { id } = context.params
  const json = await request.json()
  const { title, body: content } = json

  const isDemoNote = !isNaN(Number(id))

  if (!isDemoNote) {
    return NextResponse.json({
      message: 'Note updated (fake)',
      data: { id, title, body: content, userId: 1 },
    })
  }

  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      id: Number(id),
      title,
      body: content,
      userId: 1,
    }),
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
  })

  if (!res.ok) {
    return NextResponse.json({ message: 'Failed to update post' }, { status: 500 })
  }

  const updatedPost = await res.json()

  return NextResponse.json({
    message: 'Post updated successfully',
    data: updatedPost,
  })
}
