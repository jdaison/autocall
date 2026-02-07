import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Curioso",
    price: "Gratis",
    description: "Prueba AutoCall con 3 llamadas de prueba.",
    features: ["3 llamadas de prueba", "Empresas predefinidas", "Soporte por email"],
    cta: "Probar Gratis",
    href: "/onboarding",
    highlighted: true,
  },
  {
    name: "Pro",
    price: "Próximamente",
    description: "Más llamadas y empresas a la medida.",
    features: ["Llamadas ilimitadas", "Empresas personalizadas", "Prioridad"],
    cta: "Avisarme",
    href: "#",
    highlighted: false,
  },
];

export function PricingTable() {
  return (
    <section id="pricing" className="px-4 py-16 sm:py-24 bg-slate-50">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-4">
          Pricing
        </h2>
        <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
          Empieza gratis. Sin tarjeta de crédito.
        </p>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={
                plan.highlighted
                  ? "border-primary shadow-lg ring-2 ring-primary/20"
                  : ""
              }
            >
              <CardHeader className="text-center pb-2">
                {plan.highlighted && (
                  <span className="text-xs font-medium text-primary uppercase tracking-wide">
                    Recomendado
                  </span>
                )}
                <h3 className="text-xl font-semibold text-slate-900">{plan.name}</h3>
                <p className="text-2xl font-bold text-slate-900">{plan.price}</p>
                <p className="text-sm text-slate-600">{plan.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
                      <Check className="h-4 w-4 shrink-0 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  variant={plan.highlighted ? "default" : "outline"}
                  size="lg"
                  className="w-full min-h-[48px]"
                >
                  <Link href={plan.href}>{plan.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
