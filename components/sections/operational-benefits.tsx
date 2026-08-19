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
    "A Tipificação de Animais com IA transforma a avaliação da carcaça em informação para uma operação mais precisa.",

  features: [
    {
      icon: <ScanEye className="size-5" strokeWidth={1.5} />,
      title: "Precisão na avaliação",
      description:
        "A IA aplica os mesmos critérios em cada carcaça, trazendo mais objetividade para a avaliação.",
    },
    {
      icon: <RefreshCw className="size-5" strokeWidth={1.5} />,
      title: "Consistência na classificação",
      description:
        "Mais uniformidade entre operadores e turnos, com correções que ajudam a aprimorar o modelo.",
    },
    {
      icon: <BadgeDollarSign className="size-5" strokeWidth={1.5} />,
      title: "Segurança na precificação",
      description:
        "Mais informação sobre a carcaça para apoiar uma precificação mais criteriosa da matéria-prima.",
    },
    {
      icon: <History className="size-5" strokeWidth={1.5} />,
      title: "Histórico para análise",
      description:
        "Dados registrados por lote, período e produtor para apoiar compras, comparações e decisões da operação.",
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
        "bg-muted py-20 dark:bg-zinc-900 lg:py-24",
        className
      )}
    >
      <div className="container mx-auto">
        {/* Cabeçalho */}
        <div className="mx-auto mb-14 flex max-w-3xl flex-col items-center text-center">
          <div className="flex flex-col items-center gap-6">
            <GeistBadge variant="turbo" contrast="low">
              Inteligência para decidir melhor
            </GeistBadge>

            <h2 className="text-pretty text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl">
              {heading}
            </h2>
          </div>

          {description && (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground dark:text-zinc-300">
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
                transition-all
                duration-300

                hover:-translate-y-2
                hover:shadow-xl

                dark:border-white/10
                dark:bg-zinc-800
                dark:text-white
                dark:hover:bg-zinc-700
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
                  transition-all
                  duration-300

                  group-hover:scale-110

                  dark:bg-white/10
                  dark:text-white
                  dark:group-hover:bg-white/15
                "
              >
                {feature.icon}
              </div>

              {/* Título */}
              <h3 className="mb-3 text-xl font-semibold tracking-tight">
                {feature.title}
              </h3>

              {/* Descrição */}
              <p className="leading-relaxed text-muted-foreground dark:text-zinc-300">
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
              <h3 className="max-w-md text-pretty text-3xl font-medium tracking-tight lg:text-4xl">
                Tudo conectado à operação do frigorífico
              </h3>

              <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground dark:text-zinc-300 lg:text-lg">
                A tipificação gera dados que acompanham a carcaça e apoiam
                diferentes etapas da operação.
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