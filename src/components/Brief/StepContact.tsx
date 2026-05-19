"use client";

interface Props {
  data: { name: string; email: string; url: string; message: string };
  onChange: (field: string, value: string) => void;
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block font-sans text-sm font-medium text-text-secondary mb-2">
        {label}
        {required && <span className="text-accent ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full bg-white/5 border border-white/10 rounded-[12px] px-4 py-3 font-sans font-light text-base text-text-primary placeholder-text-muted focus:border-accent focus:outline-none focus:shadow-[0_0_0_3px_rgba(126,182,255,0.12)] transition-all duration-250";

export default function StepContact({ data, onChange }: Props) {
  return (
    <div className="flex flex-col" style={{ gap: "24px" }}>
      <Field label="Nom" required>
        <input
          type="text"
          value={data.name}
          onChange={(e) => onChange("name", e.target.value)}
          placeholder="Votre nom"
          className={inputClass}
        />
      </Field>
      <Field label="Email" required>
        <input
          type="email"
          value={data.email}
          onChange={(e) => onChange("email", e.target.value)}
          placeholder="votre@email.com"
          className={inputClass}
        />
      </Field>
      <Field label="URL du projet / chaîne / marque">
        <input
          type="text"
          value={data.url}
          onChange={(e) => onChange("url", e.target.value)}
          placeholder="https://..."
          className={inputClass}
        />
      </Field>
      <Field label="Message ou contexte supplémentaire">
        <textarea
          rows={4}
          value={data.message}
          onChange={(e) => onChange("message", e.target.value)}
          placeholder="Décrivez votre projet..."
          className={inputClass + " resize-none"}
        />
      </Field>
    </div>
  );
}
