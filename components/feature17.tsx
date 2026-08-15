import {
  BadgeDollarSign,
  History,
  RefreshCw,
  ScanEye,
} from "lucide-react";

import { cn } from "@/lib/utils";

interface FeatureIconListItem {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface Feature17Props {
  heading: string;
  description?: string;
  features?: FeatureIconListItem[];
  footer?: string;
  className?: string;
}

type Props = Partial<Feature17Props>;

const defaultProps: Feature17Props = {
  heading: "Do olho ao dado",
  description:
    "A Tipificação de Animais com IA transforma a avaliação da carcaça em informação para uma operação mais precisa.",
  features: [
    {
      icon: <ScanEye className="size-5" />,
      title: "Precisão na avaliação",
      description:
        "A IA aplica os mesmos critérios em cada carcaça.",
    },
    {
      icon: <RefreshCw className="size-5" />,
      title: "Consistência na classificação",
      description:
        "As correções do operador contribuem para o aprimoramento do modelo.",
    },
    {
      icon: <BadgeDollarSign className="size-5" />,
      title: "Segurança na precificação",
      description:
        "Mais informação para precificar a matéria-prima de acordo com as características da carcaça.",
    },
    {
      icon: <History className="size-5" />,
      title: "Histórico para análise",
      description:
        "Dados estruturados por lote, período e produtor para apoiar decisões de compra e operação.",
    },
  ],
  footer: "Tudo conectado à operação do frigorífico.",
};

const Feature17 = (props: Props) => {
  const { heading, description, features, footer, className } = {
    ...defaultProps,
    ...props,
  };

  const items = (features ?? []).slice(0, 4);

  return (
    <section className={cn("bg-muted py-20 lg:py-24", className)}>
      <div className="container mx-auto">
        {/* Cabeçalho */}
        <div className="mx-auto mb-14 flex max-w-3xl flex-col items-center text-center">
          <h2 className="text-3xl font-medium tracking-tight text-pretty md:text-4xl lg:text-5xl">
            {heading}
          </h2>

          {description && (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
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
                  transition-transform
                  duration-300
                  group-hover:scale-110
                "
              >
                {feature.icon}
              </div>

              {/* Título */}
              <h3 className="mb-3 text-xl font-semibold tracking-tight">
                {feature.title}
              </h3>

              {/* Descrição */}
              <p className="leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Fechamento */}
        {footer && (
          <div className="mt-14 text-center">
            <p className="text-lg font-medium tracking-tight">
              {footer}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export { Feature17 };