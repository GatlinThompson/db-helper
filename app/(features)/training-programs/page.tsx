import React from "react";
import { redirect } from "next/navigation";
import { getUser } from "@/app/_utils/GetUserData";
import LogoutButton from "@/app/_components/auth/LogoutButton";
import PageTitle from "@/app/_components/layout/PageTitle";
import { createClient } from "@/app/_lib/auth/server";
import Link from "next/link";

export default async function TrainingProgramsPage() {
  const user = await getUser();

  if (!user) {
    redirect("/client/login");
  }

  const supabase = await createClient();
  const { data: trainingPrograms } = await supabase
    .from("training_programs")
    .select("*, training_sessions(*), assigned_manager(*)")
    .eq("is_archived", false);

  console.log(trainingPrograms);

  return (
    <div className="flex flex-col gap-4 pt-20 items-center min-h-screen w-full max-w-3xl mx-auto">
      <div className="flex justify-between gap-4 w-full mb-10">
        <PageTitle>Training Programs</PageTitle>
        <LogoutButton />
      </div>
      <div className="grid gap-8 w-full">
        {trainingPrograms?.map((program: ProgramProps) => (
          <Program key={program.id} program={program} />
        ))}
      </div>
    </div>
  );
}

type ProgramProps = {
  id: string;
  title: string;
  description: string;
  assigned_manager: { first_name: string; last_name: string };
  due_date: string;
  training_sessions: {
    trainer: string;
    start_time: string;
    end_time: string;
  }[];
};

export function Program({ program }: { program: ProgramProps }) {
  return (
    <Link href={`/training-programs/${program.id}`}>
      <div className="grid gap-4 w-full bg-zinc-900 p-4 rounded-md border border-solid border-black/[.08] dark:border-white/[.145]">
        <h2 className="text-2xl font-semibold">{program.title}</h2>

        <p>Due Date: {program.due_date}</p>
        <p>
          Assigned Manager: {program.assigned_manager.first_name}{" "}
          {program.assigned_manager?.last_name}
        </p>
        <p>Sessions: {program.training_sessions.length}</p>
      </div>
    </Link>
  );
}
