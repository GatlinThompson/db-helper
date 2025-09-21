import React from "react";
import { UsersProps } from "@/types/user";
import { UserRoleSelect } from "./UserSelect";

type UserTableProps = {
  users: UsersProps[];
};

export async function UserTable({ users }: UserTableProps) {
  return (
    <div className="w-full grid gap-6">
      <table className="w-full ">
        <thead>
          <tr>
            <th className="text-left">First Name</th>
            <th className="text-left">Last Name</th>
            <th className="text-left">Email</th>
            <th className="text-left">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <UserRow key={index} user={user} even={index % 2 === 0} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

type UserRowProps = {
  user: UsersProps;
  even: boolean;
};

export async function UserRow({ user, even }: UserRowProps) {
  return (
    <tr
      className={`${
        even ? "bg-zinc-900" : "bg-zinc-700"
      } border-b border-zinc-100`}
    >
      <td className="p-2">{user.first_name}</td>
      <td>{user.last_name}</td>
      <td>{user.user_email}</td>

      {user && user?.role === "admin" ? (
        <td>
          <UserRoleSelect userId={user.id} role={user.role || "employee"} />
        </td>
      ) : (
        <td>{user.role}</td>
      )}
    </tr>
  );
}
