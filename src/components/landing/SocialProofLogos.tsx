export function SocialProofLogos() {
  const logos = [
    { name: "Bancolombia" },
    { name: "EPS Sanitas" },
    { name: "Movistar" },
    { name: "Claro" },
  ];

  return (
    <section className="border-y bg-slate-50/50 py-8">
      <div className="container px-4">
        <p className="text-center text-sm font-medium text-muted-foreground mb-6">
          Social Proof Empresas que podrás llamar
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {logos.map(({ name }) => (
            <div
              key={name}
              className="h-8 w-24 bg-slate-200 animate-pulse rounded flex items-center justify-center text-xs text-slate-500"
              aria-hidden
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
