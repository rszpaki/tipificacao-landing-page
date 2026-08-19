import { SiteHeader } from "@/components/layout/site-header";
import { TipificationHero } from "@/components/sections/tipification-hero";
import { ClassificationWorkflow } from "@/components/sections/classification-workflow";
import { SiteFooter } from "@/components/layout/site-footer";
import { DemoRequestSection } from "@/components/sections/demo-request-section";
import { ClassificationConsistency } from "@/components/sections/classification-consistency";
import { OperationalBenefits } from "@/components/sections/operational-benefits";

export default function LandingPage() {
  return (
    <>
      <SiteHeader />

      <main className="flex min-h-screen w-full flex-col overflow-x-hidden">
        <TipificationHero />
        <ClassificationWorkflow />
        <ClassificationConsistency />
        <OperationalBenefits />
        <DemoRequestSection />
      </main>

      <SiteFooter />
    </>
  );
}
