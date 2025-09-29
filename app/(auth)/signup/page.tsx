import React from "react";
import Link from "next/link";
import { signup } from "@/app/_actions/auth";
import Input from "@/app/_components/layout/Input";
import ServerMessage from "@/app/_components/layout/ServerMessage";
import SubmitButton from "@/app/_components/layout/SubmitButton";
import { createClient } from "@/app/_lib/auth/server";
import { redirect } from "next/navigation";
import ButtonLink from "@/app/_components/layout/ButtonLink";
import PageTitle from "@/app/_components/layout/PageTitle";

export default async function SignupPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <>
      <div className="mt-20 mx-auto absolute top-0 left-0  w-full">
        <div className="container mx-auto">
          <ButtonLink href="/">Back Home</ButtonLink>
        </div>
      </div>
      <div className="flex flex-col gap-4 justify-center items-center min-h-screen">
        <PageTitle> Server Signup</PageTitle>
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
    </>
  );
}
