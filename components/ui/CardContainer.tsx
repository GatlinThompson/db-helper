import React from "react";

type CardContainerProps = {
  children: React.ReactNode;
};

export default function CardContainer({ children }: CardContainerProps) {
  return (
    <div className="border border-solid border-black/[.08] dark:border-white/[.145] rounded-md p-2 bg-zinc-900">
      {children}
    </div>
  );
}
