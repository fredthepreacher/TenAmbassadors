import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowIcon } from "./Icons";
import styles from "./ButtonLink.module.css";

type Variant = "primary" | "secondary" | "ghost" | "light";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: "md" | "sm";
  arrow?: boolean;
  className?: string;
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  className,
}: ButtonLinkProps) {
  const cls = [styles.button, styles[variant], size === "sm" ? styles.sm : "", className]
    .filter(Boolean)
    .join(" ");
  return (
    <Link href={href} className={cls}>
      <span>{children}</span>
      {arrow ? <ArrowIcon className={styles.arrow} /> : null}
    </Link>
  );
}

/** Understated text link with an animated arrow. */
export function TextLink({
  href,
  children,
  tone = "dark",
  className,
}: {
  href: string;
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={[styles.textLink, tone === "light" ? styles.textLinkLight : "", className]
        .filter(Boolean)
        .join(" ")}
    >
      <span>{children}</span>
      <ArrowIcon className={styles.arrow} />
    </Link>
  );
}
