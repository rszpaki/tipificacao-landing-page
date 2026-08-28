import type { Metadata, Viewport } from "next";

import { GoogleTagManager } from "@next/third-parties/google";
import { Geist } from "next/font/google";

import "./globals.css";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { DynamicFavicon } from "@/components/dynamic-favicon";
import { StructuredData } from "@/components/structured-data";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tipificacao.atak.com.br"),

  title: "Tipificação de Carcaças com IA para Frigoríficos | Atak",

  description:
    "Use inteligência artificial para apoiar a tipificação de carcaças, analisar cobertura de gordura e conformação e integrar os dados ao Frigosoft.",

  alternates: {
    canonical: "https://tipificacao.atak.com.br/",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://tipificacao.atak.com.br/",
    siteName: "Atak Sistemas",

    title: "Tipificação de Carcaças com IA para Frigoríficos | Atak",

    description:
      "Use inteligência artificial para apoiar a tipificação de carcaças, analisar cobertura de gordura e conformação e integrar os dados ao Frigosoft.",

    images: [
      {
        url: "/images/social/tipificacao-og.png",
        width: 5000,
        height: 2625,
        alt: "Tipificação de carcaças com inteligência artificial integrada ao Frigosoft",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Tipificação de Carcaças com IA para Frigoríficos | Atak",

    description:
      "Use inteligência artificial para apoiar a tipificação de carcaças, analisar cobertura de gordura e conformação e integrar os dados ao Frigosoft.",

    images: ["/images/social/tipificacao-og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#171717" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        "font-sans",
        geist.variable
      )}
    >
      <GoogleTagManager gtmId="GTM-5BSF4FD" />

      <body>
        <StructuredData />

        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <DynamicFavicon />

          {children}
        </ThemeProvider>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
