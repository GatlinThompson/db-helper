import React from "react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getUserData } from "@/utils/GetUserData";
import LogoutButton from "@/components/LogoutButton";
import { prisma } from "@/lib/prisma";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { UserData } from "@/types/user";
import { UserTable } from "@/components/users/UserTable";

export default async function UsersPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/client/login");
  }

  const userData = await getUserData();

  if (userData?.role !== "admin" && userData?.role !== "manager") {
    redirect("/dashboard");
  }

  const users = await prisma.profiles.findMany({
    select: {
      id: true,
      user_id: true,
      first_name: true,
      last_name: true,
      role: true,
      user_email: true,
    },
  });

  return (
    <div className="flex flex-col gap-4 pt-20 items-center min-h-screen w-full max-w-3xl mx-auto">
      <div className="flex justify-between gap-4 w-full mb-10">
        <h1 className="text-3xl font-semibold">Users Page</h1>
        <LogoutButton />
      </div>
      <div className="w-full grid gap-6">
        <UserTable users={users} />
      </div>
    </div>
  );
}
