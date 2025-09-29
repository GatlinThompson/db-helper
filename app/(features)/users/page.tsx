import React from "react";
import { createClient } from "@/app/_lib/auth/server";
import { redirect } from "next/navigation";
import { getUser } from "@/app/_utils/GetUserData";
import LogoutButton from "@/app/_components/auth/LogoutButton";
import { UserTable } from "@/app/_components/features/users/UserTable";
import { prisma } from "@/app/_lib/db/prisma";
import { Role } from "@/app/_types/user";

export default async function UsersPage() {
  const supabase = await createClient();

  const user = await getUser();

  if (!user) {
    redirect("/client/login");
  }

  if (user?.role !== "admin" && user?.role !== "manager") {
    redirect("/dashboard");
  }

  // const { data: users, error: usersError } = await supabase
  //   .from("profiles")
  //   .select("*");

  // if (usersError) {
  //   console.error(usersError);
  //   return <div>Error fetching users</div>;
  // }

  const users = await prisma.profiles.findMany();

  return (
    <div className="flex flex-col gap-4 pt-20 items-center min-h-screen w-full max-w-3xl mx-auto">
      <div className="flex justify-between gap-4 w-full mb-10">
        <h1 className="text-3xl font-semibold">Users Page</h1>
        <LogoutButton />
      </div>
      <div className="w-full grid gap-6">
        <UserTable users={users} userRole={user.role as Role} />
      </div>
    </div>
  );
}
