import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg text-foreground">
          <Image
            src="/autocall-logo.png"
            alt="AutoCall"
            width={36}
            height={36}
            className="rounded-lg"
          />
          <span>AutoCall</span>
        </Link>
        <Button asChild size="default">
          <Link href="/onboarding">Probar Gratis</Link>
        </Button>
      </div>
    </header>
  );
}
