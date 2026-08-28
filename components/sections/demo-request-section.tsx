"use client";

import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import React, { useEffect, useId, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GeistBadge } from "@/components/ui/geist-badge";
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

const EMBED_SUCCESS_MESSAGE =
  "Parabéns pela decisão! Entraremos em contato logo mais";

const SUCCESS_MESSAGE =
  "Recebemos seus dados. Nossa equipe entrará em contato para entender sua operação e combinar a demonstração.";

const SUBMISSION_CONFIRMATION_TIMEOUT_MS = 30_000;

const SUBMISSION_CONFIRMATION_ERROR =
  "Não foi possível confirmar o envio. Verifique sua conexão e tente novamente.";

const FORM_EMBED_URL =
  `https://njnudpfwtjapekqtahpu.supabase.co/functions/v1/form-embed?type=script&form_name=Edge%20Forms&fields=name,email,phone,company,message&success_message=${encodeURIComponent(
    EMBED_SUCCESS_MESSAGE
  )}`;

const FORM_CONTROL_TEXT_CLASS = "text-[16px] md:text-[16px]";

const InfiniteMovingCarousel = ({ images }: { images: string[] }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];

      if (!entry) return;

      setWidth(entry.contentRect.width);
    });

    observer.observe(carousel);

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
        initial={shouldReduceMotion ? false : { x: -width }}
        animate={
          shouldReduceMotion ? undefined : { x: -(width / 2 + 24) }
        }
        transition={
          shouldReduceMotion
            ? undefined
            : {
                duration: 3 * images.length,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
              }
        }
        ref={carouselRef}
        className="flex w-max items-center gap-12"
      >
        {[...images, ...images].map((image, index) => (
          // eslint-disable-next-line @next/next/no-img-element -- companies accepts arbitrary external image URLs
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

interface DemoRequestSectionProps {
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

type ValidatedField = Exclude<keyof FormData, "message">;

type FieldErrors = Partial<Record<ValidatedField, string>>;

type TouchedFields = Partial<Record<ValidatedField, boolean>>;

type EmbedSubmissionOutcome = "success" | "error" | null;

const getEmbedSubmissionOutcome = (
  dataLayerStartIndex: number
): EmbedSubmissionOutcome => {
  const dataLayer = (
    window as Window & {
      dataLayer?: unknown[];
    }
  ).dataLayer;

  if (!Array.isArray(dataLayer)) return null;

  const submissionEvents = dataLayer.slice(dataLayerStartIndex);

  for (let index = submissionEvents.length - 1; index >= 0; index -= 1) {
    const entry = submissionEvents[index];

    if (!entry || typeof entry !== "object") continue;

    const event = entry as {
      event?: string;
      form_name?: string;
      success?: boolean;
    };

    if (event.form_name !== "Edge Forms") continue;

    if (event.event === "edge_forms_error") {
      return "error";
    }

    if (event.event === "edge_forms") {
      return event.success === true ? "success" : "error";
    }
  }

  return null;
};

const DemoRequestSection = ({
  badge = "Solicite uma demonstração",
  heading = "Veja a tipificação de carcaças com IA na prática",
  benefits = [
    "Preencha seus dados. Nossa equipe entrará em contato para entender sua operação e combinar a demonstração.",
  ],
  companies = [],
  className,
}: DemoRequestSectionProps) => {
  const embedContainerRef = useRef<HTMLDivElement>(null);
  const embedFormRef = useRef<HTMLFormElement | null>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  const confirmationWatchdogRef = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  const dataLayerStartIndexRef = useRef(0);
  const companySegmentValueRef = useRef("");
  const employeeRangeValueRef = useRef("");

  const nameErrorId = useId();
  const emailErrorId = useId();
  const phoneErrorId = useId();
  const companyErrorId = useId();
  const companySegmentId = useId();
  const companySegmentErrorId = useId();
  const employeeRangeId = useId();
  const employeeRangeErrorId = useId();

  const [isEmbedReady, setIsEmbedReady] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [touchedFields, setTouchedFields] = useState<TouchedFields>({});

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    companySegment: "",
    employeeRange: "",
    message: "",
  });

  const supportingText = benefits.filter(Boolean).join(" ");

  useEffect(() => {
    const container = embedContainerRef.current;

    if (!container) return;

    /*
     * Evita criar o script mais de uma vez.
     * Isso é importante principalmente em desenvolvimento,
     * onde o React Strict Mode pode executar efeitos mais de uma vez.
     */
    let script = container.querySelector<HTMLScriptElement>(
      'script[data-edge-forms-embed="true"]'
    );

    if (!script) {
      script = document.createElement("script");

      script.src = FORM_EMBED_URL;
      script.async = true;
      script.dataset.edgeFormsEmbed = "true";

      container.appendChild(script);
    }

    /*
     * Caso o formulário já tenha sido criado antes do observer,
     * atualizamos a referência imediatamente.
     */
    const existingForm = container.querySelector("form");

    if (existingForm) {
      embedFormRef.current = existingForm;
      setIsEmbedReady(true);
    }

    const observer = new MutationObserver(() => {
      const embeddedForm = container.querySelector("form");

      if (embeddedForm) {
        embedFormRef.current = embeddedForm;
        setIsEmbedReady(true);
      }

      const content = container.textContent || "";

      if (content.includes(EMBED_SUCCESS_MESSAGE)) {
        const outcome = getEmbedSubmissionOutcome(
          dataLayerStartIndexRef.current
        );

        if (confirmationWatchdogRef.current) {
          clearTimeout(confirmationWatchdogRef.current);
          confirmationWatchdogRef.current = null;
        }

        if (outcome === "error") {
          setIsSubmitting(false);
          setError(SUBMISSION_CONFIRMATION_ERROR);
          return;
        }

        setSuccess(true);
        setIsSubmitting(false);
        setError("");
        setFieldErrors({});
        setTouchedFields({});
        companySegmentValueRef.current = "";
        employeeRangeValueRef.current = "";

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

      if (confirmationWatchdogRef.current) {
        clearTimeout(confirmationWatchdogRef.current);
        confirmationWatchdogRef.current = null;
      }

      /*
       * IMPORTANTE:
       *
       * Não removemos o script do Edge Forms aqui.
       *
       * Em desenvolvimento, o React Strict Mode pode executar
       * mount → cleanup → mount enquanto o script externo ainda
       * está carregando.
       *
       * Se o script for removido nesse intervalo, ele pode continuar
       * executando e tentar chamar insertBefore() usando um parentNode
       * que já não existe.
       */
    };
  }, []);

  useEffect(() => {
    if (success) {
      successHeadingRef.current?.focus();
    }
  }, [success]);

  const getTextFieldError = (
    field: Exclude<ValidatedField, "companySegment" | "employeeRange">,
    input: HTMLInputElement
  ) => {
    if (!input.value.trim()) {
      return "Este campo é obrigatório.";
    }

    if (field === "email" && input.validity.typeMismatch) {
      return "Informe um e-mail válido.";
    }

    if (!input.validity.valid) {
      return field === "phone"
        ? "Informe um telefone válido."
        : "Este campo é obrigatório.";
    }

    return undefined;
  };

  const validateTextField = (
    field: Exclude<ValidatedField, "companySegment" | "employeeRange">,
    input: HTMLInputElement
  ) => {
    const fieldError = getTextFieldError(field, input);

    setFieldErrors((previous) => ({
      ...previous,
      [field]: fieldError,
    }));
  };

  const handleTextFieldBlur = (
    field: Exclude<ValidatedField, "companySegment" | "employeeRange">,
    input: HTMLInputElement
  ) => {
    setTouchedFields((previous) => ({
      ...previous,
      [field]: true,
    }));

    validateTextField(field, input);
  };

  const handleRequiredSelectClose = (
    field: "companySegment" | "employeeRange"
  ) => {
    const value =
      field === "companySegment"
        ? companySegmentValueRef.current
        : employeeRangeValueRef.current;

    setTouchedFields((previous) => ({
      ...previous,
      [field]: true,
    }));

    setFieldErrors((previous) => ({
      ...previous,
      [field]: value ? undefined : "Este campo é obrigatório.",
    }));
  };

  const updateField = (field: keyof FormData, value: string) => {
    if (field === "companySegment") {
      companySegmentValueRef.current = value;
    }

    if (field === "employeeRange") {
      employeeRangeValueRef.current = value;
    }

    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    setError("");
    setSuccess(false);

    if (field !== "message") {
      setFieldErrors((previous) => ({
        ...previous,
        [field]: value ? undefined : previous[field],
      }));
    }
  };

  const handleTextFieldChange = (
    field: Exclude<ValidatedField, "companySegment" | "employeeRange">,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateField(field, event.target.value);

    if (touchedFields[field]) {
      validateTextField(field, event.target);
    }
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

    const validationErrors: FieldErrors = {};
    const form = event.currentTarget;

    const nameInput = form.elements.namedItem("name") as HTMLInputElement;
    const emailInput = form.elements.namedItem("email") as HTMLInputElement;
    const phoneInput = form.elements.namedItem("phone") as HTMLInputElement;
    const companyInput = form.elements.namedItem(
      "company"
    ) as HTMLInputElement;

    validationErrors.name = getTextFieldError("name", nameInput);
    validationErrors.email = getTextFieldError("email", emailInput);
    validationErrors.phone = getTextFieldError("phone", phoneInput);
    validationErrors.company = getTextFieldError("company", companyInput);

    if (!formData.companySegment) {
      validationErrors.companySegment = "Este campo é obrigatório.";
    }

    if (!formData.employeeRange) {
      validationErrors.employeeRange = "Este campo é obrigatório.";
    }

    setFieldErrors(validationErrors);
    setTouchedFields({
      name: true,
      email: true,
      phone: true,
      company: true,
      companySegment: true,
      employeeRange: true,
    });

    const fieldOrder: ValidatedField[] = [
      "name",
      "email",
      "phone",
      "company",
      "companySegment",
      "employeeRange",
    ];

    const firstInvalidField = fieldOrder.find(
      (field) => validationErrors[field]
    );

    if (firstInvalidField) {
      requestAnimationFrame(() => {
        const fieldId =
          firstInvalidField === "companySegment"
            ? companySegmentId
            : firstInvalidField === "employeeRange"
              ? employeeRangeId
              : firstInvalidField;

        document.getElementById(fieldId)?.focus();
      });

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

    if (confirmationWatchdogRef.current) {
      clearTimeout(confirmationWatchdogRef.current);
    }

    const dataLayer = (
      window as Window & {
        dataLayer?: unknown[];
      }
    ).dataLayer;

    dataLayerStartIndexRef.current = Array.isArray(dataLayer)
      ? dataLayer.length
      : 0;

    setIsSubmitting(true);

    confirmationWatchdogRef.current = setTimeout(() => {
      confirmationWatchdogRef.current = null;
      setIsSubmitting(false);
      setError(SUBMISSION_CONFIRMATION_ERROR);
    }, SUBMISSION_CONFIRMATION_TIMEOUT_MS);

    try {
      embeddedForm.requestSubmit();
    } catch {
      if (confirmationWatchdogRef.current) {
        clearTimeout(confirmationWatchdogRef.current);
        confirmationWatchdogRef.current = null;
      }

      setIsSubmitting(false);
      setError(SUBMISSION_CONFIRMATION_ERROR);
    }
  };

  return (
    <section className={cn("py-20 lg:py-24", className)}>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          {/* Conteúdo */}
          <div className="mx-auto flex w-full max-w-md flex-col lg:mx-0 lg:max-w-none">
            <div className="flex w-full flex-col items-center gap-7 lg:items-start">
              <GeistBadge variant="turbo" contrast="low">
                {badge}
              </GeistBadge>

              <h2 className="w-full text-balance text-center text-[38px] font-medium leading-[1.08] tracking-tight lg:max-w-[30rem] lg:text-left lg:text-[48px]">
                {heading}
              </h2>
            </div>

            {supportingText && (
              <p className="mx-auto mt-7 max-w-md text-center text-lg leading-relaxed text-muted-foreground lg:mx-0 lg:text-left">
                {supportingText}
              </p>
            )}

            {companies.length > 0 && (
              <div className="mt-12 hidden w-full overflow-hidden lg:block">
                <InfiniteMovingCarousel images={companies} />
              </div>
            )}
          </div>

          {/* Formulário */}
          <Card
            id="demonstracao"
            className="
              scroll-mt-24
              w-full
              max-w-xl
              place-self-center
              -translate-y-1
              rounded-2xl
              !border-transparent
              bg-card
              p-5
              shadow-[0_12px_32px_rgba(0,0,0,0.08)]
              ring-1
              ring-inset
              ring-black/[0.06]
              sm:p-6
              lg:-translate-y-2
              lg:max-w-none
              lg:place-self-start
              lg:p-8
              dark:ring-white/[0.06]
              dark:shadow-[0_12px_32px_rgba(0,0,0,0.28)]
            "
          >
            {success ? (
              <div
                role="status"
                aria-live="polite"
                className="flex min-h-[500px] flex-col items-center justify-center gap-4 text-center"
              >
                <div className="flex size-12 items-center justify-center rounded-full bg-success-muted text-success-foreground">
                  ✓
                </div>

                <h3
                  ref={successHeadingRef}
                  tabIndex={-1}
                  className="text-2xl font-semibold outline-none"
                >
                  Solicitação recebida
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
                noValidate
                onSubmit={handleSubmit}
                className="flex flex-col gap-6"
              >
                {/* Nome */}
                <FormGroup>
                  <Label htmlFor="name">
                    <span>
                      Nome <span aria-hidden="true">*</span>
                    </span>
                  </Label>

                  <Input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    aria-invalid={Boolean(fieldErrors.name)}
                    aria-describedby={
                      fieldErrors.name ? nameErrorId : undefined
                    }
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={(event) =>
                      handleTextFieldChange("name", event)
                    }
                    onBlur={(event) =>
                      handleTextFieldBlur("name", event.currentTarget)
                    }
                    className={cn(
                      "bg-background",
                      FORM_CONTROL_TEXT_CLASS
                    )}
                  />

                  {fieldErrors.name && (
                    <p
                      id={nameErrorId}
                      className="text-xs text-destructive"
                    >
                      {fieldErrors.name}
                    </p>
                  )}
                </FormGroup>

                {/* E-mail + telefone */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <FormGroup>
                    <Label htmlFor="email">
                      <span>
                        E-mail <span aria-hidden="true">*</span>
                      </span>
                    </Label>

                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      spellCheck={false}
                      required
                      aria-invalid={Boolean(fieldErrors.email)}
                      aria-describedby={
                        fieldErrors.email ? emailErrorId : undefined
                      }
                      placeholder="voce@empresa.com.br"
                      value={formData.email}
                      onChange={(event) =>
                        handleTextFieldChange("email", event)
                      }
                      onBlur={(event) =>
                        handleTextFieldBlur("email", event.currentTarget)
                      }
                      className={cn(
                        "bg-background",
                        FORM_CONTROL_TEXT_CLASS
                      )}
                    />

                    {fieldErrors.email && (
                      <p
                        id={emailErrorId}
                        className="text-xs text-destructive"
                      >
                        {fieldErrors.email}
                      </p>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="phone">
                      <span>
                        Telefone <span aria-hidden="true">*</span>
                      </span>
                    </Label>

                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      aria-invalid={Boolean(fieldErrors.phone)}
                      aria-describedby={
                        fieldErrors.phone ? phoneErrorId : undefined
                      }
                      placeholder="(00) 00000-0000"
                      value={formData.phone}
                      onChange={(event) =>
                        handleTextFieldChange("phone", event)
                      }
                      onBlur={(event) =>
                        handleTextFieldBlur("phone", event.currentTarget)
                      }
                      className={cn(
                        "bg-background",
                        FORM_CONTROL_TEXT_CLASS
                      )}
                    />

                    {fieldErrors.phone && (
                      <p
                        id={phoneErrorId}
                        className="text-xs text-destructive"
                      >
                        {fieldErrors.phone}
                      </p>
                    )}
                  </FormGroup>
                </div>

                {/* Empresa */}
                <FormGroup>
                  <Label htmlFor="company">
                    <span>
                      Empresa <span aria-hidden="true">*</span>
                    </span>
                  </Label>

                  <Input
                    id="company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    required
                    aria-invalid={Boolean(fieldErrors.company)}
                    aria-describedby={
                      fieldErrors.company ? companyErrorId : undefined
                    }
                    placeholder="Nome da empresa"
                    value={formData.company}
                    onChange={(event) =>
                      handleTextFieldChange("company", event)
                    }
                    onBlur={(event) =>
                      handleTextFieldBlur("company", event.currentTarget)
                    }
                    className={cn(
                      "bg-background",
                      FORM_CONTROL_TEXT_CLASS
                    )}
                  />

                  {fieldErrors.company && (
                    <p
                      id={companyErrorId}
                      className="text-xs text-destructive"
                    >
                      {fieldErrors.company}
                    </p>
                  )}
                </FormGroup>

                {/* Segmento */}
                <FormGroup>
                  <Label htmlFor={companySegmentId}>
                    <span>
                      Segmento da empresa{" "}
                      <span aria-hidden="true">*</span>
                    </span>
                  </Label>

                  <Select
                    value={formData.companySegment}
                    onValueChange={(value) =>
                      updateField("companySegment", value ?? "")
                    }
                    onOpenChange={(open) => {
                      if (!open) {
                        handleRequiredSelectClose("companySegment");
                      }
                    }}
                  >
                    <SelectTrigger
                      id={companySegmentId}
                      aria-required={true}
                      aria-invalid={Boolean(fieldErrors.companySegment)}
                      aria-describedby={
                        fieldErrors.companySegment
                          ? companySegmentErrorId
                          : undefined
                      }
                      className={cn(
                        "w-full bg-background",
                        FORM_CONTROL_TEXT_CLASS
                      )}
                    >
                      <SelectValue placeholder="Selecione uma opção" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem
                        value="Frigorífico"
                        className={FORM_CONTROL_TEXT_CLASS}
                      >
                        Frigorífico
                      </SelectItem>

                      <SelectItem
                        value="Indústria de alimentos"
                        className={FORM_CONTROL_TEXT_CLASS}
                      >
                        Indústria de alimentos
                      </SelectItem>

                      <SelectItem
                        value="Distribuidora"
                        className={FORM_CONTROL_TEXT_CLASS}
                      >
                        Distribuidora
                      </SelectItem>

                      <SelectItem
                        value="Outro"
                        className={FORM_CONTROL_TEXT_CLASS}
                      >
                        Outro
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  {fieldErrors.companySegment && (
                    <p
                      id={companySegmentErrorId}
                      className="text-xs text-destructive"
                    >
                      {fieldErrors.companySegment}
                    </p>
                  )}
                </FormGroup>

                {/* Colaboradores */}
                <FormGroup>
                  <Label htmlFor={employeeRangeId}>
                    <span>
                      Número de colaboradores{" "}
                      <span aria-hidden="true">*</span>
                    </span>
                  </Label>

                  <Select
                    value={formData.employeeRange}
                    onValueChange={(value) =>
                      updateField("employeeRange", value ?? "")
                    }
                    onOpenChange={(open) => {
                      if (!open) {
                        handleRequiredSelectClose("employeeRange");
                      }
                    }}
                  >
                    <SelectTrigger
                      id={employeeRangeId}
                      aria-required={true}
                      aria-invalid={Boolean(fieldErrors.employeeRange)}
                      aria-describedby={
                        fieldErrors.employeeRange
                          ? employeeRangeErrorId
                          : undefined
                      }
                      className={cn(
                        "w-full bg-background",
                        FORM_CONTROL_TEXT_CLASS
                      )}
                    >
                      <SelectValue placeholder="Selecione uma opção" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem
                        value="Empresa em fase de implantação"
                        className={FORM_CONTROL_TEXT_CLASS}
                      >
                        Empresa em fase de implantação
                      </SelectItem>

                      <SelectItem
                        value="1 a 50 funcionários"
                        className={FORM_CONTROL_TEXT_CLASS}
                      >
                        1 a 50 colaboradores
                      </SelectItem>

                      <SelectItem
                        value="51 a 100 funcionários"
                        className={FORM_CONTROL_TEXT_CLASS}
                      >
                        51 a 100 colaboradores
                      </SelectItem>

                      <SelectItem
                        value="101 a 200 funcionários"
                        className={FORM_CONTROL_TEXT_CLASS}
                      >
                        101 a 200 colaboradores
                      </SelectItem>

                      <SelectItem
                        value="201 a 500 funcionários"
                        className={FORM_CONTROL_TEXT_CLASS}
                      >
                        201 a 500 colaboradores
                      </SelectItem>

                      <SelectItem
                        value="Mais de 500 funcionários"
                        className={FORM_CONTROL_TEXT_CLASS}
                      >
                        Mais de 500 colaboradores
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  {fieldErrors.employeeRange && (
                    <p
                      id={employeeRangeErrorId}
                      className="text-xs text-destructive"
                    >
                      {fieldErrors.employeeRange}
                    </p>
                  )}
                </FormGroup>

                {/* Mensagem */}
                <FormGroup>
                  <Label htmlFor="message">
                    Como podemos ajudar? (opcional)
                  </Label>

                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Conte um pouco sobre o que você busca para sua operação"
                    value={formData.message}
                    onChange={(event) =>
                      updateField("message", event.target.value)
                    }
                    className={cn(
                      "min-h-28 bg-background",
                      FORM_CONTROL_TEXT_CLASS
                    )}
                  />
                </FormGroup>

                {/* Erro */}
                {error && (
                  <p
                    role="alert"
                    className="text-sm text-destructive"
                  >
                    {error}
                  </p>
                )}

                {/* Botão */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="h-11 w-full cursor-pointer disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Enviando…" : "Solicitar demonstração"}

                  {!isSubmitting && (
                    <ArrowRight className="size-4" aria-hidden="true" />
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

        {/* Edge Forms oculto */}
        <div
          ref={embedContainerRef}
          className="hidden"
          aria-hidden="true"
        />
      </div>
    </section>
  );
};

export { DemoRequestSection };
