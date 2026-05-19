"use client";

import BriefOptionButton from "./BriefOptionButton";

const OPTIONS = [
  "500-1000€",
  "1000-2000€",
  "2000-5000€",
  "5000€+",
  "Je ne sais pas encore",
];

interface Props {
  value: string | null;
  onChange: (v: string) => void;
}

export default function StepBudget({ value, onChange }: Props) {
  return (
    <div>
      <h3 className="font-display text-text-primary mb-6" style={{ fontSize: "var(--fs-h3)" }}>
        Quel est votre budget par vidéo ?
      </h3>
      <div className="flex flex-col gap-3">
        {OPTIONS.map((option) => (
          <BriefOptionButton
            key={option}
            active={value === option}
            onClick={() => onChange(option)}
          >
            {option}
          </BriefOptionButton>
        ))}
      </div>
    </div>
  );
}
