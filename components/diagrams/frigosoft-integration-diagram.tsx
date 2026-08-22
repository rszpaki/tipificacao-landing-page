"use client";

import React, {
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Beef,
  MonitorCog,
  PackageOpen,
  Smartphone,
  ThermometerSnowflake,
  Truck,
} from "lucide-react";

import { AnimatedBeam } from "@/components/ui/animated-beam";
import { cn } from "@/lib/utils";

const Circle = forwardRef<
  HTMLDivElement,
  {
    className?: string;
    children?: React.ReactNode;
  }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        [
          "z-10",
          "flex",
          "size-14",
          "items-center",
          "justify-center",
          "rounded-full",

          // Borda sutil no mesmo padrão dos cards
          "!border-transparent",
          "ring-1",
          "ring-inset",
          "ring-black/[0.06]",

          // Light mode
          "bg-card",
          "text-foreground",

          // Dark mode
          "dark:bg-surface-raised",
          "dark:text-integration-foreground",
          "dark:ring-white/[0.07]",

          // Espaçamento
          "p-3",

          // Transição
          "transition-colors",
          "duration-300",
        ],
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export function FrigosoftIntegrationDiagram({
  className,
}: {
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Entrada
  const smartphoneRef = useRef<HTMLDivElement>(null);

  // Nó central — Frigosoft
  const frigosoftRef = useRef<HTMLDivElement>(null);

  // Saídas / áreas conectadas
  const beefRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);
  const packageRef = useRef<HTMLDivElement>(null);
  const truckRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");

    const updateLayout = () => {
      setIsMobile(mediaQuery.matches);
    };

    updateLayout();

    mediaQuery.addEventListener("change", updateLayout);

    return () => {
      mediaQuery.removeEventListener("change", updateLayout);
    };
  }, []);

  const orientation: "horizontal" | "vertical" = isMobile
    ? "vertical"
    : "horizontal";

  return (
    <div
      ref={containerRef}
      className={cn(
        [
          "relative",
          "flex",
          "h-[460px]",
          "w-full",
          "items-center",
          "justify-center",
          "overflow-hidden",

          // Desktop
          "lg:h-[320px]",
        ],
        className
      )}
    >
      <p className="sr-only">
        Fluxo de integração: o smartphone envia os dados de tipificação ao
        Frigosoft, que integra as informações da carcaça, temperatura, estoque
        e logística.
      </p>

      {/*
        Estrutura:

        MOBILE
              Smartphone
                  ↓
              Frigosoft
             ↙ ↓ ↓ ↘
          áreas conectadas

        DESKTOP
        Smartphone → Frigosoft → áreas conectadas
      */}

      <div
        className="
          flex
          size-full
          w-full
          max-w-lg
          flex-col
          items-center
          justify-between
          px-4
          py-8

          lg:flex-row
          lg:items-stretch
          lg:gap-10
          lg:px-0
          lg:py-0
        "
      >
        {/* Entrada — Smartphone */}
        <div className="flex flex-col items-center justify-center">
          <Circle ref={smartphoneRef}>
            <Smartphone
              className="size-6"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </Circle>
        </div>

        {/* Nó central — Frigosoft */}
        <div className="flex flex-col items-center justify-center">
          <Circle
            ref={frigosoftRef}
            className="
              size-20
              dark:bg-surface-raised
              dark:text-surface-foreground
            "
          >
            <MonitorCog
              className="size-8"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </Circle>
        </div>

        {/* Áreas conectadas */}
        <div
          className="
            flex
            w-full
            flex-row
            items-center
            justify-center
            gap-3

            lg:w-auto
            lg:flex-col
            lg:justify-center
          "
        >
          {/* Carcaça */}
          <Circle ref={beefRef}>
            <Beef
              className="size-6"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </Circle>

          {/* Armazenagem / temperatura */}
          <Circle ref={priceRef}>
            <ThermometerSnowflake
              className="size-6"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </Circle>

          {/* Estoque / produto */}
          <Circle ref={packageRef}>
            <PackageOpen
              className="size-6"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </Circle>

          {/* Logística */}
          <Circle ref={truckRef}>
            <Truck
              className="size-6"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </Circle>
        </div>
      </div>

      {/* Smartphone → Frigosoft */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={smartphoneRef}
        toRef={frigosoftRef}
        duration={3}
        orientation={orientation}
      />

      {/* Frigosoft → Carcaça */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={frigosoftRef}
        toRef={beefRef}
        duration={3}
        orientation={orientation}
      />

      {/* Frigosoft → Temperatura */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={frigosoftRef}
        toRef={priceRef}
        duration={3}
        orientation={orientation}
      />

      {/* Frigosoft → Estoque */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={frigosoftRef}
        toRef={packageRef}
        duration={3}
        orientation={orientation}
      />

      {/* Frigosoft → Logística */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={frigosoftRef}
        toRef={truckRef}
        duration={3}
        orientation={orientation}
      />
    </div>
  );
}