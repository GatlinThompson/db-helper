import React from "react";

type InputProps = {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
  label,
  name,
  type,
  placeholder,
  onChange,
}: InputProps) {
  return (
    <div className="grid gap-2">
      <label htmlFor={name} className="font-semibold">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        onChange={onChange}
        placeholder={placeholder}
        className="border border-solid border-black/[.08] dark:border-white/[.145] rounded-md p-2 bg-zinc-900 "
      />
    </div>
  );
}
