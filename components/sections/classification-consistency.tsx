import Image from "next/image";

import { Button } from "@/components/ui/button";
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

type ClassificationConsistencyProps = FeatureSingleFocusProps;
type Props = Partial<ClassificationConsistencyProps>;

const defaultProps: ClassificationConsistencyProps = {
  heading: "Mais informação para decidir melhor",
  description:
    "Com as informações registradas no Frigosoft, a operação ganha mais referência e a gestão ganha mais visibilidade.",
  image: {
    src: "/images/atak-tipificacao-com-ia.png",
    alt: "Operador utilizando a tipificação de carcaças com inteligência artificial",
  },
  buttons: {
    primary: {
      text: "Solicitar demonstração",
      url: "#demonstracao",
    },
  },
};

const ClassificationConsistency = (props: Props) => {
  const {
    heading,
    description,
    image,
    buttons,
    className,
  } = {
    ...defaultProps,
    ...props,
  };

  return (
    <section
      className={cn(
        "overflow-x-clip overflow-y-visible pt-20 lg:pt-24",
        className
      )}
    >
      <div className="container mx-auto">
        <div
          className="
            grid
            items-stretch
            gap-0

            lg:min-h-[640px]
            lg:grid-cols-2
            lg:gap-24

            xl:min-h-[680px]
            xl:gap-32
          "
        >
          {/* Imagem */}
          <div
            className="
              pointer-events-none
              relative
              z-0
              order-2
              min-h-[480px]
              w-full
              self-stretch

              sm:min-h-[600px]

              lg:order-1
              lg:min-h-0
            "
          >
            {/*
              O wrapper controla tamanho e posicionamento.
              Os valores abaixo preservam suas configurações atuais.
            */}
            <div
              className="
                pointer-events-none
                absolute
                block
                w-full
                max-w-none
                select-none

                /* MOBILE */
                bottom-0
                left-[60%]
                h-[430px]
                -translate-x-1/2
                translate-y-0
                scale-[1.1]
                origin-bottom

                /* TABLET */
                sm:bottom-0
                sm:left-[50%]
                sm:h-[520px]
                sm:w-full
                sm:max-w-none
                sm:-translate-x-1/2
                sm:translate-y-0
                sm:scale-[1.15]
                sm:origin-bottom-center

                /* DESKTOP */
                lg:bottom-0
                lg:left-[-64px]
                lg:h-full
                lg:w-full
                lg:max-w-none
                lg:translate-x-0
                lg:translate-y-0
                lg:scale-[1.08]
                lg:origin-bottom-left

                /* DESKTOP GRANDE */
                xl:scale-[1.7]
              "
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 639px) 280px, (max-width: 1023px) 340px, 520px"
                unoptimized
                decoding="async"
                draggable={false}
                className="
                  pointer-events-none
                  select-none
                  object-contain
                  object-bottom

                  lg:object-left-bottom
                "
              />
            </div>
          </div>

          {/* Conteúdo */}
          <div
            className="
              relative
              z-10
              order-1
              flex
              min-w-0
              flex-col
              items-center
              gap-6
              pb-8
              text-center

              /* DESKTOP — POSIÇÃO DO TEXTO */
              lg:order-2
              lg:items-start
              lg:justify-start
              lg:pt-0
              lg:pb-24
              lg:text-left
            "
          >
            <h2 className="max-w-xl text-balance text-[32px] font-medium leading-[1.08] tracking-tight lg:text-[48px]">
              {heading}
            </h2>

            <p className="max-w-xl whitespace-pre-line text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>

            {buttons?.primary?.url && (
              <div className="mt-2">
                <Button
                  size="lg"
                  className="w-auto font-regular"
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