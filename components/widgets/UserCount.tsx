// import React, { useEffect } from "react";
import { SessionUser } from "@/types/user";

type UserCountProps = {
  user: SessionUser;
};

export default async function UserCount({ user }: UserCountProps) {
  const res = await fetch(
    "http://localhost:3000/api/admin/widgets/users_count"
  );
  const data = await res.json();

  if (!res.ok) {
    console.error("Error fetching data:", data); // or handle the error in a better way
    return;
  }

  //   const [data, setData] = React.useState({
  //     admin: 0,
  //     manager: 0,
  //     employee: 0,
  //     trainer: 0,
  //   }); // initialize state with default value of 0 for count property

  //   useEffect(() => {
  //     async function fetchData() {
  //       const res = await fetch("/api/admin/widgets/users_count");
  //       const data = await res.json();

  //       if (!res.ok) {
  //         console.error("Error fetching data:", data); // or handle the error in a better way
  //         return;
  //       }

  //       console.log(data);

  //       setData(data);
  //     }
  //     fetchData();
  //   }, []);

  return (
    <div>
      <div>Admin: {data.admin}</div>
      <div>Manager: {data.manager}</div>
      <div>Employee: {data.employee}</div>
      <div>Trainer: {data.trainer}</div>
    </div>
  );
}
