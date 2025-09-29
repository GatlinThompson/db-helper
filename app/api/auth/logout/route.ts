import { createClient } from "@/app/_lib/auth/server";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("API logout error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.log("API logout successful");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API logout failed:", error);
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}
