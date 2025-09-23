import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const supabase = await createClient();

  //Function on supabase to get role counts by grouping
  const { data, error } = await supabase.rpc("role_counts");

  interface RoleCountRow {
    role: string;
    count: number;
  }

  const count = (data as RoleCountRow[]).reduce<Record<string, number>>(
    (acc, row: RoleCountRow) => {
      acc[row.role] = row.count;
      return acc;
    },
    {}
  );

  if (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }

  console.log(count);
  return NextResponse.json(count);
}
