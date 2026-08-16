"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

export function DynamicFavicon() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!resolvedTheme) return;

    const favicon =
      resolvedTheme === "dark"
        ? "/images/favicon/favicon-dark.png"
        : "/images/favicon/favicon-light.png";

    // Remove favicons antigos gerados pelo Next ou mantidos no DOM
    document
      .querySelectorAll<HTMLLinkElement>(
        'link[rel="icon"], link[rel="shortcut icon"]'
      )
      .forEach((link) => link.remove());

    // Cria o favicon correto
    const link = document.createElement("link");

    link.rel = "icon";
    link.type = "image/png";

    // O parâmetro evita que o navegador reutilize o favicon antigo
    link.href = `${favicon}?v=2-${resolvedTheme}`;

    document.head.appendChild(link);
  }, [resolvedTheme]);

  return null;
}