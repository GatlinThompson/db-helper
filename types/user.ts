import { Role } from "@prisma/client";

export type UserData = {
  id: bigint;
  user_id: string;
  user_email: string;
  role: Role;
  first_name: string;
  last_name: string;
};

export type DashboardProps = {
  user: UserData;
};
