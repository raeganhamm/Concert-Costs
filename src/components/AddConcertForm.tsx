"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FormField } from "@/components/FormField";
import { createClient } from "@/lib/supabase/client";
import { COST_FIELDS, formatCurrency, toNumber, totalCost } from "@/lib/concert-metrics";
import {
  btnPrimaryLgClassName,
  inputClassName,
  sectionCardClassName,
  textareaClassName,
} from "@/lib/ui-classes";

const initialForm = {
  concert_name: "",
  artist: "",
  venue: "",
  city: "",
  state: "",
  concert_date: "",
  distance_from_home: "",
  hours_at_event: "",
  ticket_cost: "",
  ticket_fees: "",
  parking_cost: "",
  food_drink_cost: "",
  merchandise_cost: "",
  lodging_cost: "",
  travel_cost: "",
  other_cost: "",
  fun_rating: "7",
  notes: "",
};

export function AddConcertForm() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const liveTotal = useMemo(() => {
    return totalCost({
      ticket_cost: toNumber(form.ticket_cost),
      ticket_fees: toNumber(form.ticket_fees),
      parking_cost: toNumber(form.parking_cost),
      food_drink_cost: toNumber(form.food_drink_cost),
      merchandise_cost: toNumber(form.merchandise_cost),
      lodging_cost: toNumber(form.lodging_cost),
      travel_cost: toNumber(form.travel_cost),
      other_cost: toNumber(form.other_cost),
    });
  }, [form]);

  function updateField(key: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("You need to be logged in to save a concert.");
      setLoading(false);
      return;
    }

    const { error: insertError } = await supabase.from("concerts").insert({
      user_id: user.id,
      concert_name: form.concert_name.trim(),
      artist: form.artist.trim(),
      venue: form.venue.trim(),
      city: form.city.trim(),
      state: form.state.trim(),
      concert_date: form.concert_date,
      distance_from_home: form.distance_from_home ? toNumber(form.distance_from_home) : null,
      hours_at_event: toNumber(form.hours_at_event),
      ticket_cost: toNumber(form.ticket_cost),
      ticket_fees: toNumber(form.ticket_fees),
      parking_cost: toNumber(form.parking_cost),
      food_drink_cost: toNumber(form.food_drink_cost),
      merchandise_cost: toNumber(form.merchandise_cost),
      lodging_cost: toNumber(form.lodging_cost),
      travel_cost: toNumber(form.travel_cost),
      other_cost: toNumber(form.other_cost),
      fun_rating: Number(form.fun_rating),
      notes: form.notes.trim() || null,
    });

    setLoading(false);

    if (insertError) {
      setError(insertError.message);
      toast.error("Could not save concert. Please try again.");
      return;
    }

    toast.success("Concert saved! Your dashboard and list are updated.");
    setForm(initialForm);
    router.refresh();
  }

  return (
    <>
      <form id="add-concert-form" onSubmit={handleSubmit} className="space-y-8 pb-28 md:pb-0">
        {error && (
          <div role="alert" className="alert alert-error">
            <span>{error}</span>
          </div>
        )}

        <section className={sectionCardClassName}>
          <div className="card-body gap-6">
            <div>
              <h2 className="section-title">Concert details</h2>
              <p className="text-helper">Tell us where you went and when.</p>
            </div>
            <div className="space-y-4">
              <FormField label="Concert name" htmlFor="concert_name" required>
                <input
                  id="concert_name"
                  className={inputClassName}
                  value={form.concert_name}
                  onChange={(e) => updateField("concert_name", e.target.value)}
                  required
                />
              </FormField>
              <FormField label="Artist / band" htmlFor="artist" required>
                <input
                  id="artist"
                  className={inputClassName}
                  value={form.artist}
                  onChange={(e) => updateField("artist", e.target.value)}
                  required
                />
              </FormField>
              <FormField label="Venue" htmlFor="venue" required>
                <input
                  id="venue"
                  className={inputClassName}
                  value={form.venue}
                  onChange={(e) => updateField("venue", e.target.value)}
                  required
                />
              </FormField>
              <FormField label="City" htmlFor="city" required>
                <input
                  id="city"
                  className={inputClassName}
                  value={form.city}
                  onChange={(e) => updateField("city", e.target.value)}
                  required
                />
              </FormField>
              <FormField label="State" htmlFor="state" required>
                <input
                  id="state"
                  className={inputClassName}
                  value={form.state}
                  onChange={(e) => updateField("state", e.target.value)}
                  required
                />
              </FormField>
              <FormField label="Concert date" htmlFor="concert_date" required>
                <input
                  id="concert_date"
                  type="date"
                  className={inputClassName}
                  value={form.concert_date}
                  onChange={(e) => updateField("concert_date", e.target.value)}
                  required
                />
              </FormField>
              <FormField
                label="Distance (miles)"
                htmlFor="distance_from_home"
                hint="Optional — how far you traveled from home."
              >
                <input
                  id="distance_from_home"
                  type="number"
                  min="0"
                  step="0.1"
                  className={inputClassName}
                  value={form.distance_from_home}
                  onChange={(e) => updateField("distance_from_home", e.target.value)}
                />
              </FormField>
              <FormField
                label="Hours at event"
                htmlFor="hours_at_event"
                required
                hint="Used to calculate cost per hour on your dashboard."
              >
                <input
                  id="hours_at_event"
                  type="number"
                  min="0.5"
                  step="0.5"
                  className={inputClassName}
                  value={form.hours_at_event}
                  onChange={(e) => updateField("hours_at_event", e.target.value)}
                  required
                />
              </FormField>
              <FormField label="Notes" htmlFor="notes" hint="Optional memories or reminders.">
                <textarea
                  id="notes"
                  className={textareaClassName}
                  rows={3}
                  value={form.notes}
                  onChange={(e) => updateField("notes", e.target.value)}
                />
              </FormField>
            </div>
          </div>
        </section>

        <section className={sectionCardClassName}>
          <div className="card-body gap-6">
            <div>
              <h2 className="section-title">Costs</h2>
              <p className="text-helper">Enter what you spent. Leave blank fields as $0.</p>
            </div>
            <div className="space-y-4">
              {COST_FIELDS.map(({ key, label }) => (
                <FormField key={key} label={label} htmlFor={key}>
                  <label className={`${inputClassName} flex items-center gap-2`}>
                    <span className="opacity-60">$</span>
                    <input
                      id={key}
                      type="number"
                      min="0"
                      step="0.01"
                      className="grow bg-transparent border-none focus:outline-none min-h-0 h-auto p-0"
                      value={form[key]}
                      onChange={(e) => updateField(key, e.target.value)}
                    />
                  </label>
                </FormField>
              ))}
            </div>
            <div className="surface-nested p-4 text-center">
              <p className="text-helper">Total concert cost</p>
              <p className="stat-number text-primary mt-1">{formatCurrency(liveTotal)}</p>
            </div>
          </div>
        </section>

        <section className={sectionCardClassName}>
          <div className="card-body gap-6">
            <div>
              <h2 className="section-title">Fun rating</h2>
              <p className="text-helper">How much fun was it, from 1 to 10?</p>
            </div>
            <FormField label="Rating" htmlFor="fun_rating" required>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="badge badge-primary badge-lg">{form.fun_rating}</span>
                  <span className="text-helper">out of 10</span>
                </div>
                <input
                  id="fun_rating"
                  type="range"
                  min={1}
                  max={10}
                  step={1}
                  className="range range-primary w-full"
                  value={form.fun_rating}
                  onChange={(e) => updateField("fun_rating", e.target.value)}
                />
                <div className="flex justify-between text-xs text-base-content/70">
                  <span>1 — Terrible Time</span>
                  <span>10 — Best Time Ever</span>
                </div>
              </div>
            </FormField>
          </div>
        </section>

        <button
          type="submit"
          className={`${btnPrimaryLgClassName} hidden md:flex active:scale-[0.98] transition-transform ${loading ? "loading" : ""}`}
          disabled={loading}
        >
          {loading ? "Saving…" : "Save concert"}
        </button>
      </form>

      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-base-300 bg-base-100/95 p-4 backdrop-blur pb-safe-nav md:hidden">
        <button
          type="submit"
          form="add-concert-form"
          className={`${btnPrimaryLgClassName} active:scale-[0.98] transition-transform ${loading ? "loading" : ""}`}
          disabled={loading}
        >
          {loading ? "Saving…" : "Save concert"}
        </button>
      </div>
    </>
  );
}
