"use client";

import React from "react";

type ClientMessageProps = {
  message: string | null;
  status: string;
};

export default function ClientMessage({ message, status }: ClientMessageProps) {
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
