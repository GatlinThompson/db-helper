import React from "react";

type SubmitButtonProps = {
  children: string;
};

export default function SubmitButton({ children }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      className="bg-black text-white rounded-md p-3 hover:bg-black/80 font-semibold mt-3 mx-4"
    >
      {children}
    </button>
  );
}
