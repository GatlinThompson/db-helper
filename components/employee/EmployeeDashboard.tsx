import React from "react";
import { DashboardProps } from "@/types/user";

import { Card, CardBody, CardHeader } from "@/components/ui/Card";

export default function EmployeeDashboard({ user }: DashboardProps) {
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
    </div>
  );
}
