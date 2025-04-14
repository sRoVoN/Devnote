import { Post } from "../(server)/api/notes/route";

export interface editProps {
  note: Post,
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  editedTitle: string;
  setEditedTitle: React.Dispatch<React.SetStateAction<string>>;
  editedBody: string;
  setEditedBody: React.Dispatch<React.SetStateAction<string>>;
}
export default function EditForm({
  note,
  handleSubmit,
  editedTitle,
  setEditedTitle,
  editedBody,
  setEditedBody,
}: editProps) {
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center min-h-screen px-5 py-3 w-full"
      >
        <div className="flex flex-col items-center justify-center px-8 py-6 rounded-lg bg-gray-50 dark:bg-gray-700 w-full max-w-lg">
          <input
            id={note.title}
            className="mx-4 px-7 py-2 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
            placeholder="Your message..."
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <input
            id={note.title}
            className="mx-4 px-7 py-2 w-full h-50 text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
            placeholder="Your message..."
            value={editedBody}
            onChange={(e) => setEditedBody(e.target.value)}
          />
          <button
            type="submit"
            className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
          >
            <svg
              className="w-5 h-5 rotate-90 rtl:-rotate-90"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20"
            >
              <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
            </svg>
            <span className="sr-only">Send message</span>
          </button>
        </div>
      </form>
    </>
  );
}
