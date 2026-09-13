// ─────────────────────────────────────────────────────────────
// FormField — wraps any input/select/textarea with a label,
// optional required marker, and an inline error message.
//
// Usage:
//   <FormField id="eventName" label="Event Name" required error={errors.eventName}>
//     <input id="eventName" className="form-input" ... />
//   </FormField>
// ─────────────────────────────────────────────────────────────
interface Props {
  /** Matches the id of the inner control for correct <label> association */
  id: string;
  label: string;
  required?: boolean;
  /** Optional hint shown below the label in muted text */
  hint?: string;
  /** Validation error message; renders the error span when truthy */
  error?: string;
  /** full | auto — adds the CSS .full class to span both grid columns */
  span?: "full" | "auto";
  children: React.ReactNode;
}

export default function FormField({
  id,
  label,
  required = false,
  hint,
  error,
  span = "auto",
  children,
}: Props) {
  return (
    <div className={`form-group${span === "full" ? " full" : ""}`}>
      <label className="form-label" htmlFor={id}>
        {label}
        {required && <span className="required"> *</span>}
        {hint && (
          <span style={{ color: "var(--text-muted)", fontWeight: 400, marginLeft: 6 }}>
            ({hint})
          </span>
        )}
      </label>

      {children}

      {error && (
        <span className="form-error" role="alert">
          ⚠ {error}
        </span>
      )}
    </div>
  );
}
