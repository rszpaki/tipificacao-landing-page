import { GeistBadge } from "@/components/ui/geist-badge";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

interface Image {
  src: string;
  alt: string;
  srcDark?: string;
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

interface FeatureSingleFocusProps {
  heading: string;
  description: string;
  image: Image;
  buttons?: Buttons;
  className?: string;
}

type Props = Partial<FeatureSingleFocusProps>;

const defaultProps: FeatureSingleFocusProps = {
  heading: "Menos variação na avaliação. Mais confiança no acerto.",
  description:
    "A avaliação manual pode variar entre operadores, turnos e animais. Com a Tipificação de Animais com IA, o frigorífico ganha um novo ponto de referência para avaliar cada carcaça com mais consistência.",
  buttons: {
    primary: {
      text: "Conheça a solução",
      url: "#demonstracao",
    },
  },
  image: {
    src: "/images/hero/tipificação-atak-sistemas.png",
    alt: "Tipificação de animais com inteligência artificial",
  },
};

const Feature1 = (props: Props) => {
  const { heading, description, image, buttons, className } = {
    ...defaultProps,
    ...props,
  };

  return (
    <section className={cn("overflow-hidden py-20 lg:py-24", className)}>
      <div className="container mx-auto">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24 xl:gap-32">
          {/* Imagem */}
          <div className="flex w-full items-center justify-center lg:justify-start">
            <img
              src={image.src}
              alt={image.alt}
              className="h-auto max-h-[420px] w-auto max-w-full object-contain sm:max-h-[480px] lg:max-h-[650px]"
            />
          </div>

          {/* Conteúdo */}
          <div className="flex min-w-0 flex-col items-center text-center lg:items-start lg:text-left">
            {/* Badge + Título */}
            <div className="mb-6 flex flex-col items-center gap-6 lg:items-start">
              <GeistBadge variant="turbo" contrast="low">
                IA para avaliar melhor
              </GeistBadge>

              <h2 className="text-4xl font-medium tracking-tight text-balance lg:text-5xl">
                {heading}
              </h2>
            </div>

            {/* Descrição */}
            {description && (
              <p className="mb-8 max-w-xl text-muted-foreground lg:text-lg">
                {description}
              </p>
            )}

            {/* CTA */}
            {buttons?.primary && (
              <div className="flex w-auto flex-col justify-center gap-2 sm:flex-row lg:justify-start">
                <Button
                  variant="default"
                  size="lg"
                  render={<a href={buttons.primary.url} />}
                  nativeButton={false}
                >
                  {buttons.primary.text}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature1 };