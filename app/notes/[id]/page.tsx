// app/notes/[id]/page.tsx

import Link from 'next/link'
import { notFound } from 'next/navigation'

interface Props {
  params: { id: string }
}

export async function getNote( id: string) {
  const res = await fetch(`http://localhost:3000/api/notes/${id}`, {
    cache: 'no-store', // optional: avoids caching stale note data
  })

  if (!res.ok) return null

  const data = await res.json()
  return data.data
}

export default async function Page({ params }: Props) {
  const note = await getNote(params.id);
  


  if (!note) return notFound()

  return (
    <div className="flex min-h-screen justify-center items-center ">
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
