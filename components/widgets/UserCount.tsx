import { SessionUser } from "@/types/user";
import { cookies } from "next/headers";

type UserCountProps = {
  user: SessionUser;
};

export default async function UserCount({ user }: UserCountProps) {
  const res = await fetch(
    `${process.env.APP_URL}/api/admin/widgets/users_count`,
    {
      headers: { cookie: (await cookies()) as unknown as string },
      cache: "no-store",
    }
  );
  const data = await res.json();

  // const [data, setData] = React.useState<{ role: string; count: number }[]>([
  //   { role: "admin", count: 0 },
  //   { role: "manager", count: 0 },
  //   { role: "employee", count: 0 },
  //   { role: "trainer", count: 0 },
  // ]); // initialize state with correct type

  // useEffect(() => {
  //   async function fetchData() {
  //     const res = await fetch("/api/admin/widgets/users_count");
  //     const data = await res.json();

  //     if (!res.ok) {
  //       console.error("Error fetching data:", data); // or handle the error in a better way
  //       return;
  //     }

  //     console.log(data);

  //     setData(data);
  //   }

  //   fetchData();
  // }, []);

  return (
    <div className="grid gap-2 grid-cols-2 w-full">
      {data &&
        data.map((row: { role: string; count: number }) => {
          const roleName = row.role.charAt(0).toUpperCase() + row.role.slice(1);
          return (
            <div key={row.role}>
              <p className="text-lg font-semibold">
                {roleName}
                <span className="font-normal">: {row.count}</span>
              </p>
            </div>
          );
        })}
    </div>
  );
}
