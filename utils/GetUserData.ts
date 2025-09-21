import { createClient } from "@/lib/supabase/server";
import { SessionUser } from "@/types/user";

// export async function getUserData() {
//   const supabase = await createClient();
//   const {
//     data: { user },
//     error,
//   } = await supabase.auth.getUser();

//   if (error || !user) {
//     return null;
//   }

//   try {
//     //
//     const { data: userData, error } = await supabase
//       .from("profiles")
//       .select("*")
//       .eq("user_id", user.id)
//       .single();

//     if (!userData || error) {
//       return null;
//     }

//     return {
//       id: userData.id,
//       user_id: userData.user_id,
//       user_email: userData.user_email,
//       role: userData.role,
//       first_name: userData.first_name,
//       last_name: userData.last_name,
//     };
//   } catch (error) {
//     console.error("Error fetching user data:", error);
//     return null;
//   }
// }

export async function getUser() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  const user: SessionUser = {
    id: data?.claims?.sub,
    role: data?.claims?.app_metadata?.role,
    email: data?.claims?.email,
    first_name: data?.claims?.user_metadata?.first_name,
    last_name: data?.claims?.user_metadata?.last_name,
  };

  return user;
}
