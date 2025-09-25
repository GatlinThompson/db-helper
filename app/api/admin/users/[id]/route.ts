import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  //Get id from params
  const { id } = await params;

  //Get role from request
  const roles = await request.json();
  const { role } = roles;
  const supabase = await createClient();

  console.log(id);
  console.log(role);

  const { data, error } = await supabase
    .from("profiles")
    .update({ role: role })
    .eq("id", id);

  console.log(data);

  console.log(error);

  async function testData(id: string) {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id);

    console.log("Updated User", data);
    console.log("Updated User Error", error);
  }

  testData(id);

  if (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
