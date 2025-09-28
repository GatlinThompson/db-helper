import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getUser } from "@/utils/GetUserData";
import LogoutButton from "@/components/LogoutButton";
import PageTitle from "@/components/ui/PageTitle";
import ServerMessage from "@/components/ui/ServerMessage";
import TrainingProgramForm from "@/components/training-programs/TrainingProgramForm";

export default async function CreateTrainingProgramPage() {
  const user = await getUser();

  if (!user) {
    redirect("/client/login");
  }
  if (user?.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col gap-4 pt-20 items-center min-h-screen w-full max-w-3xl mx-auto">
      <div className="flex justify-between gap-4 w-full mb-10">
        <PageTitle>Create Training Program</PageTitle>
        <LogoutButton />
      </div>
      <div className="flex flex-col gap-4 justify-center items-center pt-20">
        <TrainingProgramForm />
      </div>
    </div>
  );
}
