// ─────────────────────────────────────────────────────────────
// ToggleSwitch — labelled boolean toggle.
//
// Usage:
//   <ToggleSwitch
//     id="equipmentToggle"
//     label="Venue provides equipment"
//     checked={data.equipmentProvidedByVenue}
//     onChange={(v) => set("equipmentProvidedByVenue", v)}
//   />
// ─────────────────────────────────────────────────────────────
interface Props {
  id: string;
  /** Text shown to the left of the toggle knob */
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  /** Optional outer form-group wrapper label shown above the toggle row */
  groupLabel?: string;
}

export default function ToggleSwitch({
  id,
  label,
  checked,
  onChange,
  groupLabel,
}: Props) {
  return (
    <div className="form-group">
      {groupLabel && (
        <span className="form-label">{groupLabel}</span>
      )}
      <div className="toggle-group">
        <span className="toggle-label">{label}</span>
        <label className="toggle-switch" htmlFor={id}>
          <input
            id={id}
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
          />
          <span className="toggle-slider" />
        </label>
      </div>
    </div>
  );
}
