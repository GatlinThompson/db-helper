"use client";
import React, { useEffect } from "react";

import Input from "@/components/ui/Input";
import SubmitButton from "@/components/ui/SubmitButton";

import { createClient } from "@/lib/supabase/client";

import FormSelect from "../form/FormSelect";
import { createTrainingProgram } from "@/app/training-programs/create/_actions/actions";
import TrainingSessions from "./TrainingSessions";
import { redirect } from "next/navigation";

export default function TrainingProgramForm() {
  // //get managers
  // const { data: managers, error } = await supabase
  //   .from("profiles")
  //   .select("*")
  //   .eq("role", "manager");
  // console.log(error);
  // // Log the managers data to the console for debugging purposes

  // const { data: trainers, error: trainersError } = await supabase
  //   .from("profiles")
  //   .select("user_id, first_name, last_name")
  //   .eq("role", "trainer");
  // console.log(trainers);
  const [managers, setManagers] = React.useState<any[]>([]);
  const [trainers, setTrainers] = React.useState<any[]>([]);

  useEffect(() => {
    const getTrainers = async () => {
      const supabase = createClient();
      const { data: trainersData, error: trainersError } = await supabase
        .from("profiles")
        .select("user_id, first_name, last_name")
        .eq("role", "trainer");
      if (trainersData) {
        setTrainers(trainersData);
      }
    };

    const getManagers = async () => {
      const supabase = createClient();
      const { data: managersData, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", "manager");
      if (managersData) {
        setManagers(managersData);
      }
    };

    getManagers();
    getTrainers();
  }, []);

  const createTrainingProgram = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    console.log("Creating Training Program");
    const formData = new FormData(event.currentTarget);

    const trainingProgram = new FormData();

    trainingProgram.append("title", formData.get("title") as string);
    trainingProgram.append(
      "description",
      formData.get("description") as string
    );
    trainingProgram.append(
      "assigned_manager",
      formData.get("assigned_manager") as string
    );
    trainingProgram.append("due_date", formData.get("due_date") as string);
    trainingProgram.append(
      "training_sessions",
      formData.get("training_sessions") as string
    );

    const res = await fetch("/api/admin/training_programs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(trainingProgram)),
    });

    if (!res.ok) {
      throw new Error("Failed to create training program");
    }

    if (res.ok) {
      redirect("/training-programs");
    }
  };
  return (
    <>
      <form
        onSubmit={createTrainingProgram}
        className="grid gap-4 w-full min-w-[400px] max-w-lg"
      >
        <Input label="Title" name="title" type="text" />

        <div className="grid gap-2">
          <label htmlFor="description" className="font-semibold">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            className="border border-solid border-black/[.08] dark:border-white/[.145] rounded-md p-2 bg-zinc-900 text-white h-32"
          ></textarea>
        </div>

        {managers && (
          <FormSelect
            label="Assigned Manager"
            name="assigned_manager"
            options={managers.map((manager: any) => ({
              label: manager.first_name + " " + manager.last_name,
              value: manager.user_id,
            }))}
          />
        )}
        <Input label="Due Date" name="due_date" type="date" />
        {/* Training Sessions */}
        {trainers && <TrainingSessions trainers={trainers} />}
        <SubmitButton>Create Training Program</SubmitButton>
      </form>
    </>
  );
}
