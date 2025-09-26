import React from "react";
import { redirect } from "next/navigation";
import { getUser } from "@/utils/GetUserData";
import LogoutButton from "@/components/LogoutButton";
import PageTitle from "@/components/ui/PageTitle";

export default async function TrainingProgramsPage() {
  const user = await getUser();

  if (!user) {
    redirect("/client/login");
  }

  return (
    <div className="flex flex-col gap-4 pt-20 items-center min-h-screen w-full max-w-3xl mx-auto">
      <div className="flex justify-between gap-4 w-full mb-10">
        <PageTitle>Training Programs</PageTitle>
        <LogoutButton />
      </div>
    </div>
  );
}
