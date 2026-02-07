import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t bg-slate-900 text-slate-300 px-4 py-12">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <Link href="/" className="flex items-center gap-2 font-semibold text-white">
            <Image
              src="/autocall-logo.png"
              alt="AutoCall"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span>AutoCall</span>
          </Link>
          <nav className="flex flex-wrap gap-6 text-sm">
            <Link href="/#como-funciona" className="hover:text-white transition-colors">
              Cómo funciona
            </Link>
            <Link href="/#pricing" className="hover:text-white transition-colors">
              Precios
            </Link>
            <Link href="/onboarding" className="hover:text-white transition-colors">
              Probar Gratis
            </Link>
          </nav>
        </div>
        <p className="mt-8 text-center text-sm text-slate-500">
          Footer © {new Date().getFullYear()} AutoCall. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
