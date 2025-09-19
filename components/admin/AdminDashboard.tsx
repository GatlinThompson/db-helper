import React from "react";
import { DashboardProps } from "@/types/user";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import Link from "next/link";
export default function AdminDashboard({ user }: DashboardProps) {
  return (
    <div className="w-full grid gap-6">
      <Card>
        <CardHeader>
          Welcome, {user.first_name} {user.last_name}!
        </CardHeader>
        <CardBody>
          You are logged in as an <strong>{user.role}</strong> with email:{" "}
          {user.user_email}
        </CardBody>
      </Card>
      <div className="grid grid-cols-2 gap-6">
        <Link href="/users">
          <Card>
            <CardHeader>Users</CardHeader>
            <CardBody>Check out the users!</CardBody>
          </Card>
        </Link>
      </div>
    </div>
  );
}
