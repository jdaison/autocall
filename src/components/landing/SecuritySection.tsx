import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Shield, Lock, Eye } from "lucide-react";

const items = [
  {
    icon: Shield,
    title: "Datos protegidos",
    description: "Tu número y preferencias se almacenan de forma segura.",
  },
  {
    icon: Lock,
    title: "Conexión cifrada",
    description: "Las llamadas se gestionan por infraestructura segura.",
  },
  {
    icon: Eye,
    title: "Tú decides",
    description: "Solo tú autorizas qué empresas y cuándo llamar.",
  },
];

export function SecuritySection() {
  return (
    <section className="px-4 py-16 sm:py-24 bg-white">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-4">
          Seguridad
        </h2>
        <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
          Tu seguridad y privacidad son prioritarias.
        </p>
        <div className="grid sm:grid-cols-3 gap-6">
          {items.map(({ icon: Icon, title, description }) => (
            <Card key={title}>
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
