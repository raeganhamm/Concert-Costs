"use client";

import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/ThemeProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      {children}
      <Toaster richColors position="top-right" closeButton duration={4000} />
    </ThemeProvider>
  );
}
