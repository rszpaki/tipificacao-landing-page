import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type GeistBadgeVariant =
  | "gray"
  | "blue"
  | "purple"
  | "amber"
  | "red"
  | "pink"
  | "green"
  | "teal"
  | "inverted"
  | "trial"
  | "turbo";

type GeistBadgeContrast = "default" | "low";

interface GeistBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: GeistBadgeVariant;
  contrast?: GeistBadgeContrast;
}

const variants: Record<
  GeistBadgeVariant,
  {
    default: string;
    low: string;
  }
> = {
  gray: {
    default:
      "bg-zinc-700 text-white dark:bg-zinc-300 dark:text-zinc-950",
    low:
      "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
  },

  blue: {
    default:
      "bg-blue-600 text-white dark:bg-blue-500 dark:text-white",
    low:
      "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  },

  purple: {
    default:
      "bg-purple-600 text-white dark:bg-purple-500 dark:text-white",
    low:
      "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  },

  amber: {
    default:
      "bg-amber-500 text-amber-950 dark:bg-amber-400 dark:text-amber-950",
    low:
      "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  },

  red: {
    default:
      "bg-red-600 text-white dark:bg-red-500 dark:text-white",
    low:
      "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
  },

  pink: {
    default:
      "bg-pink-600 text-white dark:bg-pink-500 dark:text-white",
    low:
      "bg-pink-50 text-pink-700 dark:bg-pink-950 dark:text-pink-300",
  },

  green: {
    default:
      "bg-emerald-600 text-white dark:bg-emerald-500 dark:text-white",
    low:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  },

  teal: {
    default:
      "bg-teal-600 text-white dark:bg-teal-500 dark:text-white",
    low:
      "bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300",
  },

  inverted: {
    default:
      "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950",
    low:
      "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950",
  },

  trial: {
    default:
      "bg-gradient-to-r from-violet-600 to-purple-500 text-white",
    low:
      "bg-gradient-to-r from-violet-600 to-purple-500 text-white",
  },

  turbo: {
    default:
      "bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 text-white",
    low:
      "bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 text-white",
  },
};

const GeistBadge = ({
  variant = "gray",
  contrast = "default",
  className,
  children,
  ...props
}: GeistBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center justify-center rounded-full px-2.5 py-1 text-xs font-medium leading-none whitespace-nowrap",
        variants[variant][contrast],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export { GeistBadge };
export type { GeistBadgeProps, GeistBadgeVariant, GeistBadgeContrast };