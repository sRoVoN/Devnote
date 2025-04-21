"use client";
import { useState, useContext } from "react";
import { createContext } from "react";
import { Post } from "../api/notes/route";

type NotesContextType = {
    notes: Post[];
    setNotes: React.Dispatch<React.SetStateAction<Post[]>>;
  };

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
    const [notes, setNotes] = useState<Post[]>([]);
    return (
        <NotesContext.Provider value={{ notes, setNotes }}>
          {children}
        </NotesContext.Provider>
      );
}
export const useNotes = () => {
    const context = useContext(NotesContext);
    if (!context) throw new Error("useNotes must be used within NotesProvider");
    return context;
  };
