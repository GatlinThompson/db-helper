import React from "react";

type ContentContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function ContentContainer({
  children,
  className,
}: ContentContainerProps) {
  return (
    <div className={`${className} flex justify-between gap-4 w-full mb-10`}>
      {children}
    </div>
  );
}
