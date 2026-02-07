import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { isMocksEnabled, MOCK_COMPANIES } from "@/lib/mocks";
import type { Company } from "@/types/database";

async function getCompanies(): Promise<Company[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("companies")
    .select("id, name, logo_url, slug, created_at")
    .order("name");
  return data ?? [];
}

export default async function OnboardingPage() {
  const companies = isMocksEnabled() ? MOCK_COMPANIES : await getCompanies();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-background px-4 py-4">
        <div className="container mx-auto flex items-center justify-between max-w-4xl">
          <Button variant="ghost" size="icon" asChild className="min-h-[44px] min-w-[44px]">
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <Link href="/" className="flex items-center gap-2 font-semibold text-slate-900">
            <Image
              src="/autocall-logo.png"
              alt="AutoCall"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span>AutoCall</span>
          </Link>
          <div className="w-10" />
        </div>
      </header>
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Probar AutoCall</h1>
        <p className="text-muted-foreground mb-8">
          Completa los pasos para recibir tu llamada de prueba.
        </p>
        <OnboardingWizard companies={companies} />
      </main>
    </div>
  );
}
