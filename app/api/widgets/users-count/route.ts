import { createClient } from "@/app/_lib/auth/server";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs"; // keep Prisma happy; also good for cookies

export async function GET(_req: NextRequest) {
  const supabase = await createClient();

  // Ensure this route has a session; otherwise you run as anon and will hit RLS
  const {
    data: { user },
    error: uerr,
  } = await supabase.auth.getUser();
  if (uerr || !user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // If your policies are: admin = all, user = own
  const { data, error } = await supabase.rpc("role_counts");
  // RLS will restrict rows; admin will get all

  console.log("ASDASDA", data);
  if (error) {
    console.error("Supabase SELECT error:", error);
    return NextResponse.json({ error: "DB read failed" }, { status: 500 });
  }

  return NextResponse.json(data);
}
