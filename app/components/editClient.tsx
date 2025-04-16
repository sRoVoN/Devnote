"use client";

import { useState, useEffect } from "react";
import { useNotes } from "@/app/context/NotesContext";
import { useRouter } from "next/navigation";
import EditForm from "./editform";
import { Post } from "@/app/(server)/api/notes/route";

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
          setNote(data);
          setEditedTitle(data.title);
          setEditedBody(data.body);
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

    const res = await fetch(
      isDemoNote
        ? `https://jsonplaceholder.typicode.com/posts/${id}`
        : `/api/notes/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedNote),
      }
    );

    if (res.ok) {
      setNotes((prev) =>
        prev.map((n) => (n.id === updatedNote.id ? updatedNote : n))
      );
      router.push("/notes");
    } else {
      alert("Failed to update note.");
    }
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
