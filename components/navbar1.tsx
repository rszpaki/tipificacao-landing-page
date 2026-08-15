"use client";

import { useEffect, useState } from "react";
import { MoonStar, Sun } from "lucide-react";
import { useTheme } from "next-themes";

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
}

const Navbar1 = ({
  logo = {
    url: "/",
    src: "/images/logo/atak-sistemas-logo.svg",
    alt: "Atak Sistemas",
    title: "Atak Sistemas",
  },
  className,
}: Navbar1Props) => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <section
      className={cn(
        "border-b border-muted py-6",
        className
      )}
    >
      <div className="container mx-auto">
        <nav className="flex min-h-10 items-center justify-between">
          {/* Logo */}
          <a
            href={logo.url}
            aria-label={logo.title}
            className="flex h-10 items-center"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className={cn(
                "block h-8 w-auto dark:invert",
                logo.className
              )}
            />
          </a>

          {/* Light / Dark toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            disabled={!mounted}
            aria-label={
              isDark
                ? "Ativar modo claro"
                : "Ativar modo escuro"
            }
            title={
              isDark
                ? "Ativar modo claro"
                : "Ativar modo escuro"
            }
            className="
              relative
              h-10
              w-[76px]
              shrink-0
              cursor-pointer
              rounded-full
              border
              border-border
              bg-muted
              disabled:cursor-default
            "
          >
            {/* Indicador */}
            <span
              className={cn(
                "absolute left-[3px] top-[3px] size-8 rounded-full bg-background shadow-sm",
                mounted && isDark && "translate-x-9"
              )}
            />

            {/* Light */}
            <span
              className={cn(
                "absolute left-[3px] top-[3px] z-10 grid size-8 place-items-center",
                !isDark
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              <Sun className="size-4" />
            </span>

            {/* Dark */}
            <span
              className={cn(
                "absolute right-[3px] top-[3px] z-10 grid size-8 place-items-center",
                isDark
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              <MoonStar className="size-4" />
            </span>
          </button>
        </nav>
      </div>
    </section>
  );
};

export { Navbar1 };