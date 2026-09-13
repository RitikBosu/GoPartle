// ─────────────────────────────────────────────────────────────
// FormSelect — <select> with label, placeholder option, and
// inline error. Accepts a list of string options or
// { value, label } objects for more control.
//
// Usage:
//   <FormSelect
//     id="eventType"
//     label="Event Type"
//     required
//     placeholder="Select type…"
//     options={EVENT_TYPES}
//     value={data.eventType}
//     onChange={(v) => set("eventType", v)}
//     error={errors.eventType}
//   />
// ─────────────────────────────────────────────────────────────
interface SelectOption {
  value: string;
  label: string;
}

interface Props {
  id: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  /** Array of strings OR { value, label } objects */
  options: (string | SelectOption)[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  span?: "full" | "auto";
}

export default function FormSelect({
  id,
  label,
  required = false,
  placeholder = "Select…",
  options,
  value,
  onChange,
  error,
  span = "auto",
}: Props) {
  return (
    <div className={`form-group${span === "full" ? " full" : ""}`}>
      <label className="form-label" htmlFor={id}>
        {label}
        {required && <span className="required"> *</span>}
      </label>

      <select
        id={id}
        className="form-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => {
          const val = typeof opt === "string" ? opt : opt.value;
          const lbl = typeof opt === "string" ? opt : opt.label;
          return (
            <option key={val} value={val}>
              {lbl}
            </option>
          );
        })}
      </select>

      {error && (
        <span className="form-error" role="alert">
          ⚠ {error}
        </span>
      )}
    </div>
  );
}
