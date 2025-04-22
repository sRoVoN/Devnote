// lib/localStorage.ts
import { Post } from "@/app/api/notes/route";

export function getLocalNotes(): Post[] {
  try {
    const data = localStorage.getItem("notes");
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("❌ Failed to parse local notes:", e);
    return [];
  }
}

export function saveLocalNotes(notes: Post[]) {
  localStorage.setItem("notes", JSON.stringify(notes));
}
