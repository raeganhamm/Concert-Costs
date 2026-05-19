import { Music } from "lucide-react";
import { LoginForm } from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="hero min-h-dvh hero-gradient">
      <div className="hero-content w-full max-w-6xl flex-col gap-10 px-4 py-12 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl text-center lg:text-left">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-base-100/80 px-4 py-2 text-sm font-medium shadow">
            <Music className="h-5 w-5 text-primary" aria-hidden />
            Concert Cost Tracker
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight leading-tight sm:text-4xl lg:text-5xl">
            Remember every show. Know what it really cost.
          </h1>
          <p className="mt-5 text-lg leading-relaxed opacity-80">
            Log the concerts you attend, track every expense, rate the fun, and see which
            shows gave you the best bang for your buck.
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
