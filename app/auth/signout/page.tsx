"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";

export default function SignOutPage() {
    useEffect(() => {
      // Prevents SSR from executing this
      if (typeof window !== 'undefined') {
        signOut({ callbackUrl: '/' });
      }
    }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <p className="text-lg text-gray-700 font-bold">Signing you out...</p>
    </div>
  );
}
