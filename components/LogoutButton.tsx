"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Logout successful, redirect to login
        router.push("/server/login");
        router.refresh(); // Refresh to clear any cached data
      } else {
        const data = await response.json();
        console.error("Logout failed:", data.error);
        // Still redirect even if logout failed
        router.push("/server/login");
      }
    } catch (error) {
      console.error("Logout request failed:", error);
      // Still redirect even if request failed
      router.push("/server/login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="font-semibold px-4 py-2 rounded-md bg-foreground text-background  text-background disabled:opacity-50"
    >
      {isLoading ? "Logging out..." : "Logout"}
    </button>
  );
}
