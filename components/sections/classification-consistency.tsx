import Image from "next/image";

import { Button } from "@/components/ui/button";
import { GeistBadge } from "@/components/ui/geist-badge";
import { cn } from "@/lib/utils";

interface FeatureImage {
  src: string;
  alt: string;
}

interface ButtonProps {
  text: string;
  url: string;
}

interface Buttons {
  primary?: ButtonProps;
}

interface FeatureSingleFocusProps {
  heading: string;
  description: string;
  image: FeatureImage;
  buttons?: Buttons;
  className?: string;
}

type Props = Partial<FeatureSingleFocusProps>;

const defaultProps: FeatureSingleFocusProps = {
  heading: "Análise da IA. Decisão final do operador.",
  description:
    "A solução registra a sugestão gerada pela IA e a classificação validada ou ajustada pelo operador, mantendo as informações disponíveis no fluxo do Frigosoft.",
  buttons: {
    primary: {
      text: "Agendar uma demonstração",
      url: "#demonstracao",
    },
  },
  image: {
    src: "/images/atak-tipificacao-img.png",
    alt: "Tipificação de carcaças com IA",
  },
};

const ClassificationConsistency = (props: Props) => {
  const { heading, description, image, buttons, className } = {
    ...defaultProps,
    ...props,
  };

  return (
    <section className={cn("overflow-hidden py-20 lg:py-24", className)}>
      <div className="container mx-auto">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24 xl:gap-32">
          {/* Imagem */}
          <div className="order-2 flex w-full items-center justify-center lg:order-1 lg:justify-start">
            <Image
              src={image.src}
              alt={image.alt}
              width={1288}
              height={2615}
              sizes="(max-width: 639px) 246px, (max-width: 1023px) 257px, 320px"
              className="
                h-auto
                max-h-[500px]
                w-auto
                max-w-full
                object-contain
                sm:max-h-[520px]
                lg:max-h-[650px]
              "
            />
          </div>

          {/* Conteúdo */}
          <div className="order-1 flex min-w-0 flex-col items-center text-center lg:order-2 lg:items-start lg:text-left">
            {/* Badge + título */}
            <div className="mb-6 flex flex-col items-center gap-6 lg:items-start">
              <GeistBadge variant="turbo" contrast="low">
                IA aplicada à avaliação
              </GeistBadge>

              <h2 className="text-balance text-[38px] font-medium leading-[1.08] tracking-tight lg:text-[48px]">
                {heading}
              </h2>
            </div>

            {/* Descrição */}
            {description && (
              <p className="mb-8 max-w-xl leading-relaxed text-muted-foreground lg:text-lg">
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

export { ClassificationConsistency };