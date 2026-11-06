"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";

export function LangSwitch({ locale, className = "" }: { locale: Locale; className?: string }) {
  const path = usePathname() || `/${locale}`;
  const swap = (to: Locale) => path.replace(/^\/(ro|en)(?=\/|$)/, `/${to}`);
  return (
    <div className={`eyebrow flex items-center gap-1 ${className}`} aria-label="Language">
      {(["ro", "en"] as const).map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span aria-hidden className="opacity-40">/</span>}
          {l === locale ? (
            <span aria-current="true" className="font-semibold">{l.toUpperCase()}</span>
          ) : (
            <Link href={swap(l)} hrefLang={l} className="opacity-80 hover:opacity-100">
              {l.toUpperCase()}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
}
