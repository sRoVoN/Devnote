"use client"

import Link from "next/link";
import { useNotes } from "../context/NotesContext";


interface ButtonsProps {
    content: string,
    id: string,
}

export default function Buttons({content, id}: ButtonsProps) {
    const { notes, setNotes } = useNotes();

    const handleDelete = async (id: string) => {
      const res = await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
      });
    
      const data = await res.json();
    
      if (res.ok) {
        console.log('Deleted!');
        setNotes((prev) => prev.filter((note) => note.id !== id)); // compare string to string
      } else {
        console.error('Delete failed:', data.message);
      }
    };
    
  return (
    <div className="flex  m-5">
     <div className="ml-5">
        <button
        className="cursor-pointer border rounded-lg bg-amber-500 w-30 hover:bg-amber-600"        
        >
        <Link href={`/notes/${id}/edit`}>Edit</Link>
        </button>
     </div>
     <div  className="ml-5">
     <button
        className="cursor-pointer border rounded-lg bg-red-500 w-30 hover:bg-red-600"
        onClick={() => handleDelete((id))}  
        >
        Delete
        </button>
     </div>
    </div>
  )
}
