"use client";

import React, {
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  BadgeDollarSign,
  Beef,
  PackageOpen,
  Server,
  Smartphone,
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
          "border",

          // Light mode
          "border-border/70",
          "bg-card",
          "text-foreground",

          // Dark mode
          "dark:border-zinc-700",
          "dark:bg-zinc-800",
          "dark:text-zinc-100",

          // Espaçamento
          "p-3",

          // Sombra
          "shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
          "dark:shadow-[0_0_24px_-10px_rgba(0,0,0,0.9)]",

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

export function FrigorificoIntegration({
  className,
}: {
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Áreas da operação
  const serverRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);
  const packageRef = useRef<HTMLDivElement>(null);
  const truckRef = useRef<HTMLDivElement>(null);

  // Tipificação
  const smartphoneRef = useRef<HTMLDivElement>(null);

  // Carcaça
  const beefRef = useRef<HTMLDivElement>(null);

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
        // Mobile
        "relative flex h-[460px] w-full items-center justify-center overflow-hidden",

        // Desktop
        "lg:h-[320px]",

        className
      )}
    >
      <div
        className="
          flex
          size-full
          w-full

          flex-col
          items-center
          justify-between
          px-4
          py-8

          lg:flex-row
          lg:items-stretch
          lg:gap-10
          lg:px-4
          lg:py-0
        "
      >
        {/* Carcaça */}
        <div className="flex flex-col items-center justify-center">
          <Circle ref={beefRef}>
            <Beef
              className="size-6"
              strokeWidth={1.5}
            />
          </Circle>
        </div>

        {/* Tipificação com IA */}
        <div className="flex flex-col items-center justify-center">
          <Circle
            ref={smartphoneRef}
            className="
              size-20

              dark:border-zinc-700
              dark:bg-zinc-800
              dark:text-white
            "
          >
            <Smartphone
              className="size-8"
              strokeWidth={1.5}
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
          {/* Servidor */}
          <Circle ref={serverRef}>
            <Server
              className="size-6"
              strokeWidth={1.5}
            />
          </Circle>

          {/* Precificação */}
          <Circle ref={priceRef}>
            <BadgeDollarSign
              className="size-6"
              strokeWidth={1.5}
            />
          </Circle>

          {/* Estoque / produto */}
          <Circle ref={packageRef}>
            <PackageOpen
              className="size-6"
              strokeWidth={1.5}
            />
          </Circle>

          {/* Logística */}
          <Circle ref={truckRef}>
            <Truck
              className="size-6"
              strokeWidth={1.5}
            />
          </Circle>
        </div>
      </div>

      {/* Carcaça → Tipificação */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={beefRef}
        toRef={smartphoneRef}
        duration={3}
        orientation={orientation}
      />

      {/* Tipificação → Servidor */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={smartphoneRef}
        toRef={serverRef}
        duration={3}
        orientation={orientation}
      />

      {/* Tipificação → Precificação */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={smartphoneRef}
        toRef={priceRef}
        duration={3}
        orientation={orientation}
      />

      {/* Tipificação → Estoque */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={smartphoneRef}
        toRef={packageRef}
        duration={3}
        orientation={orientation}
      />

      {/* Tipificação → Logística */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={smartphoneRef}
        toRef={truckRef}
        duration={3}
        orientation={orientation}
      />
    </div>
  );
}