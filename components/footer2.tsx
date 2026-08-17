import { cn } from "@/lib/utils";

interface FooterLogo {
  src: string;
  alt: string;
  title?: string;
}

interface Footer2Props {
  logo?: FooterLogo;
  copyright?: string;
  className?: string;
}

type Props = Partial<Footer2Props>;

const defaultProps: Footer2Props = {
  logo: {
    src: "/images/logo/atak-sistemas-symbol.svg",
    alt: "Atak Sistemas",
    title: "Atak Sistemas",
  },
  copyright: "© 2026 Atak Sistemas. Todos os direitos reservados.",
};

const Footer2 = (props: Props) => {
  const { logo, copyright, className } = {
    ...defaultProps,
    ...props,
  };

  return (
    <section className={cn("border-t border-border/50 py-8", className)}>
      <div className="container mx-auto">
        <footer className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Logo */}
          {logo && (
            <img
              src={logo.src}
              alt={logo.alt}
              title={logo.title}
              className="h-5 w-auto dark:invert"
            />
          )}

          {/* Copyright */}
          <p className="text-center text-xs font-medium text-muted-foreground md:text-right">
            {copyright}
          </p>
        </footer>
      </div>
    </section>
  );
};

export { Footer2 };