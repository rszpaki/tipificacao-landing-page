import {
  Check,
  ScanLine,
  Smartphone,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { GeistBadge } from "@/components/ui/geist-badge";
import { cn } from "@/lib/utils";

interface FeatureIconListItem {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface ButtonProps {
  text: string;
  url: string;
}

interface Buttons {
  primary?: ButtonProps;
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
  heading: "Da imagem à classificação com apoio da IA",
  features: [
    {
      icon: <Smartphone className="size-5" />,
      title: "Fotografe",
      description:
        "Com o smartphone, o operador registra a imagem da carcaça diretamente na linha de abate para iniciar a análise.",
    },
    {
      icon: <ScanLine className="size-5" />,
      title: "Analise",
      description:
        "A IA analisa a cobertura de gordura e a conformação muscular para apresentar uma sugestão de classificação ao operador.",
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
      text: "Agendar uma demonstração",
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
    <section
      className={cn(
        "bg-muted/40 py-20 md:py-24 lg:py-32",
        className
      )}
    >
      <div className="container mx-auto">
        {/* Cabeçalho */}
        {heading && (
          <div className="mx-auto mb-16 flex max-w-3xl flex-col items-center gap-6 text-center">
            <GeistBadge variant="turbo" contrast="low">
              IA aplicada à tipificação
            </GeistBadge>

            <h2 className="text-balance text-[38px] font-medium leading-[1.08] tracking-tight lg:text-[48px]">
              {heading}
            </h2>
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
                -translate-y-2
                flex-col
                rounded-2xl
                !border-transparent
                bg-card
                p-8
                shadow-[0_12px_32px_rgba(0,0,0,0.08)]
                ring-1
                ring-inset
                ring-black/[0.06]
                transition-[transform,translate,box-shadow,background-color]
                duration-300

                md:translate-y-0
                md:shadow-none
                md:motion-safe:hover:-translate-y-2
                md:hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]

                dark:bg-surface-subtle
                dark:text-surface-foreground
                dark:ring-white/[0.07]
                dark:shadow-[0_12px_32px_rgba(0,0,0,0.28)]
                dark:md:shadow-none
                dark:md:hover:bg-surface-raised
                dark:md:hover:shadow-[0_12px_32px_rgba(0,0,0,0.28)]
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
              <h3 className="mb-3 text-xl font-semibold">
                {feature.title}
              </h3>

              {/* Descrição */}
              <p className="leading-relaxed text-muted-foreground dark:text-surface-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA — 48px após os cards */}
        {buttons?.primary?.url && (
          <div className="mt-12 flex justify-center">
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