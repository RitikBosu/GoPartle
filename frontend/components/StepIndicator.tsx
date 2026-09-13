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
        const isActive = step === currentStep;
        const isCompleted = step < currentStep;

        return (
          <div
            key={step}
            style={{ display: "flex", alignItems: "center", flex: step < totalSteps ? 1 : "none" }}
          >
            <div className={`step-item${isActive ? " active" : ""}${isCompleted ? " completed" : ""}`}>
              <div className="step-num">
                {isCompleted ? (
                  <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                    <path d="M1 4.5L4 7.5L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : step}
              </div>
              <span className="step-label">{labels[i]}</span>
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
