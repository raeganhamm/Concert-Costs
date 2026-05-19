"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      className="btn btn-ghost btn-sm gap-2 min-h-11 text-inherit hover:bg-primary-content/15 active:scale-95 transition-transform"
      onClick={handleLogout}
    >
      <LogOut className="h-4 w-4" aria-hidden />
      Log out
    </button>
  );
}
