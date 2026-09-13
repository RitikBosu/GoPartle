// ─────────────────────────────────────────────────────────────
// StepNav — Back / primary-action button row used at the
// bottom of every wizard step.
//
// Usage:
//   <StepNav
//     onBack={back}
//     onNext={handleNext}
//     nextLabel="Review →"
//     backId="planner-back"
//     nextId="planner-next"
//   />
//
//   // Submit variant (green button, loading spinner):
//   <StepNav
//     onBack={back}
//     onNext={handleSubmit}
//     nextLabel="🚀 Post Requirement"
//     nextId="review-submit"
//     variant="submit"
//     isLoading={isSubmitting}
//     disabled={isSubmitting}
//   />
// ─────────────────────────────────────────────────────────────
interface Props {
  onBack?: () => void;
  onNext: () => void;
  backLabel?: string;
  nextLabel?: string;
  backId?: string;
  nextId?: string;
  /** "primary" (purple gradient) | "submit" (green gradient) */
  variant?: "primary" | "submit";
  isLoading?: boolean;
  disabled?: boolean;
  /** Hide back button on the first step */
  hideBack?: boolean;
}

export default function StepNav({
  onBack,
  onNext,
  backLabel = "← Back",
  nextLabel = "Continue →",
  backId = "step-back",
  nextId = "step-next",
  variant = "primary",
  isLoading = false,
  disabled = false,
  hideBack = false,
}: Props) {
  const nextClass = variant === "submit" ? "btn btn-submit" : "btn btn-primary";

  return (
    <div className="btn-row">
      {!hideBack && onBack && (
        <button
          id={backId}
          className="btn btn-secondary"
          onClick={onBack}
          disabled={disabled}
          type="button"
        >
          {backLabel}
        </button>
      )}

      <button
        id={nextId}
        className={nextClass}
        onClick={onNext}
        disabled={disabled || isLoading}
        type="button"
      >
        {isLoading ? (
          <>
            <span className="spinner" aria-hidden="true" />
            Submitting…
          </>
        ) : (
          nextLabel
        )}
      </button>
    </div>
  );
}
