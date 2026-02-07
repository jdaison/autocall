import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:py-24 lg:py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 to-transparent" />
      <div className="container mx-auto max-w-4xl text-center">
        <div className="flex flex-col items-center gap-3 mb-8">
          <Image
            src="/autocall-logo.png"
            alt=""
            width={160}
            height={160}
            className="rounded-xl"
          />
          <span className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            AutoCall
          </span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          No esperes más en línea
        </h1>
        <p className="mt-6 text-lg text-slate-600 sm:text-xl max-w-2xl mx-auto">
          AutoCall te llama a las empresas/amigos por ti. Configura tu llamada en segundos
          y recibe la llamada cuando quieras. Value prop claro y directo.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="min-h-[48px] text-base">
            <Link href="/onboarding">Probar Gratis</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="min-h-[48px] text-base">
            <Link href="#como-funciona">Cómo funciona</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
