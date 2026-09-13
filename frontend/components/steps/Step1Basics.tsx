"use client";

import { useState } from "react";
import { CardHeader, FormField, FormSelect, StepNav } from "@/components/ui";

const EVENT_TYPES = [
  "Wedding", "Corporate Event", "Concert", "Festival", "Birthday Party",
  "Conference", "Product Launch", "Sports Event", "Other",
];

const CATEGORIES = [
  { value: "planner",   title: "Event Planner", desc: "Décor, catering, coordination & services" },
  { value: "performer", title: "Performer",      desc: "DJ, band, singer, dancer & live acts" },
  { value: "crew",      title: "Crew",           desc: "Stage, lighting, sound & security crew" },
];

export interface Step1Data {
  eventName: string;
  eventType: string;
  startDate: string;
  endDate: string;
  location: string;
  venue: string;
  category: "planner" | "performer" | "crew" | "";
}

interface Props {
  data: Step1Data;
  onChange: (data: Step1Data) => void;
  onNext: () => void;
}

export default function Step1Basics({ data, onChange, onNext }: Props) {
  const [errors, setErrors] = useState<Partial<Record<keyof Step1Data, string>>>();

  const set = (field: keyof Step1Data, value: string) =>
    onChange({ ...data, [field]: value });

  const validate = () => {
    const e: Partial<Record<keyof Step1Data, string>> = {};
    if (!data.eventName.trim()) e.eventName = "Event name is required";
    if (!data.eventType)        e.eventType = "Please select an event type";
    if (!data.startDate)        e.startDate = "Start date is required";
    if (!data.location.trim())  e.location  = "Location is required";
    if (!data.category)         e.category  = "Please select a category";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <div>
      <CardHeader
        stepLabel="Step 1 of 3"
        title="Event Basics"
        subtitle="Specify core details and select the service role needed."
      />

      <div className="form-grid">
        {/* Event Name */}
        <FormField id="eventName" label="Event Name" required span="full" error={errors?.eventName}>
          <input
            id="eventName"
            className="input"
            placeholder="e.g. Ritik & Priya's Wedding"
            value={data.eventName}
            onChange={(e) => set("eventName", e.target.value)}
          />
        </FormField>

        {/* Event Type */}
        <FormSelect
          id="eventType"
          label="Event Type"
          required
          placeholder="Select type…"
          options={EVENT_TYPES}
          value={data.eventType}
          onChange={(v) => set("eventType", v)}
          error={errors?.eventType}
        />

        {/* Location */}
        <FormField id="location" label="Location" required error={errors?.location}>
          <input
            id="location"
            className="input"
            placeholder="e.g. Mumbai, Maharashtra"
            value={data.location}
            onChange={(e) => set("location", e.target.value)}
          />
        </FormField>

        {/* Start Date */}
        <FormField id="startDate" label="Event Start Date" required error={errors?.startDate}>
          <input
            id="startDate"
            type="date"
            className="input"
            value={data.startDate}
            onChange={(e) => set("startDate", e.target.value)}
          />
        </FormField>

        {/* End Date */}
        <FormField id="endDate" label="End Date" hint="optional">
          <input
            id="endDate"
            type="date"
            className="input"
            value={data.endDate}
            min={data.startDate}
            onChange={(e) => set("endDate", e.target.value)}
          />
        </FormField>

        {/* Venue */}
        <FormField id="venue" label="Venue" hint="optional" span="full">
          <input
            id="venue"
            className="input"
            placeholder="e.g. The Leela Palace, Delhi"
            value={data.venue}
            onChange={(e) => set("venue", e.target.value)}
          />
        </FormField>

        {/* Category selector */}
        <div className="form-group full">
          <label className="form-label">
            Required Category <span className="required">*</span>
          </label>
          <div className="category-cards">
            {CATEGORIES.map((cat) => {
              const isSelected = data.category === cat.value;
              return (
                <div
                  key={cat.value}
                  id={`category-${cat.value}`}
                  className={`category-card ${isSelected ? "selected" : ""}`}
                  onClick={() => set("category", cat.value)}
                  role="radio"
                  aria-checked={isSelected}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && set("category", cat.value)}
                >
                  <div className="category-card-header">
                    <span className="category-title">{cat.title}</span>
                    <div className="category-check">
                      {isSelected && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="category-desc">{cat.desc}</span>
                </div>
              );
            })}
          </div>
          {errors?.category && (
            <span className="field-error" role="alert">{errors.category}</span>
          )}
        </div>
      </div>

      <StepNav
        hideBack
        nextId="step1-next"
        nextLabel="Continue →"
        onNext={() => { if (validate()) onNext(); }}
      />
    </div>
  );
}
