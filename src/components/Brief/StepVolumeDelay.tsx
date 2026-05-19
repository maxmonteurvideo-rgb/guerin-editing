"use client";

import BriefOptionButton from "./BriefOptionButton";

const VOLUME_OPTIONS = ["1-2", "3-5", "5-10", "10+"];
const DELAY_OPTIONS = ["Urgent (< 1 semaine)", "Normal (2-3 semaines)", "Flexible"];

interface Props {
  volume: string | null;
  delay: string | null;
  onVolumeChange: (v: string) => void;
  onDelayChange: (v: string) => void;
}

function CardGroup({
  title,
  options,
  value,
  onChange,
}: {
  title: string;
  options: string[];
  value: string | null;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <h3 className="font-display text-text-primary mb-4" style={{ fontSize: "var(--fs-h3)" }}>
        {title}
      </h3>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => (
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

export default function StepVolumeDelay({ volume, delay, onVolumeChange, onDelayChange }: Props) {
  return (
    <div className="flex flex-col" style={{ gap: "48px" }}>
      <CardGroup
        title="Combien de vidéos par mois"
        options={VOLUME_OPTIONS}
        value={volume}
        onChange={onVolumeChange}
      />
      <CardGroup
        title="Quel est votre délai"
        options={DELAY_OPTIONS}
        value={delay}
        onChange={onDelayChange}
      />
    </div>
  );
}
