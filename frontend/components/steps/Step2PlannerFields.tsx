"use client";

import { useState } from "react";
import { CardHeader, ChipSelect, FormField, FormSelect, StepNav } from "@/components/ui";

const SERVICES = [
  "Décor", "Catering", "Photography", "Videography",
  "Sound & Lighting", "Transportation", "Invitations & Stationery",
  "Floral Arrangements", "Entertainment", "Other",
];

const EXPERIENCE_LEVELS = ["Entry Level", "Mid Level", "Senior", "Expert"];

export interface PlannerData {
  servicesNeeded: string[];
  budgetMin: number;
  budgetMax: number;
  guestCount: number;
  preferredExperienceLevel: string;
  specialRequirements: string;
}

interface Props {
  data: PlannerData;
  onChange: (data: PlannerData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step2PlannerFields({ data, onChange, onNext, onBack }: Props) {
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  const set = <K extends keyof PlannerData>(field: K, value: PlannerData[K]) =>
    onChange({ ...data, [field]: value });

  const validate = () => {
    const e: Record<string, string> = {};
    if (data.servicesNeeded.length === 0) e.servicesNeeded = "Select at least one service";
    if (!data.guestCount || data.guestCount < 1) e.guestCount = "Enter a valid guest count";
    if (!data.preferredExperienceLevel) e.preferredExperienceLevel = "Select experience level";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <div>
      <CardHeader
        stepLabel="Step 2 of 3 — Event Planner"
        title="Planner Requirements"
        subtitle="Specify services needed and overall event scale."
      />

      <div className="form-grid">
        {/* Services needed */}
        <ChipSelect
          id="services"
          label="Services Needed"
          required
          options={SERVICES}
          selected={data.servicesNeeded}
          onChange={(v) => set("servicesNeeded", v)}
          error={errors.servicesNeeded}
        />

        {/* Budget Range */}
        <div className="form-group full">
          <label className="form-label">Budget Range</label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div className="form-group">
              <label className="form-label" style={{ fontSize: "0.75rem" }} htmlFor="budgetMin">Min (₹)</label>
              <input
                id="budgetMin"
                type="number"
                className="input"
                placeholder="50,000"
                min={0}
                value={data.budgetMin || ""}
                onChange={(e) => set("budgetMin", Number(e.target.value))}
              />
            </div>
            <div className="form-group">
              <label className="form-label" style={{ fontSize: "0.75rem" }} htmlFor="budgetMax">Max (₹)</label>
              <input
                id="budgetMax"
                type="number"
                className="input"
                placeholder="5,00,000"
                min={0}
                value={data.budgetMax || ""}
                onChange={(e) => set("budgetMax", Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        {/* Guest Count */}
        <FormField id="guestCount" label="Guest Count" required error={errors.guestCount}>
          <input
            id="guestCount"
            type="number"
            className="input"
            placeholder="200"
            min={1}
            value={data.guestCount || ""}
            onChange={(e) => set("guestCount", Number(e.target.value))}
          />
        </FormField>

        {/* Experience Level */}
        <FormSelect
          id="experienceLevel"
          label="Preferred Experience Level"
          required
          placeholder="Select level…"
          options={EXPERIENCE_LEVELS}
          value={data.preferredExperienceLevel}
          onChange={(v) => set("preferredExperienceLevel", v)}
          error={errors.preferredExperienceLevel}
        />

        {/* Special Requirements */}
        <FormField id="specialRequirements" label="Special Requirements" span="full">
          <textarea
            id="specialRequirements"
            className="textarea"
            placeholder="Any specific preferences or instructions…"
            rows={3}
            value={data.specialRequirements}
            onChange={(e) => set("specialRequirements", e.target.value)}
          />
        </FormField>
      </div>

      <StepNav
        backId="planner-back"
        nextId="planner-next"
        nextLabel="Continue"
        onBack={onBack}
        onNext={() => { if (validate()) onNext(); }}
      />
    </div>
  );
}
