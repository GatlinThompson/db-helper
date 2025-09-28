"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function createTrainingProgram(formData: FormData) {
  const supabase = await createClient(); // no await here, returns client directly

  // Get current user
  // 🔑 Fetch the current signed-in user
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login?message=Please%20sign%20in");
  }

  console.log("Authenticated user:", user.id);

  console.log(formData);

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const assigned_manager = formData.get("assigned_manager") as string;
  const due_date = formData.get("due_date") as string;

  //   const { data, error: terr } = await supabase
  //     .from("training_programs")
  //     .insert({
  //       title: title,
  //       description: description,
  //       assigned_manager: assigned_manager,
  //       created_by: user.id,
  //       due_date: due_date, // Add due_date to the insert data object
  //     })
  //     .select("*");

  //   console.log(data);

  //   if (terr) {
  //     console.error("Insert error:", terr);
  //     redirect(
  //       `/training-programs/create?message=${encodeURIComponent(
  //         terr.message
  //       )}&status=error`
  //     );
  //   }

  //   redirect(
  //     "/training-programs?message=Training%20program%20created&status=success"
  //   );
  //
}
