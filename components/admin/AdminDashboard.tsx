import React from "react";
import { DashboardProps } from "@/types/user";
import CardContainer from "../ui/CardContainer";
import Link from "next/link";
export default function AdminDashboard({ user }: DashboardProps) {
  return (
    <div className="w-full grid gap-6">
      <CardContainer>
        <h2 className="text-xl font-semibold mb-2">
          Welcome, {user.first_name} {user.last_name}!
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          You are logged in as an <strong>{user.role}</strong> with email:{" "}
          {user.user_email}
        </p>
      </CardContainer>
      <div className="grid grid-cols-2 gap-6">
        <Link href="/users">
          <CardContainer>
            <h3 className="font-semibold mb-2">Users</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              View and manage users.
            </p>
          </CardContainer>
        </Link>
      </div>
    </div>
  );
}
