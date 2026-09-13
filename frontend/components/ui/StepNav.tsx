interface Props {
  onBack?: () => void;
  onNext: () => void;
  backLabel?: string;
  nextLabel?: string;
  backId?: string;
  nextId?: string;
  variant?: "primary" | "submit";
  isLoading?: boolean;
  disabled?: boolean;
  hideBack?: boolean;
}

export default function StepNav({
  onBack,
  onNext,
  backLabel = "Back",
  nextLabel = "Continue",
  backId = "step-back",
  nextId = "step-next",
  variant = "primary",
  isLoading = false,
  disabled = false,
  hideBack = false,
}: Props) {
  const nextClass = "btn btn-primary";

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
