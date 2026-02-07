import { Phone, Building2, PhoneCall } from "lucide-react";

const steps = [
  {
    icon: Phone,
    title: "Regístrate",
    description: "Ingresa tu número y elige la empresa a la que quieres llamar.",
  },
  {
    icon: Building2,
    title: "Elige la empresa",
    description: "Selecciona entre Bancolombia, EPS Sanitas y más.",
  },
  {
    icon: PhoneCall,
    title: "Recibe la llamada",
    description: "AutoCall inicia la llamada por ti. Tú solo atiendes.",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="px-4 py-16 sm:py-24 bg-slate-50">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-4">
          Cómo Funciona
        </h2>
        <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
          Tres pasos para dejar de esperar en línea.
        </p>
        <div className="grid sm:grid-cols-3 gap-8">
          {steps.map(({ icon: Icon, title, description }, i) => (
            <div key={title} className="relative flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                <Icon className="h-6 w-6" />
              </div>
              <span className="text-sm font-medium text-primary">Paso {i + 1}</span>
              <h3 className="mt-2 text-lg font-semibold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm text-slate-600">{description}</p>
              {i < steps.length - 1 && (
                <div className="hidden sm:block absolute top-6 left-[60%] w-full h-0.5 bg-slate-200 -z-10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
