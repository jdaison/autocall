"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Company } from "@/types/database";
import { cn } from "@/lib/utils";
import { Building2, Search } from "lucide-react";

const FEATURED_SLUGS = ["claro", "movistar", "sura", "colsanitas"];

interface StepCompanyProps {
  companies: Company[];
  selectedId: string | null;
  onSelect: (companyId: string) => void;
  onNext: () => void;
  onBack: () => void;
}

function CompanyCard({
  company,
  selected,
  onSelect,
}: {
  company: Company;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex items-center gap-4 rounded-lg border p-4 text-left transition-colors min-h-[52px] w-full",
        selected
          ? "border-primary bg-primary/10 ring-2 ring-primary/20"
          : "border-slate-200 hover:bg-slate-50 active:scale-[0.99]"
      )}
    >
      {company.logo_url ? (
        // eslint-disable-next-line @next/next/no-img-element -- External logo URLs, domain unknown
        <img
          src={company.logo_url}
          alt=""
          className="h-8 w-8 rounded object-contain flex-shrink-0"
        />
      ) : (
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-slate-200">
          <Building2 className="h-5 w-5 text-slate-500" />
        </div>
      )}
      <span className="font-medium text-slate-900 truncate">{company.name}</span>
    </button>
  );
}

export function StepCompany({
  companies,
  selectedId,
  onSelect,
  onNext,
  onBack,
}: StepCompanyProps) {
  const [search, setSearch] = useState("");

  const featured = useMemo(
    () =>
      companies.filter((c) =>
        FEATURED_SLUGS.includes(c.slug.toLowerCase())
      ).sort(
        (a, b) =>
          FEATURED_SLUGS.indexOf(a.slug.toLowerCase()) -
          FEATURED_SLUGS.indexOf(b.slug.toLowerCase())
      ),
    [companies]
  );

  const others = useMemo(
    () =>
      companies.filter(
        (c) => !FEATURED_SLUGS.includes(c.slug.toLowerCase())
      ),
    [companies]
  );

  const filteredOthers = useMemo(
    () =>
      search.trim()
        ? others.filter((c) =>
            c.name.toLowerCase().includes(search.trim().toLowerCase())
          )
        : others,
    [others, search]
  );

  if (companies.length === 0) {
    return (
      <div className="space-y-6">
        <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-4">
          No hay empresas disponibles por el momento. Asegúrate de haber ejecutado las migraciones de Supabase (incluyendo la de empresas). Contacta soporte si el problema continúa.
        </p>
        <div className="flex gap-3">
          <Button type="button" variant="outline" size="lg" onClick={onBack} className="min-h-[48px] flex-1">
            Atrás
          </Button>
          <Button size="lg" disabled className="min-h-[48px] flex-1">
            Siguiente
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Elige la empresa a la que quieres que AutoCall llame por ti.
      </p>

      {/* Más solicitadas */}
      <div>
        <h3 className="text-sm font-semibold text-slate-700 mb-2">
          Más solicitadas
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {featured.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
              selected={selectedId === company.id}
              onSelect={() => onSelect(company.id)}
            />
          ))}
        </div>
      </div>

      {/* Otras empresas con buscador */}
      {others.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-slate-700 mb-2">
            Otras empresas
          </h3>
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              type="search"
              placeholder="Buscar empresa (ej: Bancolombia, Sanitas…)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 min-h-[44px]"
              aria-label="Buscar empresa"
            />
          </div>
          <div className="grid gap-2 max-h-[220px] overflow-y-auto pr-1">
            {filteredOthers.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">
                {search.trim() ? "Ninguna empresa coincide con la búsqueda." : "No hay más empresas."}
              </p>
            ) : (
              filteredOthers.map((company) => (
                <CompanyCard
                  key={company.id}
                  company={company}
                  selected={selectedId === company.id}
                  onSelect={() => onSelect(company.id)}
                />
              ))
            )}
          </div>
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="outline" size="lg" onClick={onBack} className="min-h-[48px] flex-1">
          Atrás
        </Button>
        <Button
          type="button"
          size="lg"
          onClick={onNext}
          disabled={!selectedId}
          className="min-h-[48px] flex-1"
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}
