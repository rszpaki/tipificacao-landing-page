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

          "!border-transparent",
          "ring-1",
          "ring-inset",
          "ring-black/[0.1]",

          "bg-card",
          "text-foreground",

          "dark:bg-surface-raised",
          "dark:text-integration-foreground",
          "dark:ring-white/[0.07]",

          "p-3",

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

  const smartphoneRef = useRef<HTMLDivElement>(null);
  const frigosoftRef = useRef<HTMLDivElement>(null);

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

  const beamProps = {
  duration: 3,
  orientation,

  // Mantém exatamente as cores originais do AnimatedBeam
  pathColor: "var(--integration-line)",
  pathOpacity: 0.08,

  gradientStartColor: "var(--integration-gradient-start)",
  gradientStopColor: "var(--integration-gradient-end)",
} as const;

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
        <div className="flex flex-col items-center justify-center">
          <Circle ref={smartphoneRef}>
            <Smartphone
              className="size-6"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </Circle>
        </div>

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
          <Circle ref={beefRef}>
            <Beef
              className="size-6"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </Circle>

          <Circle ref={priceRef}>
            <ThermometerSnowflake
              className="size-6"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </Circle>

          <Circle ref={packageRef}>
            <PackageOpen
              className="size-6"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </Circle>

          <Circle ref={truckRef}>
            <Truck
              className="size-6"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={smartphoneRef}
        toRef={frigosoftRef}
        {...beamProps}
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={frigosoftRef}
        toRef={beefRef}
        {...beamProps}
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={frigosoftRef}
        toRef={priceRef}
        {...beamProps}
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={frigosoftRef}
        toRef={packageRef}
        {...beamProps}
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={frigosoftRef}
        toRef={truckRef}
        {...beamProps}
      />
    </div>
  );
}