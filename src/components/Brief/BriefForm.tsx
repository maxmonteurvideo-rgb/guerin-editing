"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import StepTypeSelect from "./StepTypeSelect";
import StepVolumeDelay from "./StepVolumeDelay";
import StepContact from "./StepContact";

const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];

const WEB3FORMS_ACCESS_KEY = "ce7e9a4d-a4eb-418b-a826-8ffe3687350b";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

interface FormState {
  step: number;
  type: string | null;
  volume: string | null;
  delay: string | null;
  contact: { name: string; email: string; url: string; message: string };
}

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="flex items-center justify-center mb-10">
      {[1, 2, 3].map((s, i) => {
        const completed = s < step;
        const current = s === step;
        return (
          <div key={s} className="flex items-center">
            <div
              className={`w-3 h-3 rounded-full border-2 transition-all duration-250 ${
                completed
                  ? "bg-accent border-accent"
                  : current
                    ? "bg-transparent border-accent"
                    : "bg-transparent border-border"
              }`}
            />
            {i < 2 && (
              <div
                className={`w-10 h-px transition-all duration-250 ${
                  completed ? "bg-accent" : "bg-border"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function BriefForm() {
  const [state, setState] = useState<FormState>({
    step: 1,
    type: null,
    volume: null,
    delay: null,
    contact: { name: "", email: "", url: "", message: "" },
  });

  const { step } = state;
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

  const isValid = () => {
    switch (step) {
      case 1:
        return !!state.type;
      case 2:
        return !!state.volume && !!state.delay;
      case 3:
        return !!state.contact.name && !!state.contact.email;
      default:
        return false;
    }
  };

  const submitBrief = async () => {
    if (!isValid()) return;

    setSubmitStatus("submitting");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: "Nouveau brief - Guerin Editing",
          from_name: "Guerin Editing Portfolio",
          Nom: state.contact.name,
          Email: state.contact.email,
          "URL du projet": state.contact.url,
          "Type de contenu": state.type,
          "Volume par mois": state.volume,
          Délai: state.delay,
          Message: state.contact.message,
        }),
      });

      if (!response.ok) {
        setSubmitStatus("error");
        return;
      }

      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
    }
  };

  const next = () => {
    if (!isValid()) return;
    if (step === 3) {
      void submitBrief();
      return;
    }
    setState((s) => ({ ...s, step: s.step + 1 }));
  };

  const prev = () => {
    if (step > 1) setState((s) => ({ ...s, step: s.step - 1 }));
  };

  if (submitStatus === "success") {
    return (
      <div className="glass p-6 md:p-8">
        <p
          className="text-center font-sans"
          style={{ color: "#ffffff", fontSize: "24px" }}
        >
          Brief envoyé ! Je reviens vers vous sous 24h.
        </p>
      </div>
    );
  }

  return (
    <div className="glass p-6 md:p-8">
      <ProgressBar step={step} />

      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -60, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASING }}
          >
            {step === 1 && (
              <StepTypeSelect
                value={state.type}
                onChange={(v) => setState((s) => ({ ...s, type: v }))}
              />
            )}
            {step === 2 && (
              <StepVolumeDelay
                volume={state.volume}
                delay={state.delay}
                onVolumeChange={(v) => setState((s) => ({ ...s, volume: v }))}
                onDelayChange={(v) => setState((s) => ({ ...s, delay: v }))}
              />
            )}
            {step === 3 && (
              <StepContact
                data={state.contact}
                onChange={(field, value) =>
                  setState((s) => ({
                    ...s,
                    contact: { ...s.contact, [field]: value },
                  }))
                }
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {submitStatus === "error" && (
        <p
          className="mt-8 text-center font-sans text-base"
          style={{ color: "rgba(255, 140, 140, 0.95)" }}
        >
          Une erreur est survenue. Contactez-moi à max.monteur.video@gmail.com
        </p>
      )}

      <motion.div className="flex justify-between mt-10">
        {step > 1 ? (
          <button
            type="button"
            onClick={prev}
            disabled={submitStatus === "submitting"}
            className="bg-transparent text-text-secondary hover:text-text-primary transition-colors duration-250 font-sans text-sm cursor-pointer disabled:opacity-50"
          >
            Retour
          </button>
        ) : (
          <div />
        )}
        <button
          type="button"
          onClick={next}
          disabled={!isValid() || submitStatus === "submitting"}
          className={`bg-accent text-bg-primary rounded-[2px] px-6 py-3 uppercase text-sm font-medium tracking-[0.12em] transition-all duration-250 ${
            isValid() && submitStatus !== "submitting"
              ? "cursor-pointer"
              : "opacity-30 cursor-not-allowed"
          }`}
        >
          {step === 3 ? "Envoyer le brief" : "Suivant"}
        </button>
      </motion.div>
    </div>
  );
}
