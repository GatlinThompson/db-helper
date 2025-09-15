import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

export async function getServerUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  try {
    // Get user data from the database using Prisma
    const userData = await prisma.profile.findUnique({
      where: {
        user_id: user.id,
      },
      select: {
        first_name: true,
        last_name: true,
        role: true,
      },
    });

    if (!userData) {
      return null;
    }

    return {
      ...userData,
      email: user.email,
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}
