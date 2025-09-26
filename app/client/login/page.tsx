import React from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ServerMessage from "@/components/ui/ServerMessage";
import ClientLoginForm from "@/components/auth/ClientLoginForm";
import ButtonLink from "@/components/ui/ButtonLink";
import PageTitle from "@/components/ui/PageTitle";

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
        <PageTitle>lient Login</PageTitle>
        <ServerMessage />
        <ClientLoginForm />
        <p className="text-center">
          Don't have an account?{" "}
          <Link className="font-semibold underline" href="/client/signup">
            Signup
          </Link>
        </p>
      </div>
    </>
  );
}
