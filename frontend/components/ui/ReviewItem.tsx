// ─────────────────────────────────────────────────────────────
// ReviewItem — a single labelled value cell in the review grid.
//
// Usage (single-column):
//   <ReviewItem label="Event Name" value={step1.eventName} />
//
// Usage (spanning both columns):
//   <ReviewItem label="Services Needed" value="Décor, Catering" span="full" />
//
// Usage (custom children, e.g. a badge):
//   <ReviewItem label="Category">
//     <span className="category-badge planner">📋 planner</span>
//   </ReviewItem>
// ─────────────────────────────────────────────────────────────
interface Props {
  label: string;
  /** Plain value — pass a string/number; omit when using children */
  value?: string | number | null;
  span?: "full" | "auto";
  children?: React.ReactNode;
}

export default function ReviewItem({ label, value, span = "auto", children }: Props) {
  const displayValue = value ?? "—";

  return (
    <div className={`review-item${span === "full" ? " full" : ""}`}>
      <span className="review-item-label">{label}</span>
      {children ? (
        <span className="review-item-value">{children}</span>
      ) : (
        <span className="review-item-value">
          {displayValue === "" ? "—" : displayValue}
        </span>
      )}
    </div>
  );
}
