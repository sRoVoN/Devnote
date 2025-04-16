// app/notes/[id]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';

// This is the async function for fetching the note data.
async function getNote(id: string | number) {
  const res = await fetch(`http://localhost:3000/api/notes/${id}`);

  if (!res.ok) {
    return null; 
  }

  const data = await res.json();
  console.log(data.data, "data");
  return data.data || null;
}

type Props = {
  params: {
    id: string; // ID is string here as it comes from the URL
  };
};

export default async function PostDetailPage({ params }: Props) {
  // Convert the string ID to a number if needed
  const id = isNaN(Number(params.id)) ? params.id : Number(params.id);

  // Fetch the note based on the id
  const note = await getNote(id);

  if (!note) {
    notFound(); // Handle case where the note is not found
  }

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="inline-flex w-full items-center p-5 text-base font-medium text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white mt-1">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold mb-4">{note.title}</h1>
          <p className="mb-4">{note.body}</p>
          <button className="cursor-pointer border rounded-lg bg-amber-500 w-30 hover:bg-amber-600 mt-2">
            <Link href={`/notes/${note.id}/edit`}>Edit</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
