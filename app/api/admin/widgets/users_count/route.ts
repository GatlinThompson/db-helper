import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  //get data

  try {
    const users = await prisma.profiles.groupBy({
      by: ["role"],
      _count: {
        role: true,
      },
    });

    //organize data
    const count = users.map((row) => {
      return { role: row.role, count: row._count.role };
    });

    return NextResponse.json(count);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
