"use client";

import React, { useState } from "react";
import TrainingSession from "./TrainingSession";

type TrainingSessionsProps = {
  trainers: { user_id: string; first_name: string; last_name: string }[];
};

type TrainingSessionProps = {
  key_id: string;
  id?: string;
  trainer: string;
  start_time: string;
  end_time: string;
};

const makeSession = (key_id: string) => {
  return { key_id, trainer: "", start_time: "", end_time: "" };
};

export default function TrainingSessions({ trainers }: TrainingSessionsProps) {
  const nextKeyRef = React.useRef(1);
  const newKey = () => String(nextKeyRef.current++);
  const [trainingSessions, setTrainingSessions] = useState<
    TrainingSessionProps[]
  >([makeSession(newKey())]);

  const removeSession = (key_id: string) => {
    setTrainingSessions((list) =>
      list.filter((sess) => sess.key_id !== key_id)
    );
  };

  const updateSession = (updatedSession: TrainingSessionProps) => {
    const newList = trainingSessions.map((sess) =>
      sess.key_id === updatedSession.key_id ? updatedSession : sess
    );
    setTrainingSessions(newList);

    console.log(newList);
  };

  return (
    <div className="grid gap-6 w-full">
      <h1 className="text-2xl font-semibold my-5">Training Sessions</h1>
      <input
        hidden
        type="hidden"
        name="training_sessions"
        value={JSON.stringify(trainingSessions)}
        readOnly
      />
      {trainingSessions.map((session, index) => (
        <TrainingSession
          key={session.key_id}
          index={index}
          trainers={trainers}
          length={trainingSessions.length}
          session={session}
          removeSession={() => removeSession(session.key_id)}
          updateSession={(updatedSession) => updateSession(updatedSession)}
        />
      ))}
      <button
        type="button"
        className="bg-black text-white rounded-md p-3 hover:bg-black/80 font-semibold mt-3 mx-4"
        onClick={() => {
          setTrainingSessions([...trainingSessions, makeSession(newKey())]);
        }}
      >
        Add Training Session
      </button>
    </div>
  );
}
