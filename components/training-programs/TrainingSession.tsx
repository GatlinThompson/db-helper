"use client";

import React, { useState } from "react";
import Input from "@/components/ui/Input";
import FormSelect from "../form/FormSelect";

type TrainingSessionProps = {
  trainers: { user_id: string; first_name: string; last_name: string }[];
  removeSession: () => void;
  index: number;
  length: number;
  session: TrainingSessionState;
  updateSession: (updatedSession: TrainingSessionState) => void;
};

type TrainingSessionState = {
  id?: string;
  key_id: string;
  trainer: string;
  start_time: string;
  end_time: string;
};

export default function TrainingSession({
  index,
  trainers,
  removeSession,
  length,
  session,
  updateSession,
}: TrainingSessionProps) {
  const [trainingSessionInfo, setTrainingSessionInfo] = useState(session);

  const handleChange = (value: string, name: string) => {
    const newSession = {
      ...trainingSessionInfo,
      [name]: value,
    };
    setTrainingSessionInfo(newSession);

    updateSession(newSession);
  };

  return (
    <div className="grid gap-4  bg-zinc-800 p-4 rounded-md border border-solid border-black/[.08] dark:border-white/[.145]">
      {length > 1 && (
        <button
          type="button"
          className="bg-red-500 text-white rounded-md p-3 hover:bg-red-600 font-semibold mt-3 mx-4"
          onClick={removeSession}
        >
          Remove Training Session
        </button>
      )}

      <input
        hidden
        type="hidden"
        name={`training_session_${index}`}
        value={JSON.stringify(trainingSessionInfo)}
      />
      {trainers && (
        <FormSelect
          label="Trainer"
          onChange={(e) => {
            handleChange(e.target.value, "trainer");
          }}
          name={`training_session_${index}_trainer`}
          options={trainers.map((trainer: any) => ({
            label: trainer.first_name + " " + trainer.last_name,
            value: trainer.user_id,
          }))}
        />
      )}
      <Input
        label="Start Time"
        name={`training_session_${index}_start_time`}
        type="datetime-local"
        onChange={(e) => {
          handleChange(e.target.value, "start_time");
        }}
      />
      <Input
        label="End Time"
        name={`training_session_${index}_end_time`}
        type="datetime-local"
        onChange={(e) => {
          handleChange(e.target.value, "end_time");
        }}
      />
    </div>
  );
}
