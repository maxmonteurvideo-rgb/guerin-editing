"use client";

import BriefOptionButton from "./BriefOptionButton";

const OPTIONS = [
  "Montage YouTube / Long format",
  "Motion Design / Animation",
  "VSL / Publicité",
  "Short format (Reels, TikTok)",
  "Autre",
];

interface Props {
  value: string | null;
  onChange: (v: string) => void;
}

export default function StepTypeSelect({ value, onChange }: Props) {
  return (
    <div>
      <h3 className="font-display text-text-primary mb-6" style={{ fontSize: "var(--fs-h3)" }}>
        Quel type de contenu
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
