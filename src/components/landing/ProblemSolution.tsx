import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AlertCircle, Sparkles } from "lucide-react";

export function ProblemSolution() {
  return (
    <section id="problema-solucion" className="px-4 py-16 sm:py-24 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
          El Problema vs. La Solución
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-red-200 bg-red-50/30">
            <CardHeader className="flex flex-row items-center gap-2">
              <AlertCircle className="h-6 w-6 text-red-600" />
              <h3 className="text-xl font-semibold text-slate-900">El problema</h3>
            </CardHeader>
            <CardContent className="text-slate-600">
              Horas esperando en línea, música de espera, menús que no llevan a nadie.
              Las empresas priorizan otros canales y tu tiempo se pierde.
            </CardContent>
          </Card>
          <Card className="border-primary/30 bg-primary/5">
            <CardHeader className="flex flex-row items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-semibold text-slate-900">La solución</h3>
            </CardHeader>
            <CardContent className="text-slate-600">
              AutoCall te llama cuando hay agente disponible o automatiza la llamada
              por ti. Elige la empresa, tu preferencia de voz y listo.
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
