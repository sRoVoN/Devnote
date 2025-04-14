import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl text-gray-500">Welcome to DevNote App</h1>
      <Link
        className="p-2 border-2 rounded-2xl hover:bg-amber-500"
        href="/notes"
      >
        Notes
      </Link>
    </div>
  );
}
