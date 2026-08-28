import type { ReactNode } from "react";

import { Check, X } from "lucide-react";

import { FrigosoftIntegrationDiagram } from "@/components/diagrams/frigosoft-integration-diagram";
import { GeistBadge } from "@/components/ui/geist-badge";
import { cn } from "@/lib/utils";

interface ComparisonItem {
  eyebrow: string;
  title: string;
  description: string;
  items: string[];
}

interface OperationalBenefitsProps {
  heading?: string;
  withoutAI?: ComparisonItem;
  withAI?: ComparisonItem;
  footer?: ReactNode;
  className?: string;
}

const defaultWithoutAI: ComparisonItem = {
  eyebrow: "Processo tradicional",
  title: "Sem tipificação por IA",
  description:
    "No processo tradicional, a classificação depende da avaliação visual realizada pelo operador.",
  items: [
    "Avaliação baseada apenas na percepção visual.",
    "Maior dependência da experiência de cada operador.",
    "Conferências e ajustes podem consumir mais tempo.",
    "Classificação registrada de forma manual.",
    "Menos referência para comparar decisões.",
  ],
};

const defaultWithAI: ComparisonItem = {
  eyebrow: "Processo seguro",
  title: "Com tipificação por IA",
  description:
    "A IA apoia a classificação, o operador mantém a decisão final e tudo fica registrado no Frigosoft.",
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
  description,
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

          // Mesma superfície dos cards do ClassificationWorkflow
          "bg-card",

          "p-6",
          "ring-1",
          "ring-inset",
          "ring-black/[0.06]",

          "transition-[transform,translate,box-shadow,background-color]",
          "duration-300",

          "sm:p-8",
          "lg:p-9",

          // Dark — igual ao ClassificationWorkflow
          "dark:bg-surface-subtle",
          "dark:text-surface-foreground",
          "dark:ring-white/[0.07]",
        ],
        isAI
          ? [
              // Mobile: floating constante
              "-translate-y-2",
              "shadow-[0_12px_32px_rgba(0,0,0,0.08)]",

              // Tablet/desktop: estado normal
              "md:translate-y-0",
              "md:shadow-none",

              // Desktop: floating no hover
              "md:motion-safe:hover:-translate-y-2",
              "md:hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]",

              // Dark mobile: floating constante
              "dark:shadow-[0_12px_32px_rgba(0,0,0,0.28)]",

              // Dark tablet/desktop: normal
              "dark:md:shadow-none",

              // Dark desktop: mesma mudança de cor do ClassificationWorkflow
              "dark:md:hover:bg-surface-raised",
              "dark:md:hover:shadow-[0_12px_32px_rgba(0,0,0,0.28)]",
            ]
          : [
              // Card tradicional permanece estático
              "translate-y-0",
              "shadow-none",
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
              bg-foreground/[0.04]
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
      <h3 className="mt-6 text-[28px] font-medium leading-[1.1] tracking-tight sm:text-[30px]">
        {title}
      </h3>

      {/* Descrição */}
      <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground dark:text-surface-muted-foreground">
        {description}
      </p>

      {/* Divisor */}
      <div className="my-7 h-px w-full bg-border/70" />

      {/* Itens */}
      <ul className="flex flex-col gap-4">
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
  withoutAI = defaultWithoutAI,
  withAI = defaultWithAI,
  footer = <FrigosoftIntegrationDiagram />,
  className,
}: OperationalBenefitsProps) => {
  return (
    <section
      className={cn(
        // Mesmo background do ClassificationWorkflow
        "bg-muted/40 py-20 lg:py-24",
        className
      )}
    >
      <div className="container mx-auto">
        {/* Comparativo */}
        <div className="mx-auto mb-14 flex max-w-3xl flex-col items-center text-center">
          <div className="flex flex-col items-center gap-6">
            <GeistBadge variant="turbo" contrast="low">
              Comparativo operacional
            </GeistBadge>

            <h2 className="text-balance text-[38px] font-medium leading-[1.08] tracking-tight lg:text-[48px]">
              {heading}
            </h2>
          </div>
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
              <h3 className="max-w-md text-balance text-[34px] font-medium leading-[1.1] tracking-tight lg:text-[40px]">
                Tudo conectado ao Frigosoft
              </h3>

              <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground dark:text-surface-muted-foreground lg:text-lg">
                As informações da tipificação são integradas ao Frigosoft e passam a fazer parte do fluxo operacional do frigorífico.
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