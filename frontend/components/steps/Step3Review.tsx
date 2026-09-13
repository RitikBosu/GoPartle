"use client";

import { CardHeader, ReviewItem, StepNav } from "@/components/ui";
import { Step1Data } from "./Step1Basics";
import { PlannerData } from "./Step2PlannerFields";
import { PerformerData } from "./Step2PerformerFields";
import { CrewData } from "./Step2CrewFields";

interface Props {
  step1: Step1Data;
  planner: PlannerData;
  performer: PerformerData;
  crew: CrewData;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  submitError: string;
}

function fmtDate(d: string): string {
  if (!d) return "—";
  const [year, month, day] = d.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  });
}

function fmtArray(arr: string[]): string {
  return arr.length > 0 ? arr.join(", ") : "—";
}

function fmtCurrency(val: number): string {
  return val ? `₹${val.toLocaleString("en-IN")}` : "—";
}

export default function Step3Review({
  step1, planner, performer, crew,
  onBack, onSubmit, isSubmitting, submitError,
}: Props) {
  const cat = step1.category;

  return (
    <div>
      <CardHeader
        stepLabel="Step 3 of 3 — Review"
        title="Review Requirement"
        subtitle="Verify all information before submitting to database."
      />

      {/* Event Basics */}
      <div className="review-section" style={{ marginBottom: "20px" }}>
        <div className="review-section-title">Event Details</div>
        <div className="review-grid">
          <ReviewItem label="Event Name"  value={step1.eventName} />
          <ReviewItem label="Event Type"  value={step1.eventType} />
          <ReviewItem label="Start Date"  value={fmtDate(step1.startDate)} />
          <ReviewItem label="End Date"    value={step1.endDate ? fmtDate(step1.endDate) : "Single day"} />
          <ReviewItem label="Location"    value={step1.location} />
          <ReviewItem label="Venue"       value={step1.venue || "—"} />
          <ReviewItem label="Category" span="full">
            <span className="category-badge">
              {cat}
            </span>
          </ReviewItem>
        </div>
      </div>

      {/* Planner Details */}
      {cat === "planner" && (
        <div className="review-section">
          <div className="review-section-title">Planner Requirements</div>
          <div className="review-grid">
            <ReviewItem label="Services Needed" value={fmtArray(planner.servicesNeeded)} span="full" />
            <ReviewItem
              label="Budget Range"
              value={
                planner.budgetMin || planner.budgetMax
                  ? `${fmtCurrency(planner.budgetMin)} – ${fmtCurrency(planner.budgetMax)}`
                  : "—"
              }
            />
            <ReviewItem label="Guest Count"       value={planner.guestCount || "—"} />
            <ReviewItem label="Experience Level"  value={planner.preferredExperienceLevel || "—"} />
            {planner.specialRequirements && (
              <ReviewItem label="Special Requirements" value={planner.specialRequirements} span="full" />
            )}
          </div>
        </div>
      )}

      {/* Performer Details */}
      {cat === "performer" && (
        <div className="review-section">
          <div className="review-section-title">Performer Requirements</div>
          <div className="review-grid">
            <ReviewItem label="Performer Type"  value={performer.performerType || "—"} />
            <ReviewItem label="Set Duration"    value={performer.setDurationMinutes ? `${performer.setDurationMinutes} min` : "—"} />
            <ReviewItem label="Genre / Style"   value={fmtArray(performer.genreStyle)} span="full" />
            <ReviewItem label="Budget"          value={fmtCurrency(performer.budget)} />
            <ReviewItem label="Venue Provides Equipment" value={performer.equipmentProvidedByVenue ? "Yes" : "No"} />
            {performer.performanceDetails && (
              <ReviewItem label="Performance Details" value={performer.performanceDetails} span="full" />
            )}
          </div>
        </div>
      )}

      {/* Crew Details */}
      {cat === "crew" && (
        <div className="review-section">
          <div className="review-section-title">Crew Requirements</div>
          <div className="review-grid">
            <ReviewItem label="Crew Types"         value={fmtArray(crew.crewTypesNeeded)} span="full" />
            <ReviewItem label="Number of Members"  value={crew.numberOfCrewMembers || "—"} />
            <ReviewItem label="Hours Required"     value={crew.hoursRequired ? `${crew.hoursRequired}h` : "—"} />
            <ReviewItem label="Budget Per Person"  value={fmtCurrency(crew.budgetPerPerson)} />
            {crew.specialSkills && (
              <ReviewItem label="Special Skills" value={crew.specialSkills} span="full" />
            )}
          </div>
        </div>
      )}

      {/* Error banner */}
      {submitError && (
        <div className="validation-banner" role="alert">
          {submitError}
        </div>
      )}

      <StepNav
        backId="review-back"
        nextId="review-submit"
        nextLabel="Submit Requirement"
        variant="submit"
        onBack={onBack}
        onNext={onSubmit}
        isLoading={isSubmitting}
        disabled={isSubmitting}
      />
    </div>
  );
}
