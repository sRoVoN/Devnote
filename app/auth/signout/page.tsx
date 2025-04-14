"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";

export default function SignOutPage() {


  useEffect(() => {
    signOut({ callbackUrl: "/auth/login" });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <p className="text-lg text-gray-700 font-bold">Signing you out...</p>
    </div>
  );
}
