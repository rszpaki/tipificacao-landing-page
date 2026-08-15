import { ArrowRight } from "lucide-react";

import { GeistBadge } from "@/components/ui/geist-badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern"

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

interface HeroBasicProps {
  heading: string;
  description: string;
  buttons?: Buttons;
  image: Image;
  className?: string;
}

interface Hero115Props extends HeroBasicProps {}

type Props = Partial<Hero115Props>;

const defaultProps: Hero115Props = {
  heading: "Mais precisão na carcaça. Mais segurança na precificação.",
  description:
    "Não é só automação, é a classificação da carcaça saindo do campo da percepção e entrando no campo do dado registrado, auditável e integrado ao Frigosoft.",
  buttons: {
    primary: {
      text: "Conheça o módulo",
      url: "#demonstracao",
    },
    secondary: {
      text: "Visitar o site da Atak",
      url: "#demonstracao",
    },
  },
  image: {
    src: "/images/hero/tipificação-atak-sistemas.png",
    alt: "Tipificação de animais com inteligência artificial",
  },
};

const Hero115 = (props: Props) => {
  const { description, buttons, image, className } = {
    ...defaultProps,
    ...props,
  };

  return (
    <section className={cn("overflow-hidden py-20 lg:py-24", className)}>
      <div className="container mx-auto">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24 xl:gap-32">
          
          {/* Conteúdo */}
          <div className="flex min-w-0 flex-col items-center gap-6 text-center lg:items-start lg:text-left">
            
            {/* Badge */}
            <GeistBadge variant="turbo" contrast="low">
  Tipificação de Animais com IA
</GeistBadge>

            {/* Título */}
            <h1 className="w-full text-center text-4xl font-medium tracking-tight md:text-5xl lg:text-left lg:text-[46px] lg:leading-[1.08] xl:text-[50px]">
              <span className="block lg:whitespace-nowrap">
                Mais precisão na carcaça.
              </span>

              <span className="block">
                Mais segurança na precificação.
              </span>
            </h1>

            {/* Descrição */}
            <p className="max-w-2xl text-center text-lg leading-relaxed text-muted-foreground md:text-xl lg:text-left">
              {description}
            </p>

            {/* Botão */}
            {buttons?.primary && (
  <Button
    size="lg"
    className="w-auto lg:w-auto"
    render={<a href={buttons.primary.url} />}
    nativeButton={false}
  >
    {buttons.primary.text}
    <ArrowRight className="size-4" />
  </Button>
)}
          </div>

          {/* Imagem */}
          <div className="flex w-full items-center justify-center lg:justify-end">
            <img
              src={image.src}
              alt={image.alt}
              className="h-auto max-h-[420px] w-auto max-w-full object-contain sm:max-h-[480px] lg:max-h-[650px]"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export { Hero115 };