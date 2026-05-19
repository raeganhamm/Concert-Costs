"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { getCurrentYear } from "@/lib/budget-metrics";
import type { AnnualBudget } from "@/types/budget";

export function useAnnualBudget(year: number = getCurrentYear()) {
  const [budget, setBudget] = useState<AnnualBudget | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBudget = useCallback(async () => {
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { data, error: fetchError } = await supabase
      .from("annual_budgets")
      .select("*")
      .eq("year", year)
      .maybeSingle();

    if (fetchError) {
      setError(fetchError.message);
      setBudget(null);
    } else {
      setBudget(data as AnnualBudget | null);
    }
    setLoading(false);
  }, [year]);

  useEffect(() => {
    fetchBudget();
  }, [fetchBudget]);

  async function saveBudget(amount: number) {
    setSaving(true);
    setError(null);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("You need to be logged in to save a budget.");
      setSaving(false);
      return false;
    }

    const { data, error: upsertError } = await supabase
      .from("annual_budgets")
      .upsert(
        {
          user_id: user.id,
          year,
          annual_budget: amount,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id,year" }
      )
      .select()
      .single();

    setSaving(false);

    if (upsertError) {
      setError(upsertError.message);
      return false;
    }

    setBudget(data as AnnualBudget);
    return true;
  }

  return { budget, loading, saving, error, saveBudget, refetch: fetchBudget };
}
