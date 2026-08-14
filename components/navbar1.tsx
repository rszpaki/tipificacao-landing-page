"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Navbar1Props {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
    className?: string;
  };
  auth?: {
    signup: {
      title: string;
      url: string;
    };
  };
}

const Navbar1 = ({
  logo = {
    url: "/",
    src: "/images/logo/atak-sistemas-logo.svg",
    alt: "Atak Sistemas",
    title: "Atak Sistemas",
  },
  auth = {
    signup: {
      title: "Fale com um especialista",
      url: "#",
    },
  },
  className,
}: Navbar1Props) => {
  return (
    <section className={cn("border-b border-muted py-4", className)}>
      <div className="container mx-auto">
        <nav className="flex items-center justify-between">
          {/* Logo */}
            <img
              src={logo.src}
              alt={logo.alt}
              className="h-8 w-auto dark:invert"
            />

          {/* Botão */}
          <Button
            size="lg"
            render={<a href={auth.signup.url} />}
            nativeButton={false}
          >
            {auth.signup.title}
          </Button>
        </nav>
      </div>
    </section>
  );
};

export { Navbar1 };