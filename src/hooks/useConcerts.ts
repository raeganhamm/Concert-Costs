"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Concert } from "@/types/concert";

export function useConcerts() {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConcerts = useCallback(async () => {
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { data, error: fetchError } = await supabase
      .from("concerts")
      .select("*")
      .order("concert_date", { ascending: false });

    if (fetchError) {
      setError(fetchError.message);
      setConcerts([]);
    } else {
      setConcerts((data as Concert[]) ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchConcerts();
  }, [fetchConcerts]);

  return { concerts, loading, error, refetch: fetchConcerts };
}
