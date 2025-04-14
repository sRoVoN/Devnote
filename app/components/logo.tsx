import Link from "next/link";

export default function Logo() {
  return (
    <>
      <Link
        href="/"
        className="flex items-center space-x-3 rtl:space-x-reverse"
      >
        <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-800 dark:text-white">
          DevNotes
        </span>
      </Link>
    </>
  );
}
