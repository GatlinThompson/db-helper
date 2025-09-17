import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

//Function to get user role from database
async function getUserRole(userId: string): Promise<string | null> {
  try {
    console.log("Fetching role for user ID:", userId);

    // Use regular Supabase client (profiles table is publicly readable)
    const supabase = await createClient();

    // Query the database for user role
    const { data: userData, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("user_id", userId)
      .single();

    console.log("User data from database:", userData);
    console.log("Query error:", error);

    //Check for errors or no data
    if (error || !userData) {
      console.log(
        "No profile found for user ID:",
        userId,
        "Error:",
        error?.message
      );
      return null;
    }

    // Return user role
    return userData.role || null;
  } catch (error) {
    console.error("Error fetching user role:", error);
    return null;
  }
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = await createClient();

  // IMPORTANT: If you remove getClaims() and you use server-side rendering
  // with the Supabase client, your users may be randomly logged out.
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  // Define public routes that don't require authentication
  const publicRoutes = [
    "/",
    "/server/login",
    "/server/signup",
    "/client/login",
    "/client/signup",
  ];
  // Check if current route is public
  const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname);

  // If user is not authenticated and trying to access private route, redirect to login
  if (!user && !isPublicRoute) {
    // no user, redirect to login page
    const url = request.nextUrl.clone();
    url.pathname = "/client/login";
    return NextResponse.redirect(url);
  }

  // Define admin-only routes
  const adminRoutes = ["/admin"];

  // Check if current route requires admin access
  const isAdminRoute = adminRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // If user is authenticated and trying to access admin route, check role
  if (user && isAdminRoute) {
    try {
      // Get user role from database
      const userRole = await getUserRole(user.sub);

      if (userRole !== "admin") {
        // User is not admin, redirect to dashboard with error
        const url = request.nextUrl.clone();
        url.pathname = "/dashboard";
        url.searchParams.set(
          "message",
          "Access denied. Admin privileges required."
        );
        url.searchParams.set("status", "error");
        return NextResponse.redirect(url);
      }
    } catch (error) {
      console.error("Error checking user role:", error);
      // On error, redirect to dashboard
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      url.searchParams.set("message", "Unable to verify permissions.");
      url.searchParams.set("status", "error");
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}
