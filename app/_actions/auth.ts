"use server";

import { createClient } from "@/app/_lib/auth/server";
import { redirect } from "next/navigation";

export const login = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log(error);
    redirect(`/server/login?message=${error.message}&status=error`);
  }
  redirect("/dashboard");
};

export const logout = async () => {
  console.log("Logout action called");

  try {
    const supabase = await createClient();
    console.log("Supabase client created");

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error);
    } else {
      console.log("Logout successful");
    }
  } catch (error) {
    console.error("Logout failed:", error);
  }

  console.log("Redirecting to login");
  // Always redirect to login regardless of errors
  redirect("/server/login");
};

export const signup = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const firstName = formData.get("first_name") as string;
  const lastName = formData.get("last_name") as string;

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  });

  if (error) {
    console.log(error);

    redirect(`/server/signup?message=${error.message}&status=error`);
  }
  redirect("/server/login?message=Account created successfully&status=success");
};
