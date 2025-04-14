import { Post } from "../(server)/api/notes/route";
import { Dispatch, SetStateAction } from "react";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";

export interface searchProps {
  search: Post["title"];
  setSearch: Dispatch<SetStateAction<string>>;
  handleSearch: () => void;
  filteredNotes: Post[];
}

export default function SearchInput({
  search,
  setSearch,
  handleSearch,
  filteredNotes,
}: searchProps) {
  return (
    <>
      <div className="relative hidden md:block">
        <input
          type="text"
          id="search-navbar"
          className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
    focus:ring-blue-500 focus:border-blue-500 outline-none
    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div
          onClick={handleSearch}
          className="absolute inset-y-0 left-0 flex items-center pl-3 cursor-pointer"
        >
          <FaSearch className="text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-all" />
        </div>
        {search && filteredNotes.length > 0 && (
          <ul className="absolute z-50 top-full left-0 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-md mt-1 max-h-60 overflow-y-auto">
            {filteredNotes.map((note) => (
              <li
                key={note.id}
                className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                <Link href={`/notes/${note.id}`}>{note.title}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
