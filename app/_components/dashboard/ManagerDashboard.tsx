import React from "react";
import { DashboardProps } from "@/app/_types/user";
import { Card, CardBody, CardHeader } from "@/app/_components/layout/Card";
import ButtonLink from "@/app/_components/layout/ButtonLink";
export default function ManagerDashboard({ user }: DashboardProps) {
  return (
    <div className="w-full grid gap-6">
      <Card>
        <CardHeader>
          Welcome, {user.first_name} {user.last_name}!
        </CardHeader>
        <CardBody>
          You are logged in as an <strong>{user.role}</strong> with email:{" "}
          {user.email}
        </CardBody>
      </Card>
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>Users</CardHeader>
          <ButtonLink href="/users">View Users</ButtonLink>
        </Card>
      </div>
    </div>
  );
}
