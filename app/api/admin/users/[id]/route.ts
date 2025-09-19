import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  //Get id from params
  const { id } = await params;

  //Get role from request
  const data = await request.json();
  const { role } = data;
  const supabase = await createClient();

  const { error } = await supabase
    .from("profiles")
    .update({ role })
    .eq("user_id", id);

  if (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
