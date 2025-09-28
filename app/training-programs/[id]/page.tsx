import React from "react";
import { createClient } from "@/lib/supabase/server";

import LogoutButton from "@/components/LogoutButton";
import PageTitle from "@/components/ui/PageTitle";

interface TrainingProgramPageProps {
  params: Promise<{ id: string }>;
}

export default async function TrainingProgramPage({
  params,
}: TrainingProgramPageProps) {
  const { id } = await params;

  const supabase = await createClient();
  const { data: trainingProgram, error } = await supabase
    .from("training_programs")
    .select("*, training_sessions(*), assigned_manager(*)")
    .eq("id", id)
    .single();

  return (
    <div className="flex flex-col gap-4 pt-20 items-center min-h-screen w-full max-w-3xl mx-auto">
      <div className="flex justify-between gap-4 w-full mb-10">
        <PageTitle>{trainingProgram.title}</PageTitle>
        <LogoutButton />
      </div>
      <div className="grid gap-8 w-full">
        <p>{trainingProgram.description}</p>
      </div>
    </div>
  );
}
