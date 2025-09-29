import React from "react";
import { DashboardProps } from "@/app/_types/user";
import { Card, CardBody, CardHeader } from "@/app/_components/layout/Card";
import Link from "next/link";
import UserCount from "@/app/_components/features/widgets/UserCount";
import ButtonLink from "@/app/_components/layout/ButtonLink";
export default function AdminDashboard({ user }: DashboardProps) {
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

        <Card>
          <CardHeader>User Count</CardHeader>
          <UserCount user={user} />
        </Card>
      </div>
      <Card>
        <CardHeader>Training Programs</CardHeader>
        <div className="flex gap-6">
          <ButtonLink href="/training-programs">
            View Training Programs
          </ButtonLink>
          <ButtonLink href="/training-programs/create">
            Create Training Program
          </ButtonLink>
        </div>
      </Card>
    </div>
  );
}
