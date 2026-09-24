"use client";

import {
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import { MoonStar, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

/* ================================================================
   CONTROLES DO FADE MOBILE
   ================================================================ */

/*
 * ALTURA DO FADE
 *
 * Quanto maior, mais longa fica a transição.
 *
 * Exemplos:
 * 100px = curto
 * 140px = equilibrado
 * 180px = mais longo
 */
const MOBILE_FADE_HEIGHT = "140px";

/*
 * VELOCIDADE PARA O FADE SUMIR QUANDO O FOOTER APARECE
 *
 * 300 = rápido
 * 500 = equilibrado
 * 700 = mais suave
 */
const MOBILE_FADE_TRANSITION_MS = 500;

/* ================================================================ */

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

  const [footerVisible, setFooterVisible] = useState(false);

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
      requestAnimationFrame(() => {
        transitionGuard.remove();
      });
    });
  };

  /*
   * Quando o footer entra na viewport,
   * o fade mobile desaparece.
   */
  useEffect(() => {
    const footer = document.querySelector("footer");

    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setFooterVisible(entry.isIntersecting);
      },
      {
        threshold: 0.02,
      }
    );

    observer.observe(footer);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* =========================================================
          HEADER FIXO
          Mobile + Desktop
          ========================================================= */}
      <header
        className={cn(
          `
            fixed
            inset-x-0
            top-0
            z-50
            border-b
            border-muted
            bg-background
            py-6
          `,
          className
        )}
      >
        <div className="container mx-auto">
          <nav className="flex min-h-10 items-center justify-between">
            {/* Logo */}
            <a
              href={logo.url}
              aria-label={logo.title}
              className="
                flex
                h-10
                items-center
                rounded-sm

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-ring
                focus-visible:ring-offset-2
                focus-visible:ring-offset-background
              "
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className={cn(
                  "block h-3.5 w-auto dark:invert",
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

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-ring
                focus-visible:ring-offset-2
                focus-visible:ring-offset-background

                disabled:cursor-default
              "
            >
              {/* Indicador */}
              <span
                className={cn(
                  `
                    absolute
                    left-[3px]
                    top-[3px]
                    size-8
                    rounded-full
                    bg-background
                    shadow-sm

                    transition-transform
                    duration-300
                    ease-out

                    motion-reduce:transition-none
                  `,
                  isDark && "translate-x-[37px]"
                )}
              />

              {/* Light */}
              <span
                className={cn(
                  `
                    absolute
                    left-[3px]
                    top-[3px]
                    z-10
                    grid
                    size-8
                    place-items-center

                    transition-colors
                    duration-300

                    motion-reduce:transition-none
                  `,
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
                  `
                    absolute
                    right-[2px]
                    top-[3px]
                    z-10
                    grid
                    size-8
                    place-items-center

                    transition-colors
                    duration-300

                    motion-reduce:transition-none
                  `,
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

      {/* =========================================================
          ESPAÇO RESERVADO PARA O HEADER FIXO

          Mobile + Desktop
          ========================================================= */}
      <div
        aria-hidden="true"
        className="h-[89px]"
      />

      {/* =========================================================
          FADE INFERIOR

          SOMENTE MOBILE.

          md:hidden faz o efeito desaparecer completamente
          a partir de 768px.

          CONTROLES:
          - altura: MOBILE_FADE_HEIGHT
          - velocidade: MOBILE_FADE_TRANSITION_MS
          ========================================================= */}
      <div
        aria-hidden="true"
        className={cn(
          `
            pointer-events-none
            fixed
            inset-x-0
            bottom-0
            z-40

            bg-gradient-to-t
            from-background
            via-background/80
            via-[45%]
            to-transparent

            transition-opacity
            ease-out

            motion-reduce:transition-none

            md:hidden
          `,
          footerVisible
            ? "opacity-0"
            : "opacity-100"
        )}
        style={{
          height: MOBILE_FADE_HEIGHT,
          transitionDuration: `${MOBILE_FADE_TRANSITION_MS}ms`,
        }}
      />
    </>
  );
};

export { SiteHeader };