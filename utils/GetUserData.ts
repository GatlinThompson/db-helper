import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

export async function getUserData() {
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
    const userData = await prisma.profiles.findUnique({
      where: {
        user_id: user.id,
      },
      select: {
        id: true,
        user_id: true,
        first_name: true,
        last_name: true,
        role: true,
        user_email: true,
      },
    });

    if (!userData) {
      return null;
    }

    return {
      id: userData.id,
      user_id: userData.user_id,
      first_name: userData.first_name,
      last_name: userData.last_name,
      role: userData.role,
      user_email: userData.user_email,
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}
