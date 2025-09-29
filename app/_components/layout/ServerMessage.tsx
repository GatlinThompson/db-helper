"use client";

import { useSearchParams } from "next/navigation";

export default function ServerMessage() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");
  const status = searchParams.get("status"); // success or error

  console.log(message, status);
  const color = status === "success" ? "bg-green-100" : "bg-red-100";

  if (!message) return null;
  return (
    <p
      className={`w-full max-w-sm text-center text-background p-1 rounded-md ${color}`}
    >
      {message}
    </p>
  );
}
