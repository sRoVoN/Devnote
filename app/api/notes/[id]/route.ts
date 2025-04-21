// app/api/notes/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { Post } from '../route';

// GET a single note by ID

export async function GET(request: NextRequest, context: any) {
  const { id } = await context.params;

  const isDemoNote = !isNaN(Number(id));

  if (isDemoNote) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) return NextResponse.json({ message: 'Note not found' }, { status: 404 });

    const data = await res.json();
    return NextResponse.json({ data });
  }

  // Handle custom UUID notes
  const res = await fetch(`http://localhost:3000/api/notes`, {
    cache: 'no-store',
  });

  if (!res.ok) return NextResponse.json({ message: 'Failed to load notes' }, { status: 500 });

  const allNotes = await res.json();
  const note = allNotes.data.find((n: any) => n.id === id);

  if (!note) return NextResponse.json({ message: 'Note not found' }, { status: 404 });

  return NextResponse.json({ data: note });
}


// DELETE a note by ID
export async function DELETE(request: NextRequest, context: Context) {
  const { id } = await context.params

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

// PUT (update) a note by ID
type Context = {
  params: {
    id: string
  }
}
export async function PUT(request: NextRequest, context: Context) {
  const { id } = await context.params;
  const json = await request.json();
  const { title, body: content } = json;

  console.log("🟡 Received update request:");
  console.log("ID:", id);
  console.log("Title:", title);
  console.log("Body:", content);

  const isDemoNote = !isNaN(Number(id)); // Check if it's a real JSONPlaceholder note

  if (!isDemoNote) {
    console.log("🟢 This is a fake note. Returning updated data directly.");
    return NextResponse.json({
      message: "Note updated (fake)",
      id,
      title,
      body: content,
      userId: 1,
    });
  }

  // Log what you're about to send to JSONPlaceholder
  const payload = {
    id: Number(id),
    title,
    body: content,
    userId: 1,
  };
  console.log("🟠 Sending to JSONPlaceholder:", payload);

  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json; charset=UTF-8" },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("❌ Failed to update post:", errorText);
    return NextResponse.json({ message: "Failed to update post" }, { status: 500 });
  }

  const updatedPost = await res.json();
  console.log("✅ JSONPlaceholder response:", updatedPost);

  const normalizedNote: Post = {
    id: String(updatedPost.id),
    title: updatedPost.title,
    body: updatedPost.body,
    userId: updatedPost.userId,
  };

  return NextResponse.json({
    message: "Post updated successfully",
    ...normalizedNote,
  });
}


