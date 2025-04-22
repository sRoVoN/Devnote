"use client";

import NewNotePage from "../components/new";
import NoteCard from "../components/note-card";
import { useEffect, useState } from "react";
import { useNotes } from "../context/NotesContext";
import ScrollButtons from "../components/scrollButtons";
import { Post } from "../api/notes/route";
import { getLocalNotes, saveLocalNotes } from "@/lib/localstorage";


async function getNotes(): Promise<Post[]> {
  try {
    const res = await fetch("http://localhost:3000/api/notes", {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch notes");

    const data = await res.json();
    return data.data || data.posts || []; 
  } catch (error) {
    console.error("getNotes error:", error);
    return []; 
  }
}


export default function NotesPage() {
  const { notes, setNotes } = useNotes();
  const [responseMessage, setResponseMessage] = useState("");
  const [showTopButton, setShowTopButton] = useState(false);
  const [showBottomButton, setShowBottomButton] = useState(false);

  useEffect(() => {
    const notes = getLocalNotes();
    setNotes(notes);
  }, []);
  
  useEffect(() => {
    if (notes.length > 0) {
      saveLocalNotes(notes);
    }
  }, [notes]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await getNotes();
        if (!Array.isArray(postsData)) return;
  
        setNotes((prev) => {
          // Normalize the ids of the posts coming from the API
          const normalizedPosts: Post[] = postsData.map((post: Post) => ({
            ...post,
            id: String(post.id),
          }));
  
          const newPosts: Post[] = normalizedPosts.filter(
            (post: Post) =>
              !prev.some((existingPost) => String(existingPost.id) === String(post.id))
          );
          return [...prev, ...newPosts];
        });
      } catch (error) {
        console.error("Error fetching posts:", error);
        setResponseMessage("Failed to load posts");
      }
    };
  
    fetchPosts();
  }, []);  
  

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;

    setShowTopButton(scrollTop > 200);
    setShowBottomButton(scrollTop + windowHeight < documentHeight - 20);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <NewNotePage />
      {notes.length > 0
        ? notes.map((note, index) => (
            <div key={index}>
              <NoteCard title={note.title} body={note.body} id={note.id} />
            </div>
          ))
        : null}
      <ScrollButtons
        showTopButton={showTopButton}
        scrollToTop={scrollToTop}
        showBottomButton={showBottomButton}
        scrollToBottom={scrollToBottom}
      />
    </>
  );
}
