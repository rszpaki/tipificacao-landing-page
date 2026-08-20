import type { ReactNode } from "react";

import {
  BadgeDollarSign,
  History,
  RefreshCw,
  ScanEye,
} from "lucide-react";

import { FrigosoftIntegrationDiagram } from "@/components/diagrams/frigosoft-integration-diagram";
import { GeistBadge } from "@/components/ui/geist-badge";
import { cn } from "@/lib/utils";

interface FeatureIconListItem {
  title: string;
  description: string;
  icon?: ReactNode;
}

interface OperationalBenefitsProps {
  heading: string;
  description?: string;
  features?: FeatureIconListItem[];
  footer?: ReactNode;
  className?: string;
}

type Props = Partial<OperationalBenefitsProps>;

const defaultProps: OperationalBenefitsProps = {
  heading: "Do olho ao dado",

  description:
    "A tipificação de carcaças com IA reúne análise, sugestão e validação do operador em informações integradas ao Frigosoft.",

  features: [
    {
      icon: <ScanEye className="size-5" strokeWidth={1.5} />,
      title: "Análise assistida por IA",
      description:
        "A IA analisa cobertura de gordura e conformação para apresentar uma sugestão de classificação.",
    },
    {
      icon: <RefreshCw className="size-5" strokeWidth={1.5} />,
      title: "Validação do operador",
      description:
        "O operador pode validar ou ajustar a sugestão da IA, mantendo a decisão final sobre a classificação.",
    },
    {
      icon: <BadgeDollarSign className="size-5" strokeWidth={1.5} />,
      title: "Registro da classificação",
      description:
        "A sugestão da IA e a classificação final do operador ficam registradas no fluxo do Frigosoft.",
    },
    {
      icon: <History className="size-5" strokeWidth={1.5} />,
      title: "Histórico das classificações",
      description:
        "As informações registradas ficam disponíveis para consulta e comparação no fluxo operacional.",
    },
  ],

  footer: <FrigosoftIntegrationDiagram />,
};

const OperationalBenefits = (props: Props) => {
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

  const items = (features ?? []).slice(0, 4);

  return (
    <section
      className={cn(
        "bg-muted py-20 dark:bg-surface-subtle lg:py-24",
        className
      )}
    >
      <div className="container mx-auto">
        {/* Cabeçalho */}
        <div className="mx-auto mb-14 flex max-w-3xl flex-col items-center text-center">
          <div className="flex flex-col items-center gap-6">
            <GeistBadge variant="turbo" contrast="low">
              IA no apoio à decisão
            </GeistBadge>

            <h2 className="text-balance text-[38px] font-medium leading-[1.08] tracking-tight lg:text-[48px]">
              {heading}
            </h2>
          </div>

          {description && (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground dark:text-surface-muted-foreground">
              {description}
            </p>
          )}
        </div>

        {/* Features */}
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          {items.map((feature, idx) => (
            <div
              key={idx}
              className="
                group
                flex
                h-full
                flex-col
                rounded-2xl
                border
                border-border/60
                bg-card
                p-8
                shadow-sm
                transition-[transform,translate,box-shadow,background-color]
                duration-300

                motion-safe:hover:-translate-y-2
                hover:shadow-xl

                dark:border-border
                dark:bg-surface-raised
                dark:text-surface-foreground
                dark:hover:bg-surface-raised-hover
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
                  text-foreground
                  transition-[transform,scale,background-color,color]
                  duration-300

                  motion-safe:group-hover:scale-110

                  dark:bg-surface-overlay
                  dark:text-surface-foreground
                  dark:group-hover:bg-surface-overlay-hover
                "
              >
                {feature.icon}
              </div>

              {/* Título */}
              <h3 className="mb-3 text-xl font-semibold tracking-tight">
                {feature.title}
              </h3>

              {/* Descrição */}
              <p className="leading-relaxed text-muted-foreground dark:text-surface-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Integração */}
        {footer && (
          <div className="mx-auto mt-14 grid w-full max-w-6xl items-center gap-6 lg:grid-cols-2">
            {/* Texto */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <h3 className="max-w-md text-balance text-[34px] font-medium leading-[1.1] tracking-tight lg:text-[40px]">
                Tudo conectado à operação do frigorífico
              </h3>

              <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground dark:text-surface-muted-foreground lg:text-lg">
                As informações da tipificação são integradas ao Frigosoft
                e ficam disponíveis no fluxo operacional.
              </p>
            </div>

            {/* Animação */}
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