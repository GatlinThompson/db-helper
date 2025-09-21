export type Role = "admin" | "manager" | "employee" | "trainer";

export type DashboardProps = {
  user: SessionUser;
};

export type UsersProps = {
  id: string | undefined | bigint;
  user_email: string;
  role: Role | null;
  first_name: string;
  last_name: string;
};

export type SessionUser = {
  id: string | undefined | bigint;
  email: string;
  role: Role | null;
  first_name: string;
  last_name: string;
};
