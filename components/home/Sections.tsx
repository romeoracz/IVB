import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import { linkProps } from "@/lib/link";
import { ANNOUNCEMENT, CREDENTIALS, EVENTS, LABS, PAST_EVENTS, PILLARS, POSITIONS, QUICK } from "@/lib/content/home";


export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export function SectionHead({ kicker, title, tone = "light", accent = "text-brand" }: { kicker: string; title: string; tone?: "light" | "dark"; accent?: string }) {
  return (
    <div className="mb-10 max-w-3xl">
      <p className={`eyebrow mb-3 ${tone === "dark" ? "text-gold" : accent}`}>{kicker}</p>
      <h2 className={`display text-[clamp(2.2rem,5vw,3.8rem)] ${tone === "dark" ? "text-white" : "text-ink"}`}>{title}</h2>
    </div>
  );
}

/** Official notice strip, always first after the hero (as on ivb.ro today). */
export function Announcement({ locale, variant = "light" }: { locale: Locale; variant?: "light" | "dark" | "gold" }) {
  const styles = {
    light: "bg-white border-line text-ink",
    dark: "bg-navy-2 border-white/10 text-white",
    gold: "bg-gold-soft border-gold text-ink",
  }[variant];
  return (
    <a {...linkProps(ANNOUNCEMENT.href, locale)} className={`group flex flex-col gap-3 rounded-3xl border p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-8 ${styles}`}>
      <span className="eyebrow w-fit shrink-0 rounded-full border border-current px-3 py-1 opacity-80">{ANNOUNCEMENT.kicker[locale]}</span>
      <span className="flex-1">
        <span className="block font-[family-name:var(--font-fraunces)] text-2xl font-semibold leading-tight">{ANNOUNCEMENT.title[locale]}</span>
        <span className="mt-1 block text-[0.95rem] opacity-75">{ANNOUNCEMENT.body[locale]}</span>
      </span>
      <span className="eyebrow flex items-center gap-2">
        {locale === "ro" ? "Detalii" : "Details"} <Arrow />
      </span>
    </a>
  );
}

/** New: one-click routes for the four audiences that use the site most. */
export function QuickAccess({ locale, tone = "light" }: { locale: Locale; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <ul className={`grid overflow-hidden rounded-3xl border sm:grid-cols-2 lg:grid-cols-4 ${dark ? "border-white/10 bg-white/[0.03]" : "border-line bg-white/60"}`}>
      {QUICK.map((q, i) => (
        <li key={q.href} className={`${i > 0 ? (dark ? "border-white/10" : "border-line") + " border-t sm:border-t-0 lg:border-l" : ""} ${i === 2 ? "sm:border-t lg:border-t-0" : ""} ${i === 3 ? "sm:border-l sm:border-t lg:border-t-0" : ""} ${i === 1 ? "sm:border-l" : ""}`}>
          <a {...linkProps(q.href, locale)} className={`group flex h-full flex-col gap-2 p-6 transition-colors ${dark ? "hover:bg-white/5" : "hover:bg-white"}`}>
            <span className={`flex items-center justify-between font-[family-name:var(--font-fraunces)] text-xl font-semibold ${dark ? "text-white" : "text-ink"}`}>
              {q.label[locale]} <Arrow />
            </span>
            <span className={`text-sm ${dark ? "text-white/65" : "text-ink-soft"}`}>{q.text[locale]}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function Pillars({ locale, tone = "light", images }: { locale: Locale; tone?: "light" | "dark"; images: string[] }) {
  const dark = tone === "dark";
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {PILLARS.map((p, i) => (
        <a key={p.href} {...linkProps(p.href, locale)} className={`group relative flex min-h-[22rem] flex-col justify-end overflow-hidden rounded-3xl p-7 ${dark ? "text-white" : "text-white"}`}>
          <Image src={images[i % images.length]} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover object-[75%_center] transition-transform duration-700 group-hover:scale-105" />
          <span className="absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-navy/0" aria-hidden />
          <span className="relative">
            <span className="eyebrow text-gold">0{i + 1}</span>
            <span className="mt-2 flex items-center justify-between font-[family-name:var(--font-fraunces)] text-3xl font-semibold">
              {p.title[locale]} <Arrow className="h-5 w-5" />
            </span>
            <span className="mt-2 block text-[0.95rem] text-white/75">{p.text[locale]}</span>
          </span>
        </a>
      ))}
    </div>
  );
}

export function Labs({ locale, tone = "light" }: { locale: Locale; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <ol className={`grid border-t sm:grid-cols-2 lg:grid-cols-4 ${dark ? "border-white/15" : "border-line"}`}>
      {LABS.map((l, i) => (
        <li key={l.href} className={`border-b ${dark ? "border-white/15" : "border-line"}`}>
          <a {...linkProps(l.href, locale)} className={`group flex h-full items-start gap-4 py-6 pr-6 transition-colors ${dark ? "hover:text-gold" : "hover:text-brand"}`}>
            <span className={`eyebrow pt-1 ${dark ? "text-white/40" : "text-ink-soft"}`}>{String(i + 1).padStart(2, "0")}</span>
            <span className={`font-[family-name:var(--font-fraunces)] text-[1.3rem] font-semibold leading-snug ${dark ? "text-white" : ""}`}>{l[locale]}</span>
          </a>
        </li>
      ))}
    </ol>
  );
}

export function EventsAndPositions({ locale, tone = "light" }: { locale: Locale; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  const ro = locale === "ro";
  const card = dark ? "border-white/10 bg-white/[0.04] text-white" : "border-line bg-white text-ink";
  const muted = dark ? "text-white/60" : "text-ink-soft";
  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <p className={`eyebrow mb-4 ${dark ? "text-gold" : "text-eosin"}`}>{ro ? "Evenimente" : "Events"}</p>
        <ul className="space-y-4">
          {EVENTS.map((e) => (
            <li key={e.href}>
              <a {...linkProps(e.href, locale)} className={`group grid grid-cols-[auto_1fr_auto] items-center gap-6 rounded-3xl border p-6 ${card}`}>
                <span className={`eyebrow w-24 leading-relaxed ${muted}`}>{e.date[locale]}</span>
                <span>
                  <span className="block font-[family-name:var(--font-fraunces)] text-2xl font-semibold leading-tight">{e.title[locale]}</span>
                  {e.place[locale] && <span className={`text-sm ${muted}`}>{e.place[locale]}</span>}
                </span>
                <Arrow className="h-5 w-5" />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="lg:col-span-2">
        <p className={`eyebrow mb-4 ${dark ? "text-gold" : "text-eosin"}`}>{ro ? "Poziții deschise" : "Open positions"}</p>
        <ul className="space-y-4">
          {POSITIONS.map((p) => (
            <li key={p.href}>
              <a {...linkProps(p.href, locale)} className={`group flex items-center justify-between gap-4 rounded-3xl border p-6 ${card}`}>
                <span>
                  <span className={`eyebrow block ${muted}`}>{p.meta[locale]}</span>
                  <span className="mt-1 block font-medium leading-snug">{p.title[locale]}</span>
                </span>
                <Arrow className="h-5 w-5 shrink-0" />
              </a>
            </li>
          ))}
          <li>
            <a href={`/${locale}/hrs4r-strategia-de-resurse-umane`} className={`group eyebrow flex items-center gap-2 px-2 pt-2 ${muted}`}>
              {ro ? "Toate concursurile" : "All competitions"} <Arrow />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export function Credentials({ locale, tone = "light" }: { locale: Locale; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <ul className="grid gap-px overflow-hidden rounded-3xl sm:grid-cols-3">
      {CREDENTIALS.map((c) => (
        <li key={c.k} className={dark ? "bg-white/[0.04]" : "bg-white"}>
          <a {...linkProps(c.href, locale)} className="group block p-7">
            <span className={`display block text-4xl ${dark ? "text-gold" : "text-brand"}`}>{c.k}</span>
            <span className={`mt-2 block text-sm ${dark ? "text-white/70" : "text-ink-soft"}`}>{c.v[locale]}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function PastEvents({ locale, tone = "light" }: { locale: Locale; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <div>
      <p className={`eyebrow mb-4 ${dark ? "text-gold" : "text-ink-soft"}`}>{locale === "ro" ? "Evenimente încheiate" : "Past events"}</p>
      <ul className="flex flex-wrap gap-2">
        {PAST_EVENTS.map((e) => (
          <li key={e.href}>
            <a {...linkProps(e.href, locale)} className={`block rounded-full border px-4 py-2 text-sm transition-colors ${dark ? "border-white/15 text-white/75 hover:border-gold hover:text-gold" : "border-line text-ink-soft hover:border-brand hover:text-brand"}`}>
              {e.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
