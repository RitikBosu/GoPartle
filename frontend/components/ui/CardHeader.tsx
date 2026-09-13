// ─────────────────────────────────────────────────────────────
// CardHeader — step label, title, and subtitle block used at
// the top of every wizard step card.
//
// Usage:
//   <CardHeader
//     stepLabel="Step 1 of 4"
//     title="Event Basics"
//     subtitle="Tell us about your event."
//   />
// ─────────────────────────────────────────────────────────────
interface Props {
  stepLabel: string;
  title: string;
  subtitle?: string;
}

export default function CardHeader({ stepLabel, title, subtitle }: Props) {
  return (
    <div className="card-header">
      <p className="card-step-label">{stepLabel}</p>
      <h2 className="card-title">{title}</h2>
      {subtitle && <p className="card-subtitle">{subtitle}</p>}
    </div>
  );
}
