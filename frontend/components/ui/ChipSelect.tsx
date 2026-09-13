// ─────────────────────────────────────────────────────────────
// ChipSelect — pill-style multi-select chip group.
// Renders a list of options as toggleable chips and calls
// onChange with the updated selected array.
//
// Usage:
//   <ChipSelect
//     id="services"
//     label="Services Needed"
//     required
//     options={SERVICES}
//     selected={data.servicesNeeded}
//     onChange={(v) => set("servicesNeeded", v)}
//     error={errors.servicesNeeded}
//   />
// ─────────────────────────────────────────────────────────────
interface Props {
  id: string;
  label: string;
  required?: boolean;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  error?: string;
  span?: "full" | "auto";
}

export default function ChipSelect({
  id,
  label,
  required = false,
  options,
  selected,
  onChange,
  error,
  span = "full",
}: Props) {
  const toggle = (option: string) => {
    const next = selected.includes(option)
      ? selected.filter((s) => s !== option)
      : [...selected, option];
    onChange(next);
  };

  return (
    <div className={`form-group${span === "full" ? " full" : ""}`}>
      <label className="form-label">
        {label}
        {required && <span className="required"> *</span>}
      </label>

      <div className="chip-group" role="group" aria-labelledby={`${id}-label`}>
        {options.map((opt) => {
          const isSelected = selected.includes(opt);
          const chipId = `${id}-${opt.replace(/[\s&/]+/g, "-").toLowerCase()}`;
          return (
            <div
              key={opt}
              id={chipId}
              className={`chip${isSelected ? " selected" : ""}`}
              onClick={() => toggle(opt)}
              role="checkbox"
              aria-checked={isSelected}
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && toggle(opt)}
            >
              {isSelected && <span className="chip-check">✓</span>}
              {opt}
            </div>
          );
        })}
      </div>

      {error && (
        <span className="form-error" role="alert">
          ⚠ {error}
        </span>
      )}
    </div>
  );
}
