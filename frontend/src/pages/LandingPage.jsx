import CompareSection from "@/components/Landing/CompareSection";
import FooterSection from "@/components/Landing/FooterSection";
import HeroSection from "@/components/Landing/HeroSection";
import PricingSection from "@/components/Landing/PricingSection";
import React from "react";

function LandingPage() {
  return (
    <main className="min-h-screen">
      <div className="pt-20">
        <HeroSection />
        <CompareSection />
        <PricingSection />
        <FooterSection />
      </div>
    </main>
  );
}

export default LandingPage;
