"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import StepIndicator from "@/components/StepIndicator";
import Step1Basics, { Step1Data } from "@/components/steps/Step1Basics";
import Step2PlannerFields, { PlannerData } from "@/components/steps/Step2PlannerFields";
import Step2PerformerFields, { PerformerData } from "@/components/steps/Step2PerformerFields";
import Step2CrewFields, { CrewData } from "@/components/steps/Step2CrewFields";
import Step3Review from "@/components/steps/Step3Review";
import { postRequirement } from "@/lib/api";
import Link from "next/link";

// ── Default state helpers ──────────────────────────────────────
const defaultStep1: Step1Data = {
  eventName: "", eventType: "", startDate: "",
  endDate: "", location: "", venue: "", category: "",
};

const defaultPlanner: PlannerData = {
  servicesNeeded: [], budgetMin: 0, budgetMax: 0,
  guestCount: 0, preferredExperienceLevel: "", specialRequirements: "",
};

const defaultPerformer: PerformerData = {
  performerType: "", genreStyle: [], setDurationMinutes: 0,
  equipmentProvidedByVenue: false, performanceDetails: "", budget: 0,
};

const defaultCrew: CrewData = {
  crewTypesNeeded: [], numberOfCrewMembers: 0,
  hoursRequired: 0, specialSkills: "", budgetPerPerson: 0,
};

const STEP_LABELS = ["Event Basics", "Requirements", "Review"];

export default function PostRequirementPage() {
  const [step, setStep] = useState(1);
  const [step1, setStep1] = useState<Step1Data>(defaultStep1);
  const [planner, setPlanner] = useState<PlannerData>(defaultPlanner);
  const [performer, setPerformer] = useState<PerformerData>(defaultPerformer);
  const [crew, setCrew] = useState<CrewData>(defaultCrew);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submittedId, setSubmittedId] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const back = () => { setSubmitError(""); setStep((s) => Math.max(s - 1, 1)); };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const payload = {
        eventName: step1.eventName,
        eventType: step1.eventType,
        startDate: step1.startDate,
        endDate: step1.endDate || undefined,
        location: step1.location,
        venue: step1.venue || undefined,
        category: step1.category as "planner" | "performer" | "crew",
        ...(step1.category === "planner" && {
          plannerDetails: {
            servicesNeeded: planner.servicesNeeded,
            budgetRange: { min: planner.budgetMin, max: planner.budgetMax },
            guestCount: planner.guestCount,
            preferredExperienceLevel: planner.preferredExperienceLevel,
            specialRequirements: planner.specialRequirements,
          },
        }),
        ...(step1.category === "performer" && {
          performerDetails: {
            performerType: performer.performerType,
            genreStyle: performer.genreStyle,
            setDurationMinutes: performer.setDurationMinutes,
            equipmentProvidedByVenue: performer.equipmentProvidedByVenue,
            performanceDetails: performer.performanceDetails,
            budget: performer.budget,
          },
        }),
        ...(step1.category === "crew" && {
          crewDetails: {
            crewTypesNeeded: crew.crewTypesNeeded,
            numberOfCrewMembers: crew.numberOfCrewMembers,
            hoursRequired: crew.hoursRequired,
            specialSkills: crew.specialSkills,
            budgetPerPerson: crew.budgetPerPerson,
          },
        }),
      };

      const res = await postRequirement(payload);
      setSubmittedId(res.data._id);
      setSubmitted(true);
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setStep1(defaultStep1);
    setPlanner(defaultPlanner);
    setPerformer(defaultPerformer);
    setCrew(defaultCrew);
    setSubmitted(false);
    setSubmittedId("");
    setSubmitError("");
  };

  return (
    <main className="page-wrapper">
      <Navbar />

      <div className="wizard-container">
        {/* Success Screen */}
        {submitted ? (
          <div className="card">
            <div className="success-screen">
              <div className="success-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2 className="success-title">Requirement Posted</h2>
              <p className="success-subtitle">
                Your requirement has been saved and categorized under{" "}
                <span className="category-badge">
                  {step1.category}
                </span>.
              </p>
              <div className="success-id">#{submittedId.slice(-8).toUpperCase()}</div>

              <div style={{ display: "flex", gap: "10px", marginTop: "12px", flexWrap: "wrap", justifyContent: "center" }}>
                <button
                  id="post-another"
                  className="btn btn-secondary"
                  onClick={handleReset}
                >
                  Post Another
                </button>

                <Link href="/events" className="btn btn-primary" style={{ textDecoration: "none" }}>
                  Explore All Events
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Step Indicator */}
            <StepIndicator
              currentStep={step}
              totalSteps={3}
              labels={STEP_LABELS}
            />

            {/* Wizard Card */}
            <div className="card">
              {step === 1 && (
                <Step1Basics
                  data={step1}
                  onChange={setStep1}
                  onNext={next}
                />
              )}

              {step === 2 && step1.category === "planner" && (
                <Step2PlannerFields
                  data={planner}
                  onChange={setPlanner}
                  onNext={next}
                  onBack={back}
                />
              )}
              {step === 2 && step1.category === "performer" && (
                <Step2PerformerFields
                  data={performer}
                  onChange={setPerformer}
                  onNext={next}
                  onBack={back}
                />
              )}
              {step === 2 && step1.category === "crew" && (
                <Step2CrewFields
                  data={crew}
                  onChange={setCrew}
                  onNext={next}
                  onBack={back}
                />
              )}

              {step === 3 && (
                <Step3Review
                  step1={step1}
                  planner={planner}
                  performer={performer}
                  crew={crew}
                  onBack={back}
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                  submitError={submitError}
                />
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
