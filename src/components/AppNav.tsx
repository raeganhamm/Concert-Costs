"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, ListMusic, PlusCircle } from "lucide-react";

const links = [
  { href: "/app", label: "Dashboard", shortLabel: "Home", icon: BarChart3, exact: true },
  { href: "/app/add", label: "Add Concert", shortLabel: "Add", icon: PlusCircle, exact: false },
  { href: "/app/concerts", label: "My Concerts", shortLabel: "List", icon: ListMusic, exact: false },
];

function isActive(pathname: string, href: string, exact: boolean) {
  if (exact) return pathname === href;
  return pathname.startsWith(href);
}

export function AppNavDesktop() {
  const pathname = usePathname();

  return (
    <div className="tabs tabs-boxed w-full max-w-2xl bg-base-200/80 p-1">
      {links.map(({ href, label, icon: Icon, exact }) => {
        const active = isActive(pathname, href, exact);
        return (
          <Link
            key={href}
            href={href}
            className={`tab flex-1 gap-2 transition-colors ${active ? "tab-active" : ""}`}
            aria-current={active ? "page" : undefined}
          >
            <Icon className="h-4 w-4" aria-hidden />
            {label}
          </Link>
        );
      })}
    </div>
  );
}

export function AppNavMobile() {
  const pathname = usePathname();

  return (
    <div className="btm-nav btm-nav-md bg-base-200 border-t border-base-300 btm-nav-safe fixed bottom-0 left-0 right-0 z-40">
      {links.map(({ href, label, shortLabel, icon: Icon, exact }) => {
        const active = isActive(pathname, href, exact);
        return (
          <Link
            key={href}
            href={href}
            className={`transition-colors ${active ? "active text-primary" : ""}`}
            aria-label={label}
            aria-current={active ? "page" : undefined}
          >
            <Icon className="h-5 w-5" aria-hidden />
            <span className="btm-nav-label text-xs">{shortLabel}</span>
          </Link>
        );
      })}
    </div>
  );
}

/** @deprecated Use AppNavDesktop / AppNavMobile in layout */
export function AppNav() {
  return (
    <>
      <div className="hidden md:flex">
        <AppNavDesktop />
      </div>
      <div className="md:hidden">
        <AppNavMobile />
      </div>
    </>
  );
}
