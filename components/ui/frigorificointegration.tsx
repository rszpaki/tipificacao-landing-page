"use client";

import React, { forwardRef, useRef } from "react";
import {
  BadgeDollarSign,
  Beef,
  Server,
  PackageOpen,
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
          "border-1",

          // Light mode
          "border-border/70",
          "bg-card",
          "text-foreground",

          // Dark mode
          "dark:border-zinc-700",
          "dark:bg-zinc-800",
          "dark:text-zinc-100",

          // Sombra
          "shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
          "dark:shadow-[0_0_24px_-10px_rgba(0,0,0,0.9)]",

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

export function FrigorificoIntegration({
  className,
}: {
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);

  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex h-[320px] w-full items-center justify-center overflow-hidden",
        className
      )}
    >
      <div className="flex size-full w-full flex-row items-stretch justify-between gap-10 px-4">
        {/* Carcaça */}
        <div className="flex flex-col justify-center">
          <Circle ref={div7Ref}>
            <Beef
              className="size-6"
              strokeWidth={1.5}
            />
          </Circle>
        </div>

        {/* Tipificação com IA */}
        <div className="flex flex-col justify-center">
          <Circle
            ref={div6Ref}
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
        <div className="flex flex-col justify-center gap-3">
          <Circle ref={div1Ref}>
            <Server
              className="size-6"
              strokeWidth={1.5}
            />
          </Circle>

          <Circle ref={div2Ref}>
            <BadgeDollarSign
              className="size-6"
              strokeWidth={1.5}
            />
          </Circle>

          <Circle ref={div3Ref}>
            <PackageOpen
              className="size-6"
              strokeWidth={1.5}
            />
          </Circle>

          <Circle ref={div4Ref}>
            <Truck
              className="size-6"
              strokeWidth={1.5}
            />
          </Circle>
        </div>
      </div>

      {/* Animated Beams */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div6Ref}
        duration={3}
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div6Ref}
        duration={3}
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div6Ref}
        duration={3}
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={div6Ref}
        duration={3}
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div7Ref}
        duration={3}
      />
    </div>
  );
}