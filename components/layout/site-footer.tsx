import { cn } from "@/lib/utils";

interface FooterLogo {
  src: string;
  alt: string;
  title?: string;
  width?: number;
  height?: number;
}

interface SiteFooterProps {
  logo?: FooterLogo;
  copyright?: string;
  className?: string;
}

type Props = Partial<SiteFooterProps>;

const defaultProps: SiteFooterProps = {
  logo: {
    src: "/images/logo/atak-sistemas-symbol.svg",
    alt: "Atak Sistemas",
    title: "Atak Sistemas",
    width: 285.3,
    height: 146.9,
  },
  copyright: "© 2026 Atak Sistemas. Todos os direitos reservados.",
};

const SiteFooter = (props: Props) => {
  const { logo, copyright, className } = {
    ...defaultProps,
    ...props,
  };

  return (
    <footer className={cn("border-t border-border/50 py-8", className)}>
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Logo */}
          {logo && (
            // eslint-disable-next-line @next/next/no-img-element -- logo.src is configurable and may point to an external URL
            <img
              src={logo.src}
              alt={logo.alt}
              title={logo.title}
              width={logo.width}
              height={logo.height}
              className="h-5 w-auto dark:invert"
            />
          )}

          {/* Copyright */}
          <p className="text-center text-xs font-medium text-muted-foreground md:text-right">
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export { SiteFooter };
