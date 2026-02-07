"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTAFloating() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-background/95 backdrop-blur border-t md:hidden safe-area-pb">
      <Button asChild size="lg" className="w-full min-h-[48px] text-base">
        <Link href="/onboarding">Probar Gratis</Link>
      </Button>
    </div>
  );
}
