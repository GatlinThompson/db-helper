import React from "react";
import { login } from "@/app/_actions/auth";
import Link from "next/link";
import { createClient } from "@/app/_lib/auth/server";
import { redirect } from "next/navigation";

import PageTitle from "@/app/_components/layout/PageTitle";
import Input from "@/app/_components/layout/Input";
import SubmitButton from "@/app/_components/layout/SubmitButton";
import ServerMessage from "@/app/_components/layout/ServerMessage";
import ButtonLink from "@/app/_components/layout/ButtonLink";

export default async function LoginPage() {
  const supabase = await createClient();

  const {
    data: { user },
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
        <PageTitle>Server Login</PageTitle>
        <ServerMessage />
        <form action={login} className="grid gap-4 w-full max-w-sm">
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="example@example.com"
          />
          <Input label="Password" name="password" type="password" />
          <SubmitButton>Login</SubmitButton>
        </form>
        <p className="text-center">
          Don&apos;t have an account?{" "}
          <Link className="font-semibold underline" href="/signup">
            Sign up
          </Link>
        </p>
      </div>
    </>
  );
}
