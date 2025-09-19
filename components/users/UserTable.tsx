import React from "react";
import { UserData } from "@/types/user";
import { UserRoleSelect } from "./UserSelect";
import { getUserData } from "@/utils/GetUserData";

type UserTableProps = {
  users: UserData[];
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
  user: UserData;
  even: boolean;
};

export async function UserRow({ user, even }: UserRowProps) {
  const userData = await getUserData();
  return (
    <tr
      className={`${
        even ? "bg-zinc-900" : "bg-zinc-700"
      } border-b border-zinc-100`}
    >
      <td className="p-2">{user.first_name}</td>
      <td>{user.last_name}</td>
      <td>{user.user_email}</td>

      {user && userData?.role === "admin" ? (
        <td>
          <UserRoleSelect userId={user.user_id} role={user.role} />
        </td>
      ) : (
        <td>{user.role}</td>
      )}
    </tr>
  );
}
