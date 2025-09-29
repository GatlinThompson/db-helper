import ButtonLink from "@/app/_components/layout/ButtonLink";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 justify-center items-center min-h-screen w-full max-w-3xl mx-auto">
      <div className="grid gap-4 text-center">
        <h1 className="text-3xl font-semibold">DB Helper</h1>
        <p>Examples for database operations using Supabase and Auth stuff</p>
      </div>
      <div className="grid gap-4 border-t border-black/[.08] dark:border-white/[.145] pt-10 w-full ">
        <h2 className="text-2xl font-semibold">Server Action Auth Examples</h2>
        <div className="flex gap-4">
          <ButtonLink href="/server/login">Login</ButtonLink>

          <ButtonLink href="/server/signup">Signup</ButtonLink>
        </div>
      </div>
      <div className="grid gap-4 border-t border-black/[.08] dark:border-white/[.145] pt-10 w-full ">
        <h2 className="text-2xl font-semibold">Client Auth Examples</h2>
        <div className="flex gap-4">
          <ButtonLink href="/client/login">Login</ButtonLink>
          <ButtonLink href="/client/signup">Signup</ButtonLink>
        </div>
      </div>
    </div>
  );
}
