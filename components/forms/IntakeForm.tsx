"use client";

import { useId, useState } from "react";
import { forms, submitIntake, type FormId } from "@/lib/forms";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

/**
 * Renders any registered intake form (lib/forms.ts). While intake is not
 * approved (`site.intake.enabled === false`) the form is shown as a clearly
 * labelled, disabled preview so the fields can be reviewed — nothing can be
 * submitted or collected.
 */
export function IntakeForm({
  formId,
  tone = "light",
  headingLevel = "h3",
}: {
  formId: FormId;
  tone?: "light" | "dark";
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  const def = forms[formId];
  const id = useId();
  const live = site.intake.enabled && Boolean(site.intake.endpoint);
  const [status, setStatus] = useState<string | null>(null);

  const field = cn(
    "mt-2 block w-full rounded-xl border px-4 py-3 disabled:cursor-not-allowed",
    tone === "light"
      ? "border-line-strong bg-paper text-ink placeholder:text-muted/80 disabled:bg-stone/50"
      : "border-paper/25 bg-paper/5 text-paper disabled:opacity-70",
  );
  const label = cn("text-sm font-semibold", tone === "light" ? "text-ink-2" : "text-paper/90");
  const hint = cn("mt-1 block text-xs", tone === "light" ? "text-muted" : "text-paper/65");

  return (
    <form
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-status-note`}
      className="grid gap-6"
      onSubmit={async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
        const res = await submitIntake(formId, data);
        setStatus(res.ok ? "Thank you — we received your submission." : res.message);
      }}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Heading id={`${id}-title`} className={cn("font-serif text-2xl font-normal tracking-[-0.012em]", tone === "light" ? "text-navy-900" : "text-paper")}>
          {def.title}
        </Heading>
        {!live ? (
          <span className="rounded-full border border-dashed border-gold-ink/50 bg-gold-400/10 px-3 py-1 text-xs font-semibold text-gold-ink">
            Preview
          </span>
        ) : null}
      </div>
      <p id={`${id}-status-note`} className={cn("text-sm", tone === "light" ? "text-muted" : "text-paper/70")}>
        {live
          ? "Fields marked * are required."
          : "This form opens with Ten Ambassadors' intake system. The fields are shown so you know what we'll ask."}
      </p>

      <fieldset disabled={!live} className="grid gap-5 sm:grid-cols-2">
        <legend className="sr-only">{def.title}</legend>
        {def.fields.map((f) => {
          const fid = `${id}-${f.name}`;
          const wide = f.type === "textarea" || f.type === "checkbox";
          return (
            <div key={f.name} className={wide ? "sm:col-span-2" : undefined}>
              <label htmlFor={fid} className={label}>
                {f.label}
                {f.required ? <span aria-hidden="true"> *</span> : null}
              </label>
              {f.type === "textarea" ? (
                <textarea id={fid} name={f.name} required={f.required} rows={4} className={field} aria-describedby={f.hint ? `${fid}-hint` : undefined} />
              ) : f.type === "select" ? (
                <select id={fid} name={f.name} required={f.required} className={field} defaultValue="">
                  <option value="" disabled>
                    Select…
                  </option>
                  {f.options?.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              ) : (
                <input
                  id={fid}
                  name={f.name}
                  type={f.type}
                  required={f.required}
                  autoComplete={f.autoComplete}
                  className={field}
                  aria-describedby={f.hint ? `${fid}-hint` : undefined}
                />
              )}
              {f.hint ? (
                <span id={`${fid}-hint`} className={hint}>
                  {f.hint}
                </span>
              ) : null}
            </div>
          );
        })}
        <div className="sm:col-span-2">
          <button type="submit" className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-60">
            {live ? "Submit" : "Not yet accepting submissions"}
          </button>
        </div>
      </fieldset>
      <p role="status" aria-live="polite" className="text-sm text-royal-700 empty:hidden">
        {status}
      </p>
    </form>
  );
}
