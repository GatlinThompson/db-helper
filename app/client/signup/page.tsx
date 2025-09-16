import React from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ClientSignUpForm from "@/components/auth/ClientSignUpForm";
import ButtonLink from "@/components/ui/ButtonLink";

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
        <h1 className="text-3xl font-semibold">Client Signup</h1>

        <ClientSignUpForm />
        <p className="text-center">
          Already have an account?{" "}
          <Link className="font-semibold underline" href="/client/login">
            Login
          </Link>
        </p>
      </div>
    </>
  );
}
