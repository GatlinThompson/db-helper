import React from "react";
import { login } from "@/app/server/actions";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

import PageTitle from "@/components/ui/PageTitle";
import Input from "@/components/ui/Input";
import SubmitButton from "@/components/ui/SubmitButton";
import ServerMessage from "@/components/ui/ServerMessage";
import ButtonLink from "@/components/ui/ButtonLink";

export default async function LoginPage() {
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
          Don't have an account?{" "}
          <Link className="font-semibold underline" href="/server/signup">
            Signup
          </Link>
        </p>
      </div>
    </>
  );
}
