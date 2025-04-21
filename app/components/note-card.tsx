import Link from "next/link";
import Buttons from "./buttons";
import MarkdownRenderer from "./markdown-renderer";

interface NoteProps {
  title: string;
  body: string;
  id: string;
}

export default function NoteCard  ({ title, body, id }: NoteProps){

return(
  <div  className="inline-flex w-full items-center p-5 text-base font-medium text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white">
    <div className="flex flex-col ">
      <Link href={`/notes/${id}`}  className="text-lg font-bold mb-2 hover:text-orange-500 ">{title}</Link>
        <div className="mt-5">
          <MarkdownRenderer content={body} />
        </div>
        <div>
          <Buttons content={body} id={id} />
        </div>
    </div>
  </div>
)
}
