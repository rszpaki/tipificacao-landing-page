import Image from "next/image";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroProps {
  heading?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
}

const defaultProps = {
  heading: "Tipificação de carcaças com inteligência artificial",
  description:
    "A IA analisa cobertura de gordura e conformação, apresenta uma sugestão de classificação ao operador e integra os dados ao Frigosoft.",
  buttonText: "Solicitar demonstração",
  buttonUrl: "#demonstracao",
  imageSrc: "/images/hero/atak-tipificacao-com-ia-hero.png",
  imageAlt:
    "Tipificação de carcaças com inteligência artificial integrada ao Frigosoft",
};

const TipificationHero = ({
  heading = defaultProps.heading,
  description = defaultProps.description,
  buttonText = defaultProps.buttonText,
  buttonUrl = defaultProps.buttonUrl,
  imageSrc = defaultProps.imageSrc,
  imageAlt = defaultProps.imageAlt,
  className,
}: HeroProps) => {
  return (
    <section
      className={cn(
        "overflow-hidden pt-20 lg:pt-24",
        className
      )}
    >
      <div className="container mx-auto">
        <div
          className="
            grid
            items-stretch
            gap-0

            lg:min-h-[720px]
            lg:grid-cols-2
            lg:gap-24

            xl:min-h-[680px]
            xl:gap-32
          "
        >
          {/* Conteúdo textual */}
          <div
            className="
              flex
              min-w-0
              flex-col
              items-center
              gap-8
              pb-8
              text-center

              lg:items-start
              lg:justify-start
              lg:pt-0
              lg:pb-24
              lg:text-left
            "
          >
            <h1 className="max-w-2xl text-[44px] font-medium leading-[1.04] tracking-tight sm:text-balance md:text-[56px] md:leading-[1.05] lg:text-wrap lg:text-[58px] xl:text-[64px]">
              {heading}
            </h1>

            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>

            <div className="mt-2">
              <Button
                size="lg"
                className="w-auto font-regular"
                render={<a href={buttonUrl} />}
                nativeButton={false}
              >
                {buttonText}
              </Button>
            </div>
          </div>

          {/* Imagem */}
          <div
            className="
              relative
              flex
              min-h-[480px]
              w-full
              items-end
              justify-center
              self-stretch

              sm:min-h-[500px]

              lg:min-h-0
              lg:justify-end
            "
          >
            {/*
              Este wrapper controla SOMENTE o tamanho e a posição visual.
              Os valores abaixo são exatamente os seus valores atuais.
            */}
            <div
              className="
                relative

                /* MOBILE */
                w-full
                max-w-full
                -translate-x-24
                -translate-y-6
                scale-[1.15]
                origin-bottom-center

                /* TABLET */
                sm:-translate-x-20
                sm:-translate-y-0
                sm:scale-[.95]
                sm:origin-bottom

                /* DESKTOP */
                lg:absolute
                lg:bottom-0
                lg:right-0
                lg:h-[90%]
                lg:w-auto
                lg:max-w-none
                lg:translate-x-16
                lg:translate-y-0
                lg:scale-[1.12]
                lg:origin-bottom-right

                /* DESKTOP GRANDE */
                xl:h-[100%]
                xl:scale-[1.08]
              "
            >
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={1288}
                height={2615}
                sizes="(max-width: 639px) 360px, (max-width: 1023px) 420px, 600px"
                preload
                unoptimized
                decoding="async"
                className="
                  block
                  h-auto
                  w-full
                  max-w-full
                  object-contain
                  object-bottom

                  lg:h-full
                  lg:w-auto
                  lg:max-w-none
                "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { TipificationHero };