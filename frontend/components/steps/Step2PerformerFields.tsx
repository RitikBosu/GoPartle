"use client";

import { useState } from "react";
import { CardHeader, ChipSelect, FormField, FormSelect, StepNav, ToggleSwitch } from "@/components/ui";

const PERFORMER_TYPES = ["DJ", "Band", "Singer", "Dancer", "Comedian", "Magician", "Other"];
const GENRES = [
  "Bollywood", "Classical", "Jazz", "Rock", "Pop", "Electronic", "Folk",
  "Hip-Hop", "Sufi", "Western Classical", "Other",
];

export interface PerformerData {
  performerType: string;
  genreStyle: string[];
  setDurationMinutes: number;
  equipmentProvidedByVenue: boolean;
  performanceDetails: string;
  budget: number;
}

interface Props {
  data: PerformerData;
  onChange: (data: PerformerData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step2PerformerFields({ data, onChange, onNext, onBack }: Props) {
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  const set = <K extends keyof PerformerData>(field: K, value: PerformerData[K]) =>
    onChange({ ...data, [field]: value });

  const validate = () => {
    const e: Record<string, string> = {};
    if (!data.performerType) e.performerType = "Select a performer type";
    if (!data.setDurationMinutes || data.setDurationMinutes < 1) e.setDurationMinutes = "Enter a valid duration";
    if (!data.budget || data.budget < 0) e.budget = "Enter a valid budget";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <div>
      <CardHeader
        stepLabel="Step 2 of 4 — Performer"
        title="Performer Requirements"
        subtitle="Describe the talent you're looking for."
      />

      <div className="form-grid">
        {/* Performer Type */}
        <FormSelect
          id="performerType"
          label="Performer Type"
          required
          placeholder="Select type…"
          options={PERFORMER_TYPES}
          value={data.performerType}
          onChange={(v) => set("performerType", v)}
          error={errors.performerType}
        />

        {/* Set Duration */}
        <FormField id="setDuration" label="Set Duration (minutes)" required error={errors.setDurationMinutes}>
          <input
            id="setDuration"
            type="number"
            className="form-input"
            placeholder="e.g. 90"
            min={1}
            value={data.setDurationMinutes || ""}
            onChange={(e) => set("setDurationMinutes", Number(e.target.value))}
          />
        </FormField>

        {/* Genre / Style */}
        <ChipSelect
          id="genre"
          label="Genre / Style"
          options={GENRES}
          selected={data.genreStyle}
          onChange={(v) => set("genreStyle", v)}
        />

        {/* Budget */}
        <FormField id="performerBudget" label="Budget (₹)" required error={errors.budget}>
          <input
            id="performerBudget"
            type="number"
            className="form-input"
            placeholder="e.g. 75000"
            min={0}
            value={data.budget || ""}
            onChange={(e) => set("budget", Number(e.target.value))}
          />
        </FormField>

        {/* Equipment toggle */}
        <ToggleSwitch
          id="equipmentToggle"
          groupLabel="Equipment"
          label="Venue provides equipment"
          checked={data.equipmentProvidedByVenue}
          onChange={(v) => set("equipmentProvidedByVenue", v)}
        />

        {/* Performance Details */}
        <FormField id="performanceDetails" label="Performance Details" span="full">
          <textarea
            id="performanceDetails"
            className="form-textarea"
            placeholder="Stage setup preferences, song requests, special requirements…"
            value={data.performanceDetails}
            onChange={(e) => set("performanceDetails", e.target.value)}
          />
        </FormField>
      </div>

      <StepNav
        backId="performer-back"
        nextId="performer-next"
        nextLabel="Review →"
        onBack={onBack}
        onNext={() => { if (validate()) onNext(); }}
      />
    </div>
  );
}
