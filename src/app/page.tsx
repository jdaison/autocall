import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { SocialProofLogos } from "@/components/landing/SocialProofLogos";
import { ProblemSolution } from "@/components/landing/ProblemSolution";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { SecuritySection } from "@/components/landing/SecuritySection";
import { PricingTable } from "@/components/landing/PricingTable";
import { Footer } from "@/components/landing/Footer";
import { CTAFloating } from "@/components/landing/CTAFloating";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="pb-24 md:pb-0">
        <HeroSection />
        <SocialProofLogos />
        <ProblemSolution />
        <HowItWorks />
        <SecuritySection />
        <PricingTable />
        <Footer />
      </main>
      <CTAFloating />
    </>
  );
}
