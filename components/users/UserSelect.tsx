"use client";

import React, { useState } from "react";
import { Role } from "@prisma/client";

type UserRoleSelectProps = {
  userId: string;
  role: Role;
};

export function UserRoleSelect({ userId, role }: UserRoleSelectProps) {
  const [selectedRole, setSelectedRole] = useState(role);

  const handleRoleChange = async (newRole: Role) => {
    if (newRole === selectedRole) return;

    setSelectedRole(newRole);
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update role");
      }
    } catch (error) {
      console.error("Error updating role:", error);
      alert(
        `Failed to update role: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  return (
    <select
      name="role"
      id={`role-${userId}`}
      className="border border-solid border-black/[.08] dark:border-white/[.145] rounded-md p-2 bg-zinc-900 text-white"
      value={selectedRole}
      onChange={(e) => handleRoleChange(e.target.value as Role)}
    >
      <option value="employee">Employee</option>
      <option value="manager">Manager</option>
      <option value="trainer">Trainer</option>
      <option value="admin">Admin</option>
    </select>
  );
}
