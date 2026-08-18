"use client";

import { useEffect, useId, useState, type RefObject } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

export interface AnimatedBeamProps {
  className?: string;
  containerRef: RefObject<HTMLElement | null>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;

  curvature?: number;

  reverse?: boolean;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;

  gradientStartColor?: string;
  gradientStopColor?: string;

  delay?: number;
  duration?: number;

  repeat?: number;
  repeatDelay?: number;

  startXOffset?: number;
  startYOffset?: number;

  endXOffset?: number;
  endYOffset?: number;

  orientation?: "horizontal" | "vertical";
}

export const AnimatedBeam: React.FC<AnimatedBeamProps> = ({
  className,
  containerRef,
  fromRef,
  toRef,

  curvature,

  reverse = false,

  duration = 5,
  delay = 0,

  pathColor = "gray",
  pathWidth = 2,
  pathOpacity = 0.2,

  gradientStartColor = "#ffaa40",
  gradientStopColor = "#9c40ff",

  repeat = Infinity,
  repeatDelay = 0,

  startXOffset = 0,
  startYOffset = 0,

  endXOffset = 0,
  endYOffset = 0,

  orientation = "horizontal",
}) => {
  const id = useId();

  const [pathD, setPathD] = useState("");

  const [svgDimensions, setSvgDimensions] = useState({
    width: 0,
    height: 0,
  });

  const gradientCoordinates =
    orientation === "vertical"
      ? reverse
        ? {
            x1: ["0%", "0%"],
            x2: ["0%", "0%"],
            y1: ["90%", "-10%"],
            y2: ["100%", "0%"],
          }
        : {
            x1: ["0%", "0%"],
            x2: ["0%", "0%"],
            y1: ["10%", "110%"],
            y2: ["0%", "100%"],
          }
      : reverse
        ? {
            x1: ["90%", "-10%"],
            x2: ["100%", "0%"],
            y1: ["0%", "0%"],
            y2: ["0%", "0%"],
          }
        : {
            x1: ["10%", "110%"],
            x2: ["0%", "100%"],
            y1: ["0%", "0%"],
            y2: ["0%", "0%"],
          };

  useEffect(() => {
    const updatePath = () => {
      if (
        !containerRef.current ||
        !fromRef.current ||
        !toRef.current
      ) {
        return;
      }

      const containerRect =
        containerRef.current.getBoundingClientRect();

      const fromRect =
        fromRef.current.getBoundingClientRect();

      const toRect =
        toRef.current.getBoundingClientRect();

      const width = containerRect.width;
      const height = containerRect.height;

      setSvgDimensions({
        width,
        height,
      });

      /*
       * Centro do elemento de origem
       */
      const startX =
        fromRect.left -
        containerRect.left +
        fromRect.width / 2 +
        startXOffset;

      const startY =
        fromRect.top -
        containerRect.top +
        fromRect.height / 2 +
        startYOffset;

      /*
       * Centro do elemento de destino
       */
      const endX =
        toRect.left -
        containerRect.left +
        toRect.width / 2 +
        endXOffset;

      const endY =
        toRect.top -
        containerRect.top +
        toRect.height / 2 +
        endYOffset;

      let d = "";

      if (orientation === "horizontal") {
        /*
         * Distância horizontal entre os elementos.
         *
         * Aproximadamente 45% da distância produz
         * a geometria do componente original.
         */
        const distanceX = Math.abs(endX - startX);

        const curve =
          curvature ??
          Math.min(distanceX * 0.45, 220);

        /*
         * Identifica a direção.
         *
         * 1  = esquerda → direita
         * -1 = direita → esquerda
         */
        const direction =
          endX >= startX ? 1 : -1;

        /*
         * Bézier cúbica:
         *
         * M = início
         *
         * C =
         * ponto de controle 1
         * ponto de controle 2
         * destino
         *
         * Os dois pontos mantêm o mesmo Y
         * dos seus respectivos círculos.
         *
         * Isso faz a linha:
         *
         * - sair horizontalmente
         * - fazer a curva no meio
         * - chegar horizontalmente
         */
        const control1X =
          startX + curve * direction;

        const control1Y = startY;

        const control2X =
          endX - curve * direction;

        const control2Y = endY;

        d = `
          M ${startX},${startY}
          C
          ${control1X},${control1Y}
          ${control2X},${control2Y}
          ${endX},${endY}
        `;
      } else {
        /*
         * MOBILE
         *
         * Mesma geometria do desktop,
         * rotacionada 90 graus.
         */
        const distanceY = Math.abs(endY - startY);

        const curve =
          curvature ??
          Math.min(distanceY * 0.45, 220);

        const direction =
          endY >= startY ? 1 : -1;

        const control1X = startX;

        const control1Y =
          startY + curve * direction;

        const control2X = endX;

        const control2Y =
          endY - curve * direction;

        d = `
          M ${startX},${startY}
          C
          ${control1X},${control1Y}
          ${control2X},${control2Y}
          ${endX},${endY}
        `;
      }

      setPathD(d);
    };

    const resizeObserver = new ResizeObserver(updatePath);

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    if (fromRef.current) {
      resizeObserver.observe(fromRef.current);
    }

    if (toRef.current) {
      resizeObserver.observe(toRef.current);
    }

    updatePath();

    return () => {
      resizeObserver.disconnect();
    };
  }, [
    containerRef,
    fromRef,
    toRef,
    curvature,
    orientation,
    startXOffset,
    startYOffset,
    endXOffset,
    endYOffset,
  ]);

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "pointer-events-none absolute left-0 top-0 transform-gpu",
        className
      )}
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
    >
      {/* Linha base */}
      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
        fill="none"
      />

      {/* Linha animada */}
      <path
        d={pathD}
        stroke={`url(#${id})`}
        strokeWidth={pathWidth}
        strokeOpacity="1"
        strokeLinecap="round"
        fill="none"
      />

      <defs>
        <motion.linearGradient
          id={id}
          gradientUnits="userSpaceOnUse"
          initial={{
            x1: "0%",
            x2: "0%",
            y1: "0%",
            y2: "0%",
          }}
          animate={{
            x1: gradientCoordinates.x1,
            x2: gradientCoordinates.x2,
            y1: gradientCoordinates.y1,
            y2: gradientCoordinates.y2,
          }}
          transition={{
            delay,
            duration,
            ease: [0.16, 1, 0.3, 1],
            repeat,
            repeatDelay,
          }}
        >
          <stop
            stopColor={gradientStartColor}
            stopOpacity="0"
          />

          <stop
            offset="10%"
            stopColor={gradientStartColor}
          />

          <stop
            offset="45%"
            stopColor={gradientStopColor}
          />

          <stop
            offset="100%"
            stopColor={gradientStopColor}
            stopOpacity="0"
          />
        </motion.linearGradient>
      </defs>
    </svg>
  );
};