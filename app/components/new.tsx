
'use client';

import { useRef, useState } from 'react';
import { useNotes } from '../context/NotesContext';
import { v4 as uuidv4 } from 'uuid';


export default function NewNotePage() {
  const { notes, setNotes } = useNotes();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const containerRef =  useRef<HTMLDivElement>(null);
  
  const handleFocus = () => {
    if(containerRef.current){
      containerRef.current.style.backgroundColor = "black"
    }
  }
  const handleBlur = () => {
    if (containerRef.current) {
      containerRef.current.style.backgroundColor = '#f59e0b'; // amber-500
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const id = uuidv4();
    const newPost = { title, body, id };

    const res = await fetch("/api/notes", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    });

    const data = await res.json();

    if (res.ok) {
        setNotes((prev) => [...prev, data.data])
      setResponseMessage('Post created successfully!');
      console.log(notes)
    } else {
      setResponseMessage(`Error: ${data.message}`);
    }
    // Clear the form fields after submission (optional)
    setTitle('');
    setBody('');
  };

  return (
    <div ref={containerRef} className='flex flex-col w-full bg-amber-500 text-gray-500 justify-center items-center'>
      <h1 className='text-shadow-2xs text-2xl m-2'>Create New Post</h1>
      <form onSubmit={handleSubmit} className=' bg-amber-500 rounded-2xl md:px-10 md:py-1'>
        <div className='mt-2'>
          <label className='text-2xl text-white'>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className='w-full border-2 rounded-2xl outline-0 p-2'
            required
          />
        </div>
        <div className='mt-2'>
          <label className='text-2xl text-white'>Body:</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className='w-full p-2 overflow-y-scroll outline-0 border-2 rounded-2xl'
            required
          />
        </div>
        <button type="submit" className='cursor-pointer bg-green-300 p-3 hover:bg-green-400 mt-2 rounded-2xl w-full'
        >Create Post</button>
      </form>

      {responseMessage && <p className='text-white'>{responseMessage}</p>}
    </div>
  );
}
