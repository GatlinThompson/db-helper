import React from "react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getUserData } from "@/utils/GetUserData";
import AdminDashboard from "@/components/admin/AdminDashboard";
import EmployeeDashboard from "@/components/employee/EmployeeDashboard";
import ManagerDashboard from "@/components/manager/ManagerDashboard";
import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";
import ServerMessage from "@/components/ui/ServerMessage";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/client/login");
  }

  const userData = await getUserData();

  return (
    <div className="flex flex-col gap-4 pt-20 items-center min-h-screen w-full max-w-3xl mx-auto">
      <ServerMessage />
      <div className="flex justify-between gap-4 w-full mb-10">
        <h1 className="text-3xl font-semibold">
          {userData?.role
            ? userData.role.charAt(0).toUpperCase() + userData.role.slice(1)
            : ""}{" "}
          Dashboard
        </h1>
        <LogoutButton />
      </div>

      {userData?.role === "admin" && <AdminDashboard user={userData} />}
      {userData?.role === "manager" && <ManagerDashboard user={userData} />}
      {(userData?.role === "employee" || userData?.role === "trainer") && (
        <EmployeeDashboard user={userData} />
      )}
    </div>
  );
}
