"use client";

import { useEffect, useState } from "react";
import { useNotes } from "@/app/context/NotesContext";
import { useRouter } from "next/navigation";
import EditForm from "./editform";
import { Post } from "@/app/(server)/api/notes/route";

type EditClientProps = {
  id: string;
};

export default function EditClient({ id }: EditClientProps) {
  const [editedTitle, setEditedTitle] = useState("");
  const [editedBody, setEditedBody] = useState("");
  const [note, setNote] = useState<Post>();
  const { notes, setNotes } = useNotes();
  const router = useRouter();

  useEffect(() => {
    const existingNote = notes.find((n) => n.id === id);
    if (existingNote) {
      setNote(existingNote);
      setEditedTitle(existingNote.title);
      setEditedBody(existingNote.body);
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
        prev.map((note) => (note.id === id ? updatedNote : note))
      );
      router.push("/notes");
    } else {
      const err = await res.json();
      alert(err.message || "Failed to update note");
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
