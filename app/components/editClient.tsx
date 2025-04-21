"use client";

import { useState, useEffect } from "react";
import { useNotes } from "@/app/context/NotesContext";
import { useRouter } from "next/navigation";
import EditForm from "./editform";
import { Post } from "@/app/api/notes/route";

export default function EditClient({ id }: { id: string }) {
  const [editedTitle, setEditedTitle] = useState("");
  const [editedBody, setEditedBody] = useState("");
  const [note, setNote] = useState<Post>();
  const { notes, setNotes } = useNotes();
  const router = useRouter();

  useEffect(() => {
    const existing = notes.find((n) => String(n.id) === id);
    if (existing) {
      setNote(existing);
      setEditedTitle(existing.title);
      setEditedBody(existing.body);
    } else {
      fetch(`/api/notes/${id}`)
        .then((res) => res.json())
        .then((data) => {
          const noteData = data.data || data; // Use the note inside the `data` wrapper
          setNote(noteData);
          setEditedTitle(noteData.title);
          setEditedBody(noteData.body);
        });
    }
  }, [id, notes]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const updatedNote: Post = {
      id,
      title: editedTitle,
      body: editedBody,
      userId: 1,
    };
  
    const isDemoNote = !isNaN(Number(id));
    const endpoint = isDemoNote
      ? `https://jsonplaceholder.typicode.com/posts/${id}`
      : `/api/notes/${id}`;
  
    console.log("🔄 Sending update to", endpoint, updatedNote);
  
    const res = await fetch(endpoint, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedNote),
    });
  
    if (!res.ok) {
      alert("❌ Failed to update note.");
      return;
    }
  
    const responseData = await res.json();
    console.log("✅ Response from server:", responseData);
  
    const updatedNoteData: Post = {
      id: typeof responseData.id === "string" ? responseData.id : String(responseData.id), // Normalize here
      title: responseData.title,
      body: responseData.body,
      userId: responseData.userId,
    };
    
  
    setNotes((prev) => {
      console.log("🧠 Previous notes:", prev.map((n) => [typeof n.id, n.id]));
      console.log("🆕 Updated note:", [typeof updatedNoteData.id, updatedNoteData.id]);
    
      const withoutOld = prev.filter((n) => String(n.id) !== String(updatedNoteData.id));
      const newNotes = [...withoutOld, updatedNoteData].sort((a, b) => Number(a.id) - Number(b.id));
    
      console.log("📦 New notes in context:", newNotes.map((n) => n.id));
      return newNotes;
    });
    
  
    router.refresh(); // Force revalidation (optional)
    router.push("/notes");
  };
  

  if (!note) return <div>Loading...</div>;

  return (
    <EditForm
      handleSubmit={handleSubmit}
      setEditedTitle={setEditedTitle}
      editedTitle={editedTitle}
      editedBody={editedBody}
      setEditedBody={setEditedBody}
      note={note}
    />
  );
}
