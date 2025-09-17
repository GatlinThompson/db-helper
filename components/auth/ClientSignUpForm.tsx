"use client";

import React from "react";
import Input from "@/components/ui/Input";
import SubmitButton from "@/components/ui/SubmitButton";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import ClientMessage from "@/components/ui/ClientMessage";

export default function ClientSignUpForm() {
  const router = useRouter();
  const [message, setMessage] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setLoading(true);
    try {
      const supabase = await createClient();
      const { error } = await supabase.auth.signUp({
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        options: {
          data: {
            first_name: formData.get("first_name") as string,
            last_name: formData.get("last_name") as string,
          },
        },
      });

      if (!error) {
        // Signup successful, sign out the user and redirect to login
        await supabase.auth.signOut();
        router.push("/client/login");
      } else {
        console.error("Signup failed:", error);
        setMessage(error.message); // Update the message state
        setLoading(false);
      }
    } catch (error) {
      console.error("Signup request failed:", error);
      setMessage("An error occurred. Please try again later."); // Update the message state
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
        <Input
          label="First Name"
          name="first_name"
          type="text"
          placeholder="Micheal"
        />
        <Input
          label="Last Name"
          name="last_name"
          type="text"
          placeholder="Jordan"
        />
        <SubmitButton>{loading ? "Signing up..." : "Signup"}</SubmitButton>
      </form>
    </>
  );
}
