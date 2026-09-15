import type { ReactNode } from "react";

import { Check, X } from "lucide-react";

import { FrigosoftIntegrationDiagram } from "@/components/diagrams/frigosoft-integration-diagram";
import { GeistBadge } from "@/components/ui/geist-badge";
import { cn } from "@/lib/utils";

interface ComparisonItem {
  eyebrow: string;
  title: string;
  items: string[];
}

interface OperationalBenefitsProps {
  heading?: string;
  description?: string;
  withoutAI?: ComparisonItem;
  withAI?: ComparisonItem;
  footer?: ReactNode;
  className?: string;
}

const defaultWithoutAI: ComparisonItem = {
  eyebrow: "Processo tradicional",
  title: "Sem tipificação por IA",
  items: [
    "Avaliação baseada na percepção visual.",
    "Dependência da experiência de cada operador.",
    "Conferências e ajustes consomem mais tempo.",
    "Classificação registrada de forma manual.",
    "Menos referência para comparar decisões.",
  ],
};

const defaultWithAI: ComparisonItem = {
  eyebrow: "Processo seguro",
  title: "Com tipificação por IA",
  items: [
    "Captura da carcaça pelo smartphone.",
    "Análise de gordura e conformação pela IA.",
    "Sugestão de classificação pela IA.",
    "Decisão final mantida pelo operador.",
    "Informação registrada no fluxo do Frigosoft.",
  ],
};

interface ComparisonCardProps extends ComparisonItem {
  variant: "traditional" | "ai";
}

const ComparisonCard = ({
  eyebrow,
  title,
  items,
  variant,
}: ComparisonCardProps) => {
  const isAI = variant === "ai";

  return (
    <article
      className={cn(
        [
          "flex",
          "h-full",
          "flex-col",
          "rounded-2xl",
          "!border-transparent",
          "p-6",
          "ring-1",
          "ring-inset",
          "transition-[transform,translate,background-color,box-shadow]",
          "duration-300",
          "sm:p-8",
          "lg:p-9",
        ],
        isAI
          ? [
              // Mobile: estado floating
              "-translate-y-1",
              "bg-card",
              "shadow-[0_12px_32px_rgba(0,0,0,0.08)]",
              "ring-black/[0.06]",

              // Tablet/desktop: volta ao estado normal
              "md:translate-y-0",
              "md:bg-transparent",
              "md:shadow-none",

              // Hover light
              "md:motion-safe:hover:-translate-y-2",
              "md:hover:bg-card",
              "md:hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]",

              // Dark mode — mobile
              "dark:bg-card",
              "dark:text-surface-foreground",
              "dark:ring-white/[0.07]",
              "dark:shadow-none",

              // Dark mode — desktop normal
              "dark:md:bg-transparent",

              // Dark mode — hover
              "dark:md:hover:bg-[#212121]",
              "dark:md:hover:shadow-none",
            ]
          : [
              // Card da esquerda permanece integrado ao fundo
              "translate-y-0",
              "bg-transparent",
              "ring-black/[0.06]",
              "shadow-none",

              // Dark mode também permanece transparente
              "dark:bg-transparent",
              "dark:ring-white/[0.07]",
            ]
      )}
    >
      {/* Badge */}
      <div className="flex">
        {isAI ? (
          <GeistBadge
            variant="turbo"
            contrast="low"
            className="
              bg-emerald-500/10
              text-emerald-600
              [&_svg]:hidden
              dark:bg-emerald-400/10
              dark:text-emerald-400
            "
          >
            {eyebrow}
          </GeistBadge>
        ) : (
          <GeistBadge
            variant="turbo"
            contrast="low"
            className="
              bg-foreground/[0.03]
              text-foreground/40
              [&_svg]:hidden
              dark:bg-white/[0.06]
              dark:text-white/70
            "
          >
            {eyebrow}
          </GeistBadge>
        )}
      </div>

      {/* Título */}
      <h3 className="mt-6 text-[28px] font-medium leading-[1.1] tracking-tight sm:text-[24px]">
        {title}
      </h3>

      {/* Itens */}
      <ul className="mt-7 flex flex-col gap-4">
        {items.map((item, index) => (
          <li
            key={`${title}-${index}`}
            className="flex items-center gap-3"
          >
            {isAI ? (
              <Check
                className="size-4 shrink-0 text-emerald-500 dark:text-emerald-400"
                strokeWidth={2.25}
                aria-hidden="true"
              />
            ) : (
              <X
                className="size-4 shrink-0 text-red-500 dark:text-red-400"
                strokeWidth={2.25}
                aria-hidden="true"
              />
            )}

            <p
              className={cn(
                "min-w-0 flex-1 leading-relaxed",
                isAI
                  ? "text-foreground dark:text-surface-foreground"
                  : "text-muted-foreground dark:text-surface-muted-foreground"
              )}
            >
              {item}
            </p>
          </li>
        ))}
      </ul>
    </article>
  );
};

const OperationalBenefits = ({
  heading = "O que muda na rotina de tipificação",
  description = "Menos subjetividade. Mais consistência na classificação.",
  withoutAI = defaultWithoutAI,
  withAI = defaultWithAI,
  footer = <FrigosoftIntegrationDiagram />,
  className,
}: OperationalBenefitsProps) => {
  return (
    <section
      className={cn(
        "bg-muted/40 py-20 lg:py-24",
        className
      )}
    >
      <div className="container mx-auto">
        {/* Cabeçalho */}
        <div className="mx-auto mb-14 flex max-w-3xl flex-col items-center text-center">
          <h2 className="text-balance text-[38px] font-medium leading-[1.08] tracking-tight lg:text-[48px]">
            {heading}
          </h2>

          {description && (
            <p className="mt-5 max-w-2xl text-balance text-base leading-relaxed text-muted-foreground lg:text-lg">
              {description}
            </p>
          )}
        </div>

        {/* Cards */}
        <div className="mx-auto grid max-w-6xl items-stretch gap-8 lg:grid-cols-2">
          <ComparisonCard
            {...withoutAI}
            variant="traditional"
          />

          <ComparisonCard
            {...withAI}
            variant="ai"
          />
        </div>

        {/* Integração com Frigosoft */}
        {footer && (
          <div className="mx-auto mt-20 grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <h3 className="max-w-md text-balance text-[34px] font-medium leading-[1.1] tracking-tight lg:text-[32px]">
                Tudo conectado ao Frigosoft
              </h3>

              <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground dark:text-surface-muted-foreground lg:text-lg">
                Da imagem da carcaça à classificação final, os dados ficam registrados no fluxo operacional do frigorífico.
              </p>
            </div>

            <div className="w-full min-w-0">
              {footer}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export { OperationalBenefits };