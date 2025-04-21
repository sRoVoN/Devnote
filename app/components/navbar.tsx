"use client";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Post } from "../api/notes/route";
import { useNotes } from "../context/NotesContext";
import { useSession } from "next-auth/react";
import SearchInput from "./searchInput";
import ThemeBtn from "./themeBtn";
import Logo from "./logo";

export default function Navbar() {
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();
  const [search, setSearch] = useState<Post["title"]>("");
  const [filteredNotes, setFilteredNotes] = useState<Post[]>([]);
  const { notes, setNotes } = useNotes();
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log("Theme:", theme);
  }, [theme]);
  useEffect(() => {
    console.log("Mounted:", mounted);
  }, [mounted]);
    
  useEffect(() => {
    setMounted(true); 
  }, []);
 
  useEffect(() => {
    if (status === "unauthenticated" && window.location.pathname.startsWith("/notes")) {
      window.location.href = "/api/auth/signin?callbackUrl=/notes";
    }
  }, [status]);
  

  const handleToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  const handleSearch = (): void => {
    const filtered = notes.filter((note) =>
      note.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredNotes(filtered);
  };

  if (!mounted) return null;

  return (
    <>
      <nav className="bg-gray-500 text-black dark:text-white border-gray-200 dark:bg-gray-700 sticky top-0 z-50">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Logo />
          {
            notes.length > 0 ? (<Link href="/auth/signout" className="text-sm text-orange-500 dark:text-yellow-500 hover:opacity-50">
              Sign out
            </Link>) : (null)
          }
          {
            session?.user ? (<p className="text-pink-500">{`Hi ${session.user?.name}`}</p>) : (null)
          }
          <div className="flex md:order-2">
            <SearchInput search={search} handleSearch={handleSearch} setSearch={setSearch} filteredNotes={filteredNotes} />            
          </div>
          <div>
            <ThemeBtn handleToggle={handleToggle} />
          </div>
        </div>
      </nav>
    </>
  );
}
