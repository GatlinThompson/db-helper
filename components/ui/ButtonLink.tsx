import Link from "next/link";
import React from "react";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
};

export default function ButtonLink({ href, children }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className="font-semibold px-4 py-2 rounded-md bg-foreground text-background"
    >
      {children}
    </Link>
  );
}
