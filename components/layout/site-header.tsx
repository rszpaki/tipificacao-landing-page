"use client";

import { useSyncExternalStore } from "react";
import { MoonStar, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

interface SiteHeaderProps {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
    className?: string;
    width?: number;
    height?: number;
  };
}

const subscribeToClientEnvironment = () => () => {};

const SiteHeader = ({
  logo = {
    url: "/",
    src: "/images/logo/atak-sistemas-logo.svg",
    alt: "Atak Sistemas",
    title: "Atak Sistemas",
    width: 1163.5,
    height: 146.9,
  },
  className,
}: SiteHeaderProps) => {
  const { resolvedTheme, setTheme } = useTheme();

  const mounted = useSyncExternalStore(
    subscribeToClientEnvironment,
    () => true,
    () => false
  );

  const isDark = mounted && resolvedTheme === "dark";
  const themeToggleLabel = isDark
    ? "Ativar tema claro"
    : "Ativar tema escuro";

  const toggleTheme = () => {
    if (!mounted) return;

    const transitionGuard = document.createElement("style");

    transitionGuard.textContent =
      "*,*::before,*::after{transition-property:transform,translate,scale,rotate,opacity,filter!important}";

    document.head.appendChild(transitionGuard);

    setTheme(isDark ? "light" : "dark");

    void document.body.offsetHeight;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => transitionGuard.remove());
    });
  };

  return (
    <header
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
            className="flex h10 items-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- logo.src is configurable and may point to an external URL */}
            <img
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className={cn(
                "block h-3 w-auto dark:invert",
                logo.className
              )}
            />
          </a>

          {/* Light / Dark toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            disabled={!mounted}
            aria-label={themeToggleLabel}
            aria-pressed={isDark}
            title={themeToggleLabel}
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
                "transition-transform duration-300 ease-out",
                isDark && "translate-x-[37px]"
              )}
            />

            {/* Light */}
            <span
              className={cn(
                "absolute left-[3px] top-[3px] z-10 grid size-8 place-items-center",
                "transition-colors duration-300",
                mounted
                  ? isDark
                    ? "text-muted-foreground"
                    : "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              <Sun
                className="size-4"
                strokeWidth={2}
                aria-hidden="true"
              />
            </span>

            {/* Dark */}
            <span
              className={cn(
                "absolute right-[2px] top-[3px] z-10 grid size-8 place-items-center",
                "transition-colors duration-300",
                mounted
                  ? isDark
                    ? "text-foreground"
                    : "text-muted-foreground"
                  : "text-muted-foreground"
              )}
            >
              <MoonStar
                className="size-4"
                strokeWidth={2}
                aria-hidden="true"
              />
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export { SiteHeader };
