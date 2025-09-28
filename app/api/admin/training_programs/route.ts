import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();

  const { data, error } = await supabase.from("training_programs").select("*");

  if (error) {
    console.error("Supabase SELECT error:", error);
    return NextResponse.json({ error: "DB read failed" }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const body = await request.json();

  const {
    data: { user },
    error: uerr,
  } = await supabase.auth.getUser();

  if (uerr || !user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const program = {
    title: body.title,
    description: body.description,
    assigned_manager: body.assigned_manager,
    due_date: body.due_date,
    created_by: user.id,
  };

  console.log(program);

  console.log(body.training_sessions);

  const sessions = JSON.parse(body.training_sessions);

  console.log(sessions);

  const { data, error } = await supabase
    .from("training_programs")
    .insert(program)
    .select();

  if (error) {
    console.error("Supabase INSERT error:", error);
    return NextResponse.json({ error: "DB insert failed" }, { status: 500 });
  }

  console.log(data);

  for (const session of sessions) {
    const { data: sessionData, error } = await supabase
      .from("training_sessions")
      .insert({
        trainer: session.trainer,
        start_time: session.start_time,
        end_time: session.end_time,
        training_program_id: data[0].id,
      })
      .select();

    if (error) {
      console.error("Supabase INSERT error:", error);
      return NextResponse.json({ error: "DB insert failed" }, { status: 500 });
    }

    console.log(sessionData);
  }
  return NextResponse.json({ success: true });
}
