import {
  Smartphone,
  ScanLine,
  Check,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FeatureIconListItem {
  title: string;
  description: string;
  icon?: React.ReactNode;
  href?: string;
}

interface ButtonProps {
  text: string;
  url: string;
  icon?: React.ReactNode;
}

interface Buttons {
  primary?: ButtonProps;
  secondary?: ButtonProps;
}

interface FeatureIconListProps {
  heading: string;
  features?: FeatureIconListItem[];
  buttons?: Buttons;
  className?: string;
}

interface Feature43Props extends FeatureIconListProps {}

type Props = Partial<Feature43Props>;

const defaultProps: Feature43Props = {
  heading: "Faça a classificação da carcaça em segundos",
  features: [
  {
    icon: <Smartphone className="size-5" />,
    title: "Fotografe",
    description:
      "Com o smartphone, o operador registra a carcaça diretamente na linha de abate, com flexibilidade e sem depender de equipamento fixo.",
  },
  {
    icon: <ScanLine className="size-5" />,
    title: "Analise",
    description:
      "A IA avalia cobertura de gordura e conformação muscular para sugerir a classificação em segundos, trazendo mais padronização ao processo.",
  },
  {
    icon: <Check className="size-5" />,
    title: "Confirme",
    description:
      "O operador confirma ou ajusta a classificação, enquanto imagem, sugestão da IA e avaliação final ficam registradas no Frigosoft.",
  },
],
  buttons: {
    primary: {
      text: "Fale com um especialista",
      url: "https://www.atak.com.br",
    },
  },
};

const MAX_FEATURES = 6;

const Feature43 = (props: Props) => {
  const { heading, buttons, features, className } = {
    ...defaultProps,
    ...props,
  };

  const items = (features ?? []).slice(0, MAX_FEATURES);

  return (
    <section className={cn("bg-muted/40 py-32", className)}>
      <div className="container mx-auto">
        {/* Título */}
        {heading && (
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="text-4xl font-semibold tracking-tight text-pretty lg:text-5xl">
              {heading}
            </h2>
          </div>
        )}

        {/* Floating Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((feature, i) => (
            <div
              key={i}
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

              {/* Título do card */}
              <h3 className="mb-3 text-xl font-semibold">
                {feature.title}
              </h3>

              {/* Descrição */}
              <p className="leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        {buttons?.primary?.url && (
          <div className="mt-16 flex justify-center">
            <Button
              size="lg"
              render={<a href={buttons.primary.url} />}
              nativeButton={false}
            >
              {buttons.primary.text}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export { Feature43 };