"use client";

import { useEffect } from "react";
import { applyTheme, getStoredTheme } from "@/components/themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    applyTheme(getStoredTheme());
  }, []);

  return <>{children}</>;
}
