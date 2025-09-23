import React from "react";

type CardProps = {
  children: React.ReactNode;
};

export function Card({ children }: CardProps) {
  return (
    <div className="border border-solid border-black/[.08] dark:border-white/[.145] rounded-md p-2 bg-zinc-900 h-full w-full flex flex-col justify-between items-start">
      {children}
    </div>
  );
}

export function CardHeader({ children }: CardProps) {
  return <h2 className="text-xl font-semibold mb-2">{children}</h2>;
}

export function CardBody({ children }: CardProps) {
  return <p className="text-gray-600 dark:text-gray-300">{children}</p>;
}
