const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://atak.com.br/#organization",
      name: "Atak Sistemas",
      url: "https://atak.com.br/",
    },
    {
      "@type": "WebSite",
      "@id": "https://tipificacao.atak.com.br/#website",
      url: "https://tipificacao.atak.com.br/",
      name: "Tipificação de Carcaças com IA | Atak Sistemas",
      publisher: {
        "@id": "https://atak.com.br/#organization",
      },
      inLanguage: "pt-BR",
    },
    {
      "@type": "WebPage",
      "@id": "https://tipificacao.atak.com.br/#webpage",
      url: "https://tipificacao.atak.com.br/",
      name: "Tipificação de Carcaças com IA para Frigoríficos | Atak",
      description:
        "Use inteligência artificial para apoiar a tipificação de carcaças, analisar cobertura de gordura e conformação e integrar os dados ao Frigosoft.",
      isPartOf: {
        "@id": "https://tipificacao.atak.com.br/#website",
      },
      about: {
        "@id": "https://tipificacao.atak.com.br/#software",
      },
      mainEntity: {
        "@id": "https://tipificacao.atak.com.br/#software",
      },
      publisher: {
        "@id": "https://atak.com.br/#organization",
      },
      inLanguage: "pt-BR",
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://tipificacao.atak.com.br/#software",
      name: "Tipificação de Carcaças com IA",
      alternateName: "Tipificação de Carcaças com Inteligência Artificial",
      url: "https://tipificacao.atak.com.br/",
      description:
        "Solução da Atak Sistemas que utiliza inteligência artificial para analisar cobertura de gordura e conformação da carcaça, apresentar uma sugestão de classificação ao operador e integrar as informações ao fluxo operacional do Frigosoft.",
      applicationCategory: "BusinessApplication",
      provider: {
        "@id": "https://atak.com.br/#organization",
      },
      featureList: [
        "Captura da imagem da carcaça pelo smartphone",
        "Análise de cobertura de gordura por inteligência artificial",
        "Análise de conformação da carcaça por inteligência artificial",
        "Sugestão de classificação ao operador",
        "Validação ou ajuste da classificação pelo operador",
        "Registro da classificação final",
        "Possibilidade de comparação entre a sugestão da IA e a classificação final",
        "Integração das informações ao fluxo operacional do Frigosoft",
      ],
      audience: {
        "@type": "BusinessAudience",
        audienceType:
          "Frigoríficos que realizam tipificação de carcaças",
      },
      inLanguage: "pt-BR",
    },
  ],
};

const StructuredData = () => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
      }}
    />
  );
};

export { StructuredData };