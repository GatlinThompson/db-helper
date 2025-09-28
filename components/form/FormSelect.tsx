import React from "react";

type Option = {
  label: string;
  value: string;
};
type FormSelectProps = {
  label: string;
  name: string;
  options: Option[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function FormSelect({
  label,
  name,
  options,
  onChange,
}: FormSelectProps) {
  return (
    <div className="grid gap-2">
      <label htmlFor={name} className="font-semibold">
        {label}
      </label>

      <select
        name={name}
        id={name}
        onChange={onChange}
        className="border border-solid border-black/[.08] dark:border-white/[.145] rounded-md p-2 bg-zinc-900 text-white"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
