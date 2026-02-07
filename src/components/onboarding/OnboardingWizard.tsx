"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { StepPersonalData, type PersonalDataForm } from "./StepPersonalData";
import { StepCompany } from "./StepCompany";
import { StepCallDescription } from "./StepCallDescription";
import { StepVoicePreference } from "./StepVoicePreference";
import { StepNotifications } from "./StepNotifications";
import { StepInitCall } from "./StepInitCall";
import type { Company } from "@/types/database";
import type { VoicePreference, VoiceGender, NotifyFrequency } from "@/lib/validations/onboarding";
import type { InitiateCallInput } from "@/lib/validations/onboarding";

interface OnboardingWizardProps {
  companies: Company[];
}

const STEPS = 6;

export function OnboardingWizard({ companies }: OnboardingWizardProps) {
  const [step, setStep] = useState(1);
  const [personalData, setPersonalData] = useState<Partial<PersonalDataForm>>({});
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [callDescription, setCallDescription] = useState("");
  const [voicePreference, setVoicePreference] = useState<VoicePreference | null>("predefined");
  const [voiceGender, setVoiceGender] = useState<VoiceGender | null>(null);
  const [whatsappNotify, setWhatsappNotify] = useState(false);
  const [notifyFrequency, setNotifyFrequency] = useState<NotifyFrequency | null>("at_end");
  const [joinIfHumanNeeded, setJoinIfHumanNeeded] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_USE_MOCKS === "true" || process.env.NEXT_PUBLIC_USE_MOCKS === "1") {
      setReady(true);
      return;
    }
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setReady(true);
        return;
      }
      supabase.auth.signInAnonymously().then(() => setReady(true));
    });
  }, []);

  const handlePersonalNext = (data: PersonalDataForm) => {
    setPersonalData(data);
    setStep(2);
  };

  const handleCompanyNext = () => setStep(3);
  const handleCompanyBack = () => setStep(1);

  const handleDescriptionNext = (description: string) => {
    setCallDescription(description);
    setStep(4);
  };
  const handleDescriptionBack = () => setStep(2);

  const handleVoiceNext = () => setStep(5);
  const handleVoiceBack = () => setStep(3);

  const handleNotificationsNext = () => setStep(6);
  const handleNotificationsBack = () => setStep(4);

  const handleInitBack = () => setStep(5);

  const buildInitiateCallData = (): InitiateCallInput | null => {
    if (
      !personalData.phone ||
      !personalData.contactName ||
      !personalData.contactDocument ||
      !personalData.contactAddress ||
      !companyId ||
      !callDescription ||
      !voicePreference ||
      !voiceGender
    ) return null;
    return {
      phone: personalData.phone,
      contactName: personalData.contactName,
      contactDocument: personalData.contactDocument,
      contactAddress: personalData.contactAddress,
      companyId,
      callDescription,
      voicePreference,
      voiceGender,
      whatsappNotify,
      notifyFrequency: whatsappNotify ? notifyFrequency : null,
      joinIfHumanNeeded,
    };
  };

  if (!ready) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <p className="text-muted-foreground">Cargando…</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md space-y-8">
      <div className="flex gap-2">
        {Array.from({ length: STEPS }).map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full ${
              i + 1 <= step ? "bg-primary" : "bg-slate-200"
            }`}
            aria-hidden
          />
        ))}
      </div>

      {step === 1 && (
        <StepPersonalData initial={personalData} onNext={handlePersonalNext} />
      )}
      {step === 2 && (
        <StepCompany
          companies={companies}
          selectedId={companyId}
          onSelect={setCompanyId}
          onNext={handleCompanyNext}
          onBack={handleCompanyBack}
        />
      )}
      {step === 3 && (
        <StepCallDescription
          initialValue={callDescription}
          onNext={handleDescriptionNext}
          onBack={handleDescriptionBack}
        />
      )}
      {step === 4 && (
        <StepVoicePreference
          voicePreference={voicePreference}
          voiceGender={voiceGender}
          onVoicePreference={setVoicePreference}
          onVoiceGender={setVoiceGender}
          onNext={handleVoiceNext}
          onBack={handleVoiceBack}
        />
      )}
      {step === 5 && (
        <StepNotifications
          whatsappNotify={whatsappNotify}
          notifyFrequency={notifyFrequency}
          joinIfHumanNeeded={joinIfHumanNeeded}
          onWhatsappNotify={setWhatsappNotify}
          onNotifyFrequency={setNotifyFrequency}
          onJoinIfHumanNeeded={setJoinIfHumanNeeded}
          onNext={handleNotificationsNext}
          onBack={handleNotificationsBack}
        />
      )}
      {step === 6 && buildInitiateCallData() && (
        <StepInitCall
          data={buildInitiateCallData()!}
          onBack={handleInitBack}
        />
      )}
    </div>
  );
}
