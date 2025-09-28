import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { adminRoutes, managerRoutes, publicRoutes } from "@/routes/routes";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data } = await supabase.auth.getClaims();
  const user = data?.claims?.sub || null;
  const user_role = data?.claims?.app_metadata?.role;

  if (!user && !publicRoutes.includes(request.nextUrl.pathname)) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone();
    url.pathname = "/client/login";
    return NextResponse.redirect(url);
  }

  let allowRoles: string[] = [];

  //check if admin route
  if (adminRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
    allowRoles.push("admin");
  }

  //check if manager route
  if (
    managerRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    allowRoles.push("manager");
  }

  //check if user has access
  if (allowRoles.length > 0) {
    if (!allowRoles.includes(user_role)) {
      console.log("Access Denied");
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  console.log("Accessed Allowed");

  return supabaseResponse;
}
