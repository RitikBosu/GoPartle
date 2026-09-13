"use client";

import { useState } from "react";
import { CardHeader, ChipSelect, FormField, StepNav } from "@/components/ui";

const CREW_TYPES = [
  "Stage Crew", "Lighting", "Sound", "Security",
  "Ushers", "Photographers", "Videographers", "Backstage Support", "Other",
];

export interface CrewData {
  crewTypesNeeded: string[];
  numberOfCrewMembers: number;
  hoursRequired: number;
  specialSkills: string;
  budgetPerPerson: number;
}

interface Props {
  data: CrewData;
  onChange: (data: CrewData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step2CrewFields({ data, onChange, onNext, onBack }: Props) {
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  const set = <K extends keyof CrewData>(field: K, value: CrewData[K]) =>
    onChange({ ...data, [field]: value });

  const validate = () => {
    const e: Record<string, string> = {};
    if (data.crewTypesNeeded.length === 0) e.crewTypesNeeded = "Select at least one crew type";
    if (!data.numberOfCrewMembers || data.numberOfCrewMembers < 1) e.numberOfCrewMembers = "Enter number of crew members";
    if (!data.hoursRequired || data.hoursRequired < 1) e.hoursRequired = "Enter hours required";
    if (!data.budgetPerPerson || data.budgetPerPerson < 0) e.budgetPerPerson = "Enter budget per person";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <div>
      <CardHeader
        stepLabel="Step 2 of 4 — Crew"
        title="Crew Requirements"
        subtitle="Specify the crew types, count, and budget for your event."
      />

      <div className="form-grid">
        {/* Crew Types */}
        <ChipSelect
          id="crewTypes"
          label="Crew Types Needed"
          required
          options={CREW_TYPES}
          selected={data.crewTypesNeeded}
          onChange={(v) => set("crewTypesNeeded", v)}
          error={errors.crewTypesNeeded}
        />

        {/* Number of Crew */}
        <FormField id="crewCount" label="Number of Crew Members" required error={errors.numberOfCrewMembers}>
          <input
            id="crewCount"
            type="number"
            className="form-input"
            placeholder="e.g. 10"
            min={1}
            value={data.numberOfCrewMembers || ""}
            onChange={(e) => set("numberOfCrewMembers", Number(e.target.value))}
          />
        </FormField>

        {/* Hours Required */}
        <FormField id="hoursRequired" label="Hours Required" required error={errors.hoursRequired}>
          <input
            id="hoursRequired"
            type="number"
            className="form-input"
            placeholder="e.g. 8"
            min={1}
            value={data.hoursRequired || ""}
            onChange={(e) => set("hoursRequired", Number(e.target.value))}
          />
        </FormField>

        {/* Budget Per Person */}
        <FormField id="crewBudget" label="Budget Per Person (₹)" required error={errors.budgetPerPerson}>
          <input
            id="crewBudget"
            type="number"
            className="form-input"
            placeholder="e.g. 2500"
            min={0}
            value={data.budgetPerPerson || ""}
            onChange={(e) => set("budgetPerPerson", Number(e.target.value))}
          />
        </FormField>

        {/* Special Skills */}
        <FormField id="specialSkills" label="Special Skills / Requirements" span="full">
          <textarea
            id="specialSkills"
            className="form-textarea"
            placeholder="First-aid certified, bilingual, prior concert experience…"
            value={data.specialSkills}
            onChange={(e) => set("specialSkills", e.target.value)}
          />
        </FormField>
      </div>

      <StepNav
        backId="crew-back"
        nextId="crew-next"
        nextLabel="Review →"
        onBack={onBack}
        onNext={() => { if (validate()) onNext(); }}
      />
    </div>
  );
}
