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
      <a
        href="#conteudo-principal"
        className="sr-only z-50 rounded-md bg-background px-4 py-2 text-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        Pular para o conteúdo
      </a>

      <SiteHeader />

      <main
        id="conteudo-principal"
        className="flex min-h-screen w-full flex-col overflow-x-hidden"
      >
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
