import React from "react";
import { redirect } from "next/navigation";
import { getUser } from "@/app/_utils/GetUserData";
import AdminDashboard from "@/app/_components/dashboard/AdminDashboard";
import EmployeeDashboard from "@/app/_components/dashboard/EmployeeDashboard";
import ManagerDashboard from "@/app/_components/dashboard/ManagerDashboard";
import LogoutButton from "@/app/_components/auth/LogoutButton";

import ServerMessage from "@/app/_components/layout/ServerMessage";
import PageTitle from "@/app/_components/layout/PageTitle";

export default async function DashboardPage() {
  const user = await getUser();

  if (!user) {
    redirect("/client/login");
  }
  return (
    <div className="flex flex-col gap-4 pt-20 items-center min-h-screen w-full max-w-3xl mx-auto">
      <ServerMessage />
      <div className="flex justify-between gap-4 w-full mb-10">
        <PageTitle>
          {user.role
            ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
            : ""}{" "}
          Dashboard
        </PageTitle>
        <LogoutButton />
      </div>

      {user.role === "admin" && <AdminDashboard user={user} />}
      {user.role === "manager" && <ManagerDashboard user={user} />}
      {(user.role === "employee" || user.role === "trainer") && (
        <EmployeeDashboard user={user} />
      )}
    </div>
  );
}
