# Tipificação de carcaças com IA

Landing page da solução da Atak para tipificação de carcaças com inteligência artificial, integrada ao Frigosoft.

## Sobre

Esta é a landing page oficial da solução. A IA apoia a tipificação ao analisar cobertura de gordura e conformação e apresentar uma sugestão de classificação. A decisão final permanece com o operador, e o processo é integrado ao Frigosoft.

## Produção

[https://tipificacao.atak.com.br](https://tipificacao.atak.com.br)

## Tecnologias

- Next.js 16.2.6
- React 19.2.4
- TypeScript 5.9.3
- Tailwind CSS 4.3.3
- Base UI 1.7.0
- shadcn 4.18.0
- Motion 13.1.0
- next-themes 0.4.6
- Vercel Analytics 2.0.1
- Vercel Speed Insights 2.0.0

## Requisitos

- Node.js 24
- npm

Com nvm, selecione a versão do projeto:

```bash
nvm use
```

## Instalação

```bash
git clone https://github.com/rszpaki/tipificacao-landing-page.git
cd tipificacao-landing-page
npm ci
```

## Desenvolvimento

```bash
npm run dev
```

A aplicação ficará disponível em [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev`: inicia o servidor de desenvolvimento.
- `npm run build`: gera a build de produção.
- `npm run start`: executa a build de produção.
- `npm run lint`: executa o ESLint.
- `npm run format`: formata arquivos TypeScript e TSX com Prettier.
- `npm run typecheck`: verifica os tipos sem emitir arquivos.

## Variáveis de ambiente

O projeto atualmente não exige variáveis de ambiente para execução do frontend.

## Estrutura

```text
app/                    Rotas, layout global, metadata e estilos globais
components/
├── diagrams/           Diagramas visuais e acessíveis
├── layout/             Cabeçalho e rodapé compartilhados
├── sections/           Seções que compõem a landing page
└── ui/                 Componentes fundamentais de interface
lib/                    Utilitários compartilhados
public/images/          Imagens e recursos estáticos
```

## Formulário de demonstração

A integração do formulário está em `components/sections/demo-request-section.tsx`. Testes não devem enviar leads reais. Ao alterar essa seção, preserve a validação e os estados de erro e sucesso.

## Acessibilidade

A interface contempla navegação por teclado, associação de labels, comunicação acessível de erros e sucesso e respeito a `prefers-reduced-motion`. Mudanças devem preservar esses comportamentos.

## SEO e compartilhamento

As metadata ficam centralizadas em `app/layout.tsx`, incluindo URL canônica, Open Graph e Twitter Card. A imagem social fica em `public/images/social/tipificacao-og.png`.

## Deploy

A produção é publicada na Vercel em [https://tipificacao.atak.com.br](https://tipificacao.atak.com.br) a partir da branch `main`.

## Qualidade

Antes de abrir ou aprovar um pull request, execute:

```bash
npm run typecheck
npm run lint
npm run build
```

Use `npm run format` somente quando for necessário aplicar a formatação automática.

## Contribuição

Crie uma branch para a alteração, abra um pull request, mantenha as verificações verdes e revise visualmente as mudanças de interface antes da aprovação.

## Licença

Este é um projeto da Atak Sistemas. O licenciamento e os direitos de uso devem ser definidos pela empresa.
