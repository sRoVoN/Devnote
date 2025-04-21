// app/notes/[id]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ClientNotePage from '@/app/components/clientPage'

interface Props {
  params: { id: string }
}

function isNumericId(id: string) {
  return !isNaN(Number(id))
}

export default async function Page({ params }: Props) {
  const id = params.id
  let note: any = null

  if (isNumericId(id)) {
    // Fetch from API for demo note
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    if (!res.ok) return notFound()
    note = await res.json()
  } else {
    // 🧠 This only works on the client!
    return (
      <ClientNotePage id={id} />
    )
  }

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
