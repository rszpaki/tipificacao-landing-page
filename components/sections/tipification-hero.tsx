import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { GeistBadge } from "@/components/ui/geist-badge";
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
    "A IA analisa cobertura de gordura e conformação, sugere a classificação e conecta o resultado ao Frigosoft para uma operação mais orientada por dados.",
  buttonText: "Agendar uma demonstração",
  buttonUrl: "#demonstracao",
  imageSrc: "/images/hero/atak-hero-img.png",
  imageAlt:
    "Tipificação de carcaças com IA integrada ao Frigosoft",
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
    <section className={cn("overflow-hidden py-20 lg:py-24", className)}>
      <div className="container mx-auto">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24 xl:gap-32">
          {/* Conteúdo */}
          <div className="flex min-w-0 flex-col items-center gap-6 text-center lg:items-start lg:text-left">
            <GeistBadge variant="turbo" contrast="low">
              IA integrada à operação
            </GeistBadge>

            <h1 className="max-w-2xl text-[44px] font-medium leading-[1.04] tracking-tight sm:text-balance md:text-[56px] md:leading-[1.05] lg:text-wrap lg:text-[58px] xl:text-[64px]">
              {heading}
            </h1>

            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>

            {/* 24px do gap + 8px = 32px entre texto e CTA */}
            <div className="mt-2">
              <Button
                size="lg"
                className="w-auto font-semibold"
                render={<a href={buttonUrl} />}
                nativeButton={false}
              >
                {buttonText}

                <ArrowRight
                  className="size-4"
                  strokeWidth={1.75}
                />
              </Button>
            </div>
          </div>

          {/* Imagem */}
          <div className="flex w-full items-center justify-center lg:justify-end">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={1288}
              height={2615}
              sizes="(max-width: 639px) 246px, (max-width: 1023px) 257px, 320px"
              preload
              decoding="async"
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
        </div>
      </div>
    </section>
  );
};

export { TipificationHero };