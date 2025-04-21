// components/ClientNotePage.tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type Note = {
  id: string
  title: string
  body: string
}

export default function ClientNotePage({ id }: { id: string }) {
  const [note, setNote] = useState<Note | null>(null)

  useEffect(() => {
    const data = localStorage.getItem('notes')
    if (data) {
      const notes = JSON.parse(data) as Note[]
      const found = notes.find((n) => n.id === id)
      if (found) setNote(found)
    }
  }, [id])

  if (!note) return <div className="text-center mt-20">Note not found</div>

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="inline-flex w-full items-center p-5 text-base font-medium text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white mt-1">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold mb-4">{note.title}</h1>
          <p className="mb-4">{note.body}</p>
          <Link
            href={`/notes/${note.id}/edit`}
            className="text-white bg-amber-500 hover:bg-amber-600 px-4 py-2 rounded-lg text-center"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  )
}
