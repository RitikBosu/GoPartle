"use client";

interface Props {
  currentStep: number;
  totalSteps: number;
  labels: string[];
}

export default function StepIndicator({ currentStep, totalSteps, labels }: Props) {
  return (
    <div className="step-indicator">
      {Array.from({ length: totalSteps }).map((_, i) => {
        const step = i + 1;
        const isActive    = step === currentStep;
        const isCompleted = step < currentStep;

        return (
          <div key={step} style={{ display: "flex", alignItems: "flex-start" }}>
            <div className={`step-dot${isActive ? " active" : ""}${isCompleted ? " completed" : ""}`}>
              <div className="step-dot-inner">
                {isCompleted ? (
                  <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
                    <path d="M1 5L4.5 8.5L12 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : step}
              </div>
              <span className="step-dot-label">{labels[i]}</span>
            </div>

            {step < totalSteps && (
              <div className={`step-connector${isCompleted ? " completed" : ""}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
