"use client";

import { ArrowRight, Check } from "lucide-react";
import { motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

import { GeistBadge } from "@/components/ui/geist-badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const FORM_EMBED_URL =
  "https://njnudpfwtjapekqtahpu.supabase.co/functions/v1/form-embed?type=script&form_name=Edge%20Forms&fields=name,email,phone,company,message&success_message=Parab%C3%A9ns%20pela%20decis%C3%A3o!%20Entraremos%20em%20contato%20logo%20mais";

const SUCCESS_MESSAGE =
  "Parabéns pela decisão! Entraremos em contato em breve.";

const InfiniteMovingCarousel = ({ images }: { images: string[] }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!carouselRef.current) return;

    setWidth(carouselRef.current.clientWidth);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setWidth(entry.target.clientWidth);
        }
      });
    });

    observer.observe(carouselRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
      }}
      className="w-full overflow-hidden"
    >
      <motion.div
        initial={{ x: -width }}
        animate={{ x: -(width / 2 + 24) }}
        transition={{
          duration: 3 * images.length,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
        }}
        ref={carouselRef}
        className="flex w-max items-center gap-12"
      >
        {[...images, ...images].map((image, index) => (
          <img
            key={`bookademo1-company-${index}`}
            src={image}
            alt={`Company ${index + 1}`}
            className="size-24 shrink-0 object-contain dark:invert"
          />
        ))}
      </motion.div>
    </div>
  );
};

const FormGroup = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex w-full flex-col gap-2">{children}</div>;
};

interface BookADemo1Props {
  badge?: string;
  heading?: string;
  benefits?: string[];
  companies?: string[];
  className?: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  companySegment: string;
  employeeRange: string;
  message: string;
}

const BookADemo1 = ({
  badge = "Agende uma demonstração",
  heading = "Veja a tipificação inteligente na prática",
  benefits = [
    "Converse com especialistas que entendem a rotina de frigoríficos.",
    "Entenda como a solução pode ser aplicada à sua linha de produção.",
    "Conheça na prática a integração dos dados com o Frigosoft.",
    "Tire dúvidas técnicas, operacionais e comerciais diretamente com nosso time.",
    "Veja a tipificação com IA funcionando em uma demonstração prática.",
  ],
  companies = [],
  className,
}: BookADemo1Props) => {
  const embedContainerRef = useRef<HTMLDivElement>(null);
  const embedFormRef = useRef<HTMLFormElement | null>(null);

  const [isEmbedReady, setIsEmbedReady] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    companySegment: "",
    employeeRange: "",
    message: "",
  });

  useEffect(() => {
    const container = embedContainerRef.current;

    if (!container) return;

    const script = document.createElement("script");

    script.src = FORM_EMBED_URL;
    script.async = true;

    container.appendChild(script);

    const observer = new MutationObserver(() => {
      const embeddedForm = container.querySelector("form");

      if (embeddedForm) {
        embedFormRef.current = embeddedForm;
        setIsEmbedReady(true);
      }

      const content = container.textContent || "";

      if (content.includes(SUCCESS_MESSAGE)) {
        setSuccess(true);
        setIsSubmitting(false);
        setError("");

        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          companySegment: "",
          employeeRange: "",
          message: "",
        });
      }
    });

    observer.observe(container, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => {
      observer.disconnect();

      if (container.contains(script)) {
        container.removeChild(script);
      }
    };
  }, []);

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    setError("");
    setSuccess(false);
  };

  const setEmbeddedFieldValue = (
    form: HTMLFormElement,
    fieldName: string,
    value: string
  ) => {
    const field = form.querySelector<
      HTMLInputElement | HTMLTextAreaElement
    >(`[name="${fieldName}"]`);

    if (!field) return false;

    field.value = value;

    field.dispatchEvent(
      new Event("input", {
        bubbles: true,
      })
    );

    field.dispatchEvent(
      new Event("change", {
        bubbles: true,
      })
    );

    return true;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setSuccess(false);

    if (!formData.companySegment) {
      setError("Selecione o segmento da empresa.");
      return;
    }

    if (!formData.employeeRange) {
      setError("Selecione o número de colaboradores.");
      return;
    }

    const embeddedForm = embedFormRef.current;

    if (!embeddedForm || !isEmbedReady) {
      setError(
        "O formulário ainda está carregando. Tente novamente em alguns segundos."
      );
      return;
    }

    const qualificationData = [
      `Segmento da empresa: ${formData.companySegment}`,
      `Número de colaboradores: ${formData.employeeRange}`,
    ].join("\n");

    const completeMessage = formData.message.trim()
      ? `${formData.message.trim()}\n\n${qualificationData}`
      : qualificationData;

    const fieldsFound = [
      setEmbeddedFieldValue(embeddedForm, "name", formData.name),
      setEmbeddedFieldValue(embeddedForm, "email", formData.email),
      setEmbeddedFieldValue(embeddedForm, "phone", formData.phone),
      setEmbeddedFieldValue(embeddedForm, "company", formData.company),
      setEmbeddedFieldValue(embeddedForm, "message", completeMessage),
    ];

    if (fieldsFound.some((found) => !found)) {
      setError("Não foi possível preparar o formulário para envio.");
      return;
    }

    setIsSubmitting(true);

    embeddedForm.requestSubmit();
  };

  return (
    <section
      id="demonstracao"
      className={cn("scroll-mt-20 py-32", className)}
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-16">
          {/* Conteúdo da esquerda */}
          <div className="flex flex-col items-center lg:items-start">
            {/* Badge + Título */}
            <div className="flex flex-col items-center gap-6 lg:items-start">
              <GeistBadge variant="turbo" contrast="low">
                {badge}
              </GeistBadge>

              <h2 className="max-w-md text-center text-3xl font-medium tracking-tight lg:max-w-xl lg:text-left lg:text-5xl">
                {heading}
              </h2>
            </div>

            {/* Benefícios */}
            <ul className="mt-8 flex flex-col">
              {benefits.map((benefit, index) => (
                <li
                  key={`bookademo1-benefit-${index}`}
                  className="flex max-w-md items-start gap-3 border-b py-6 last:border-b-0"
                >
                  <Check
                    className="mt-0.5 hidden size-5 shrink-0 text-green-500 lg:block"
                    strokeWidth={2}
                    aria-hidden="true"
                  />

                  <p className="text-center font-medium lg:text-left">
                    {benefit}
                  </p>
                </li>
              ))}
            </ul>

            {companies.length > 0 && (
              <div className="mt-12 hidden w-full overflow-hidden lg:block">
                <InfiniteMovingCarousel images={companies} />
              </div>
            )}
          </div>

          {/* Formulário */}
          <Card className="w-full max-w-xl place-self-center bg-muted/40 p-6 lg:max-w-none lg:place-self-start lg:p-8">
            {success ? (
              <div className="flex min-h-[500px] flex-col items-center justify-center gap-4 text-center">
                <div className="flex size-12 items-center justify-center rounded-full bg-green-100 text-green-700">
                  ✓
                </div>

                <h3 className="text-2xl font-semibold">
                  Solicitação enviada
                </h3>

                <p className="max-w-md text-muted-foreground">
                  {SUCCESS_MESSAGE}
                </p>

                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setSuccess(false)}
                  className="cursor-pointer"
                >
                  Enviar outra solicitação
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-6"
              >
                {/* Nome */}
                <FormGroup>
                  <Label htmlFor="name">Nome</Label>

                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={(event) =>
                      updateField("name", event.target.value)
                    }
                    className="bg-background"
                  />
                </FormGroup>

                {/* Email + telefone */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <FormGroup>
                    <Label htmlFor="email">E-mail</Label>

                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="voce@empresa.com.br"
                      value={formData.email}
                      onChange={(event) =>
                        updateField("email", event.target.value)
                      }
                      className="bg-background"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="phone">Telefone</Label>

                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="(00) 00000-0000"
                      value={formData.phone}
                      onChange={(event) =>
                        updateField("phone", event.target.value)
                      }
                      className="bg-background"
                    />
                  </FormGroup>
                </div>

                {/* Empresa */}
                <FormGroup>
                  <Label htmlFor="company">Empresa</Label>

                  <Input
                    id="company"
                    name="company"
                    type="text"
                    required
                    placeholder="Nome da empresa"
                    value={formData.company}
                    onChange={(event) =>
                      updateField("company", event.target.value)
                    }
                    className="bg-background"
                  />
                </FormGroup>

                {/* Segmento */}
                <FormGroup>
                  <Label>Segmento da empresa</Label>

                  <Select
                    value={formData.companySegment}
                    onValueChange={(value) =>
                      updateField("companySegment", value ?? "")
                    }
                  >
                    <SelectTrigger className="w-full bg-background">
                      <SelectValue placeholder="Selecione uma opção" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="Indústria de alimentos ou bebidas">
                        Indústria de alimentos ou bebidas
                      </SelectItem>

                      <SelectItem value="Saúde e laboratórios">
                        Saúde e laboratórios
                      </SelectItem>

                      <SelectItem value="Indústria automotiva">
                        Indústria automotiva
                      </SelectItem>

                      <SelectItem value="Energia, gás e óleo">
                        Energia, gás e óleo
                      </SelectItem>

                      <SelectItem value="Indústria química ou cosmética">
                        Indústria química ou cosmética
                      </SelectItem>

                      <SelectItem value="Manufatura">
                        Manufatura
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormGroup>

                {/* Colaboradores */}
                <FormGroup>
                  <Label>
                    Número de colaboradores da empresa
                  </Label>

                  <Select
                    value={formData.employeeRange}
                    onValueChange={(value) =>
                      updateField("employeeRange", value ?? "")
                    }
                  >
                    <SelectTrigger className="w-full bg-background">
                      <SelectValue placeholder="Selecione uma opção" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="Empresa em fase de implantação">
                        Empresa em fase de implantação
                      </SelectItem>

                      <SelectItem value="1 a 50 funcionários">
                        1 a 50 funcionários
                      </SelectItem>

                      <SelectItem value="51 a 100 funcionários">
                        51 a 100 funcionários
                      </SelectItem>

                      <SelectItem value="101 a 200 funcionários">
                        101 a 200 funcionários
                      </SelectItem>

                      <SelectItem value="201 a 500 funcionários">
                        201 a 500 funcionários
                      </SelectItem>

                      <SelectItem value="Mais de 500 funcionários">
                        Mais de 500 funcionários
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormGroup>

                {/* Mensagem */}
                <FormGroup>
                  <Label htmlFor="message">
                    Como podemos ajudar?
                  </Label>

                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Conte um pouco sobre o que você busca para sua operação"
                    value={formData.message}
                    onChange={(event) =>
                      updateField("message", event.target.value)
                    }
                    className="min-h-28 bg-background"
                  />
                </FormGroup>

                {/* Erro */}
                {error && (
                  <p className="text-sm text-destructive">
                    {error}
                  </p>
                )}

                {/* Enviar */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full cursor-pointer sm:w-fit sm:self-end disabled:cursor-not-allowed"
                >
                  {isSubmitting
                    ? "Enviando..."
                    : "Agendar demonstração"}

                  {!isSubmitting && (
                    <ArrowRight className="size-4" />
                  )}
                </Button>
              </form>
            )}
          </Card>

          {companies.length > 0 && (
            <div className="mt-10 block w-full overflow-hidden lg:hidden">
              <InfiniteMovingCarousel images={companies} />
            </div>
          )}
        </div>

        {/* Formulário original usado apenas para realizar o envio */}
        <div
          ref={embedContainerRef}
          className="hidden"
          aria-hidden="true"
        />
      </div>
    </section>
  );
};

export { BookADemo1 };