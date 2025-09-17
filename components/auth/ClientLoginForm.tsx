"use client";

import React from "react";
import Input from "@/components/ui/Input";
import SubmitButton from "@/components/ui/SubmitButton";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import ClientMessage from "@/components/ui/ClientMessage";

export default function ClientLoginForm() {
  const router = useRouter();
  const [message, setMessage] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  //Handle Form Submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setLoading(true); // Set loading state to true before the request is sent
    try {
      const supabase = await createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      });

      if (!error) {
        // Login successful, redirect to dashboard
        router.push("/dashboard");
      } else {
        console.error("Login failed:", error);
        setMessage(error.message); // Update the message state
        setLoading(false);
      }
    } catch (error) {
      console.error("Login request failed:", error);
      setLoading(false);
    }
  };
  return (
    <>
      <ClientMessage message={message} status="error" />

      <form onSubmit={handleSubmit} className="grid gap-4 w-full max-w-sm">
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="example@example.com"
        />
        <Input label="Password" name="password" type="password" />
        <SubmitButton>{loading ? "Logging in..." : "Login"}</SubmitButton>
      </form>
    </>
  );
}
