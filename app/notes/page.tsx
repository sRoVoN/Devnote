"use client";
import { Post } from "../(server)/api/notes/route";
import NewNotePage from "../components/new";
import NoteCard from "../components/note-card";
import { useEffect, useState } from "react";
import { useNotes } from "../context/NotesContext";
import ScrollButtons from "../components/scrollButtons";

async function getNotes() {
  const res = await fetch("http://localhost:3000/api/notes");
  const data = await res.json();
  return data.posts;
}

export default function NotesPage() {
  const { notes, setNotes } = useNotes();
  const [responseMessage, setResponseMessage] = useState("");
  const [showTopButton, setShowTopButton] = useState(false);
  const [showBottomButton, setShowBottomButton] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("note");
    if (data !== null) setNotes(JSON.parse(data));
  }, []);

  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await getNotes();
        setNotes((prev) => {
          const newPosts: Post[] = postsData.filter(
            (post: Post) =>
              !prev.some((existingPost) => existingPost.id === post.id)
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
        showTopButton={showBottomButton}
        scrollToTop={scrollToTop}
        showBottomButton={showBottomButton}
        scrollToBottom={scrollToBottom}
      />
    </>
  );
}
