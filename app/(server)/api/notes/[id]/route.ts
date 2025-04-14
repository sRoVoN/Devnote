import { Post } from '@/app/(server)/api/notes/route';


import { NextRequest, NextResponse } from 'next/server';


export async function GET(request: NextRequest, context: { params: { id: string } }) {
    const { id } = await context.params; // Await the params before using them    
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "GET",
        headers: {
            'Content-Type': "application/json",
        }
    })
    const data = await res.json();
    return NextResponse.json({data});
}

export async function DELETE(  request: NextRequest,
  { params }: { params: { id: string } } ) {
    const { id } = params;
  
    if (!id) {
      return NextResponse.json({ message: 'Post ID is required' }, { status: 400 });
    }
  
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
      });
  
      if (!res.ok) {
        throw new Error('Failed to delete post');
      }
  
      return NextResponse.json({ message: 'Post deleted successfully' }, { status: 200 });
    } catch (error) {
      console.error('DELETE error:', error);
      return NextResponse.json({ message: 'Failed to delete post' }, { status: 500 });
    }
  }

  export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const body = await request.json();
    const { title, body: content } = body;
    const id = params.id;
  
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          id: Number(id),
          title,
          body: content,
          userId: 1, 
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
  
      if (!res.ok) {
        throw new Error('Failed to update post');
      }
  
      const updatedPost = await res.json();
  
      // Return success response
      return NextResponse.json({
        message: 'Post updated successfully',
        data: updatedPost,
      }, { status: 200 });
    } catch (error) {
      console.error('Error updating post:', error);

      return NextResponse.json({
        message: 'Failed to update post',
        error: error instanceof Error ? error.message : 'Unknown error',
      }, { status: 500 });
    }
  }
  