import React from "react";

type PageTitleProps = {
  children: React.ReactNode;
};

export default function PageTitle({ children }: PageTitleProps) {
  return <h1 className="text-3xl font-semibold">{children}</h1>;
}
