"use client";

import { useId, useState } from "react";
import { forms, submitIntake, type FormId } from "@/lib/forms";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

/**
 * Renders any registered intake form (lib/forms.ts). Submissions go through `submitIntake`:
 * today that opens the visitor's email app with the message addressed to `site.inbox.address`
 * (interim: The Upmixer's inbox); once NEXT_PUBLIC_INTAKE_ENDPOINT is set it POSTs instead.
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
  const live = site.intake.enabled;
  const byEmail = !site.intake.endpoint;
  const [status, setStatus] = useState<{ text: string; mailto?: string } | null>(null);

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
        if (!res.ok) setStatus({ text: res.message });
        else if (res.via === "email")
          setStatus({ text: "Your email app should now open with your message, addressed and ready. Press send to deliver it.", mailto: res.mailto });
        else setStatus({ text: "Thank you. We received your message." });
      }}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Heading id={`${id}-title`} className={cn("font-serif text-2xl font-normal tracking-[-0.012em]", tone === "light" ? "text-navy-900" : "text-paper")}>
          {def.title}
        </Heading>
      </div>
      <p id={`${id}-status-note`} className={cn("text-sm", tone === "light" ? "text-muted" : "text-paper/70")}>
        Fields marked * are required.
        {byEmail ? " Sending opens your email app with your message ready to go." : null}
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
            Send
          </button>
        </div>
      </fieldset>
      <p role="status" aria-live="polite" className={cn("text-sm empty:hidden", tone === "light" ? "text-royal-700" : "text-gold-300")}>
        {status?.text}
        {status?.mailto ? (
          <>
            {" "}
            If nothing opened,{" "}
            <a href={status.mailto} className="font-semibold underline underline-offset-4">
              open the message in your email app
            </a>{" "}
            or write to <a href={`mailto:${site.inbox.address}`} className="font-semibold underline underline-offset-4">{site.inbox.address}</a>.
          </>
        ) : null}
      </p>
    </form>
  );
}
