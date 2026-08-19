import {
  Smartphone,
  ScanLine,
  Check,
} from "lucide-react";

import { GeistBadge } from "@/components/ui/geist-badge";
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

type ClassificationWorkflowProps = FeatureIconListProps;

type Props = Partial<ClassificationWorkflowProps>;

const defaultProps: ClassificationWorkflowProps = {
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
        "O operador valida ou ajusta a sugestão da IA, mantendo a decisão final sob seu controle e todo o processo registrado no Frigosoft.",
    },
  ],
  buttons: {
    primary: {
      text: "Veja como funciona",
      url: "#demonstracao",
    },
  },
};

const MAX_FEATURES = 6;

const ClassificationWorkflow = (props: Props) => {
  const { heading, buttons, features, className } = {
    ...defaultProps,
    ...props,
  };

  const items = (features ?? []).slice(0, MAX_FEATURES);

  return (
    <section className={cn("bg-muted/40 py-32", className)}>
      <div className="container mx-auto">
        {/* Cabeçalho */}
        {heading && (
          <div className="mx-auto mb-16 flex max-w-3xl flex-col items-center gap-6 text-center">
            <GeistBadge variant="turbo" contrast="low">
              IA aplicada à tipificação
            </GeistBadge>

            <h2 className="text-4xl font-medium tracking-tight text-pretty lg:text-5xl">
              {heading}
            </h2>
          </div>
        )}

        {/* Cards */}
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

                dark:border-white/10
                dark:bg-zinc-900
                dark:text-white
                dark:hover:bg-zinc-800
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
              <h3 className="mb-3 text-xl font-semibold">
                {feature.title}
              </h3>

              {/* Descrição */}
              <p className="leading-relaxed text-muted-foreground dark:text-zinc-300">
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
              className="w-auto justify-center"
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

export { ClassificationWorkflow };