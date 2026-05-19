import { createClient } from "@/lib/supabase/server";
import { AppNavDesktop, AppNavMobile } from "@/components/AppNav";
import { LogoutButton } from "@/components/LogoutButton";
import { ThemeSelector } from "@/components/ThemeSelector";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-dvh flex-col pb-safe-nav md:pb-0">
      <header className="navbar bg-base-100/90 shadow-sm px-4 py-3 lg:px-8 backdrop-blur border-b border-base-300/50 sticky top-0 z-50">
        <div className="flex flex-1 flex-col items-start gap-1 min-w-0">
          <span className="text-xl font-bold leading-tight truncate max-w-full">
            Concert Cost Tracker
          </span>
          <span className="text-xs sm:text-sm leading-relaxed opacity-70 line-clamp-2">
            Track spending, fun, and value per show
          </span>
        </div>
        <div className="flex-none flex flex-wrap items-center gap-2">
          <ThemeSelector compact className="max-w-[8rem]" />
          {user?.email && (
            <span className="badge badge-ghost hidden md:inline-flex max-w-[12rem] truncate">
              {user.email}
            </span>
          )}
          <LogoutButton />
        </div>
      </header>

      <div className="hidden md:block border-b border-base-300 bg-base-100 px-4 py-3 lg:px-8">
        <AppNavDesktop />
      </div>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 lg:px-8">{children}</main>

      <AppNavMobile />
    </div>
  );
}
