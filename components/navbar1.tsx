"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
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
    <section className={cn("border-b border-muted py-4", className)}>
      <div className="container mx-auto">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <a href={logo.url} aria-label={logo.title}>
            <img
              src={logo.src}
              alt={logo.alt}
              className={cn(
                "h-8 w-auto dark:invert",
                logo.className
              )}
            />
          </a>

          {/* Toggle Light / Dark */}
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
              grid
              h-10
              w-[76px]
              cursor-pointer
              grid-cols-2
              items-center
              rounded-full
              border
              border-border
              bg-muted
              p-1
              transition-colors
              duration-300
              disabled:cursor-default
            "
          >
            {/* Indicador animado */}
            <span
              className={cn(
                "absolute left-1 top-1 size-8 rounded-full bg-background shadow-sm transition-transform duration-300 ease-out",
                mounted && isDark && "translate-x-9"
              )}
            />

            {/* Light */}
            <span
              className={cn(
                "relative z-10 flex items-center justify-center transition-all duration-300",
                !isDark
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              <Sun
                className={cn(
                  "size-4 transition-transform duration-300",
                  !isDark && "rotate-0 scale-100",
                  isDark && "-rotate-45 scale-90"
                )}
              />
            </span>

            {/* Dark */}
            <span
              className={cn(
                "relative z-10 flex items-center justify-center transition-all duration-300",
                isDark
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              <Moon
                className={cn(
                  "size-4 transition-transform duration-300",
                  isDark && "rotate-0 scale-100",
                  !isDark && "rotate-45 scale-90"
                )}
              />
            </span>
          </button>
        </nav>
      </div>
    </section>
  );
};

export { Navbar1 };