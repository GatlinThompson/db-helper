import React from "react";
import Link from "next/link";
import { signup } from "@/app/server/actions";
import Input from "@/components/ui/Input";
import ServerMessage from "@/components/ui/ServerMessage";
import SubmitButton from "@/components/ui/SubmitButton";

export default function SignupPage() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center min-h-screen">
      <h1 className="text-3xl font-semibold">Signup</h1>
      <ServerMessage />
      <form action={signup} className="grid gap-4 w-full max-w-sm">
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
        <SubmitButton>Signup</SubmitButton>
      </form>
      <p className="text-center">
        Already have an account?{" "}
        <Link className="font-semibold underline" href="/server/login">
          Login
        </Link>
      </p>
    </div>
  );
}
