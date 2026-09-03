import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { HeroSection } from "@/components/sections/HeroSection";
import { LotMapSection } from "@/components/sections/LotMapSection";
import { FinancialSimulator } from "@/components/sections/FinancialSimulator";
import { ProjectSection } from "@/components/sections/ProjectSection";
import { TrustSection } from "@/components/sections/TrustSection";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <LotMapSection />
      <FinancialSimulator />
      <ProjectSection />
      <TrustSection />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
