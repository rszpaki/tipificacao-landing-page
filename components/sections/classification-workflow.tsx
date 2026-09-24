import type { ReactNode } from "react";

import {
  Check,
  ScanLine,
  Smartphone,
} from "lucide-react";

import { FrigosoftIntegrationDiagram } from "@/components/diagrams/frigosoft-integration-diagram";
import { cn } from "@/lib/utils";

interface FeatureIconListItem {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface FeatureIconListProps {
  heading: string;
  description?: string;
  features?: FeatureIconListItem[];
  footer?: ReactNode;
  className?: string;
}

type ClassificationWorkflowProps = FeatureIconListProps;
type Props = Partial<ClassificationWorkflowProps>;

const defaultProps: ClassificationWorkflowProps = {
  heading: "Simples na linha. Completo no processo",
  description:
    "Da captura da imagem ao registro da classificação, tudo acontece dentro do fluxo da operação.",
  features: [
    {
      icon: <Smartphone className="size-5" aria-hidden="true" />,
      title: "Fotografe",
      description:
        "Com o smartphone, o operador registra a imagem da carcaça diretamente na linha de abate para iniciar a análise.",
    },
    {
      icon: <ScanLine className="size-5" aria-hidden="true" />,
      title: "Analise",
      description:
        "A IA analisa a cobertura de gordura e a conformação muscular para apresentar uma sugestão de classificação.",
    },
    {
      icon: <Check className="size-5" aria-hidden="true" />,
      title: "Confirme",
      description:
        "O operador valida ou ajusta a sugestão da IA, mantendo a decisão sob seu controle e o registro no Frigosoft.",
    },
  ],
  footer: <FrigosoftIntegrationDiagram />,
};

const MAX_FEATURES = 6;

const ClassificationWorkflow = (props: Props) => {
  const {
    heading,
    description,
    features,
    footer,
    className,
  } = {
    ...defaultProps,
    ...props,
  };

  const items = (features ?? []).slice(0, MAX_FEATURES);

  const showFrigosoftIntegration = false;

  return (
    <section
      className={cn(
        "bg-muted/40 py-20 md:py-24 lg:py-32",
        className
      )}
    >
      <div className="container mx-auto">
        {/* Cabeçalho */}
        {heading && (
          <div className="mx-auto mb-16 flex max-w-3xl flex-col items-center text-center">
            <h2 className="text-balance text-[32px] font-medium leading-[1.08] tracking-tight lg:text-[48px]">
              {heading}
            </h2>

            {description && (
              <p className="mt-5 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {items.map((feature, i) => (
            <div
              key={i}
              className="
                group
                flex
                h-full
                -translate-y-1
                flex-col
                rounded-2xl
                !border-transparent
                bg-card
                p-8
                shadow-[0_12px_32px_rgba(0,0,0,0.08)]
                ring-1
                ring-inset
                ring-black/[0.06]
                transition-[transform,translate,background-color,box-shadow]
                duration-300

                md:translate-y-0
                md:bg-transparent
                md:shadow-none
                md:motion-safe:hover:-translate-y-2
                md:hover:bg-card
                md:hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]

                dark:bg-[#212121]
                dark:text-surface-foreground
                dark:ring-white/[0.07]
                dark:shadow-none

                dark:md:bg-transparent
                dark:md:hover:bg-[#212121]
                dark:md:hover:shadow-none
              "
            >
              {/* Ícone */}
              <div
                className="
                  mb-6
                  flex
                  size-12
                  items-center
                  justify-center
                  rounded-xl
                  bg-accent
                  transition-[transform,scale,background-color,color]
                  duration-300

                  md:motion-safe:group-hover:scale-110

                  dark:bg-surface-overlay
                  dark:text-surface-foreground
                  dark:md:group-hover:bg-surface-overlay-hover
                "
              >
                {feature.icon}
              </div>

              {/* Título */}
              <h3 className="mb-3 text-xl font-medium">
                {feature.title}
              </h3>

              {/* Descrição */}
              <p className="leading-relaxed text-muted-foreground dark:text-surface-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Integração com Frigosoft — desabilitada temporariamente */}
        {showFrigosoftIntegration && footer && (
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

export { ClassificationWorkflow };