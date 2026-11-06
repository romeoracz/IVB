import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import type { L10n } from "@/lib/content/nav";
import { linkProps } from "@/lib/link";
import { Arrow } from "@/components/home/Sections";

/* Content blocks for redesigned pages. Each block is bilingual. */

export type LinkItem = { title: L10n; text?: L10n; meta?: L10n | string; href?: string; img?: string };
export type Person = { name: string; role?: L10n; email?: string; href?: string };
export type DocItem = { label: L10n; href?: string; meta?: string; alt?: { label: string; href: string }[] };

export type Block =
  | { kind: "lead"; text: L10n }
  | { kind: "text"; title?: L10n; body: L10n[] }
  | { kind: "cards"; title?: L10n; kicker?: L10n; items: LinkItem[]; cols?: 2 | 3 | 4 }
  | { kind: "rows"; title?: L10n; kicker?: L10n; items: LinkItem[] }
  | { kind: "people"; title?: L10n; groups: { label: L10n; people: Person[] }[] }
  | { kind: "list"; title?: L10n; kicker?: L10n; items: L10n[]; cols?: 1 | 2 }
  | { kind: "docs"; title?: L10n; kicker?: L10n; items: DocItem[] }
  | { kind: "facts"; items: { k: string; v: L10n; href?: string }[] }
  | { kind: "callout"; title: L10n; body?: L10n; href?: string; cta?: L10n; tone?: "eosin" | "ink" | "gold" }
  | { kind: "contact"; title?: L10n; lines: { label: L10n; value: string; href?: string }[] }
  | { kind: "map"; title: L10n; src: string }
  | { kind: "honorees"; items: { year: string; name: string; title: string; lines: { text: string; href?: string }[]; img: string; diploma: string }[] }
  | { kind: "media"; title?: L10n; items: { title: L10n; text?: L10n; href: string; type: "audio" | "video" | "link" }[] };

const t = (v: L10n | string | undefined, l: Locale) => (v == null ? "" : typeof v === "string" ? v : v[l]);

function H2({ children, kicker }: { children: React.ReactNode; kicker?: string }) {
  return (
    <div className="mb-6">
      {kicker && <p className="eyebrow mb-2 text-eosin">{kicker}</p>}
      <h2 className="font-[family-name:var(--font-fraunces)] text-[clamp(1.6rem,3vw,2.3rem)] font-semibold leading-tight text-ink">{children}</h2>
    </div>
  );
}

function docExt(href?: string) {
  if (!href) return "";
  const m = href.split("?")[0].match(/\.(\w{2,4})$/);
  return m ? m[1].toUpperCase() : "";
}

export function Blocks({ blocks, locale }: { blocks: Block[]; locale: Locale }) {
  return (
    <div className="space-y-16">
      {blocks.map((b, i) => (
        <BlockView key={i} b={b} l={locale} />
      ))}
    </div>
  );
}

function BlockView({ b, l }: { b: Block; l: Locale }) {
  switch (b.kind) {
    case "lead":
      return <p className="max-w-3xl font-[family-name:var(--font-fraunces)] text-[1.55rem] leading-snug text-ink">{b.text[l]}</p>;

    case "text":
      return (
        <section className="max-w-3xl">
          {b.title && <H2>{b.title[l]}</H2>}
          <div className="space-y-4 text-[1.05rem] leading-relaxed text-ink-soft">
            {b.body.map((p, i) => (
              <p key={i}>{p[l]}</p>
            ))}
          </div>
        </section>
      );

    case "cards": {
      const cols = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[b.cols ?? 3];
      return (
        <section>
          {b.title && <H2 kicker={t(b.kicker, l)}>{b.title[l]}</H2>}
          <ul className={`grid gap-4 ${cols}`}>
            {b.items.map((it, i) => {
              const inner = (
                <>
                  {it.img && (
                    <span className="relative -mx-6 -mt-6 mb-5 block aspect-[16/10] overflow-hidden rounded-t-3xl">
                      <Image src={it.img} alt="" fill sizes="(min-width:1024px) 30vw, 90vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    </span>
                  )}
                  {it.meta && <span className="eyebrow block text-eosin">{t(it.meta, l)}</span>}
                  <span className="mt-1 flex items-start justify-between gap-3 font-[family-name:var(--font-fraunces)] text-xl font-semibold leading-snug text-ink">
                    {it.title[l]} {it.href && <Arrow className="mt-1.5 shrink-0" />}
                  </span>
                  {it.text && <span className="mt-2 block text-sm leading-relaxed text-ink-soft">{it.text[l]}</span>}
                </>
              );
              const cls = "group flex h-full flex-col rounded-3xl border border-line bg-white p-6 transition-shadow hover:shadow-xl hover:shadow-ink/5";
              return <li key={i}>{it.href ? <a {...linkProps(it.href, l)} className={cls}>{inner}</a> : <div className={cls}>{inner}</div>}</li>;
            })}
          </ul>
        </section>
      );
    }

    case "rows":
      return (
        <section>
          {b.title && <H2 kicker={t(b.kicker, l)}>{b.title[l]}</H2>}
          <ul className="border-t border-line">
            {b.items.map((it, i) => {
              const inner = (
                <>
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium text-ink group-hover:text-eosin">{it.title[l]}</span>
                    {it.text && <span className="mt-0.5 block text-sm text-ink-soft">{it.text[l]}</span>}
                  </span>
                  {it.meta && <span className="eyebrow shrink-0 text-ink-soft">{t(it.meta, l)}</span>}
                  {it.href && <Arrow className="shrink-0 text-ink-soft" />}
                </>
              );
              const cls = "group flex items-center gap-4 border-b border-line py-4";
              return <li key={i}>{it.href ? <a {...linkProps(it.href, l)} className={cls}>{inner}</a> : <div className={cls}>{inner}</div>}</li>;
            })}
          </ul>
        </section>
      );

    case "people":
      return (
        <section>
          {b.title && <H2>{b.title[l]}</H2>}
          <div className="space-y-10">
            {b.groups.map((g, i) => (
              <div key={i}>
                <p className="eyebrow mb-4 text-eosin">{g.label[l]}</p>
                <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {g.people.map((p) => (
                    <li key={p.name} className="rounded-2xl border border-line bg-white p-5">
                      <p className="font-[family-name:var(--font-fraunces)] text-lg font-semibold leading-snug text-ink">
                        {p.href ? <a href={p.href} target="_blank" rel="noopener" className="hover:text-eosin">{p.name}</a> : p.name}
                      </p>
                      {p.role && <p className="mt-1 text-sm text-ink-soft">{p.role[l]}</p>}
                      {p.email && <a href={`mailto:${p.email}`} className="mt-2 block text-sm text-brand hover:text-eosin">{p.email}</a>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      );

    case "list":
      return (
        <section>
          {b.title && <H2 kicker={t(b.kicker, l)}>{b.title[l]}</H2>}
          <ul className={`grid gap-x-10 gap-y-3 ${b.cols === 2 ? "sm:grid-cols-2" : ""}`}>
            {b.items.map((it, i) => (
              <li key={i} className="flex gap-3 text-[1.02rem] leading-relaxed text-ink-soft">
                <span aria-hidden className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-eosin" />
                <span>{it[l]}</span>
              </li>
            ))}
          </ul>
        </section>
      );

    case "docs":
      return (
        <section>
          {b.title && <H2 kicker={t(b.kicker, l)}>{b.title[l]}</H2>}
          <ul className="grid gap-3 sm:grid-cols-2">
            {b.items.map((d, i) => {
              const ext = docExt(d.href);
              const inner = (
                <>
                  <span className="eyebrow mt-0.5 shrink-0 rounded-md bg-haem/10 px-2 py-1 !text-[0.62rem] text-haem">{ext || (d.href ? "WEB" : d.alt ? docExt(d.alt[0].href) : "—")}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium leading-snug text-ink group-hover:text-eosin">{d.label[l]}</span>
                    {d.meta && <span className="mt-0.5 block text-xs text-ink-soft">{d.meta}</span>}
                  </span>
                </>
              );
              return (
                <li key={i} className="flex flex-col rounded-2xl border border-line bg-white">
                  {d.href ? (
                    <a {...linkProps(d.href, l)} className="group flex items-start gap-3 p-4">{inner}</a>
                  ) : (
                    <div className={`flex items-start gap-3 p-4 ${d.alt ? "" : "opacity-70"}`}>{inner}</div>
                  )}
                  {d.alt && (
                    <span className="flex gap-2 border-t border-line px-4 py-2">
                      {d.alt.map((a) => (
                        <a key={a.href} href={a.href} target="_blank" rel="noopener" className="eyebrow rounded-full border border-line px-2.5 py-1 !text-[0.62rem] text-ink-soft hover:border-eosin hover:text-eosin">
                          {a.label}
                        </a>
                      ))}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      );

    case "facts":
      return (
        <ul className="grid gap-px overflow-hidden rounded-3xl bg-line sm:grid-cols-3">
          {b.items.map((f) => (
            <li key={f.k} className="bg-white">
              {f.href ? (
                <a {...linkProps(f.href, l)} className="group block p-6">
                  <span className="display block text-3xl text-haem">{f.k}</span>
                  <span className="mt-2 block text-sm text-ink-soft">{f.v[l]}</span>
                </a>
              ) : (
                <div className="p-6">
                  <span className="display block text-3xl text-haem">{f.k}</span>
                  <span className="mt-2 block text-sm text-ink-soft">{f.v[l]}</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      );

    case "callout": {
      const tone = { eosin: "bg-eosin/10 border-eosin/30", ink: "bg-ink text-paper border-ink", gold: "bg-gold-soft border-gold" }[b.tone ?? "eosin"];
      const dark = b.tone === "ink";
      return (
        <section className={`rounded-3xl border p-7 sm:p-9 ${tone}`}>
          <p className={`font-[family-name:var(--font-fraunces)] text-2xl font-semibold leading-snug ${dark ? "" : "text-ink"}`}>{b.title[l]}</p>
          {b.body && <p className={`mt-3 max-w-3xl leading-relaxed ${dark ? "text-paper/75" : "text-ink-soft"}`}>{b.body[l]}</p>}
          {b.href && b.cta && (
            <a {...linkProps(b.href, l)} className={`group mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium ${dark ? "bg-paper text-ink" : "bg-ink text-paper"}`}>
              {b.cta[l]} <Arrow />
            </a>
          )}
        </section>
      );
    }

    case "contact":
      return (
        <section className="rounded-3xl border border-line bg-white p-7">
          {b.title && <p className="eyebrow mb-4 text-eosin">{b.title[l]}</p>}
          <dl className="grid gap-4 sm:grid-cols-2">
            {b.lines.map((c, i) => (
              <div key={i}>
                <dt className="text-xs uppercase tracking-wider text-ink-soft">{c.label[l]}</dt>
                <dd className="mt-1 font-medium text-ink">{c.href ? <a href={c.href} className="hover:text-eosin">{c.value}</a> : c.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      );

    case "map":
      return (
        <iframe
          src={b.src}
          title={b.title[l]}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="aspect-[16/9] w-full rounded-3xl border border-line"
        />
      );

    case "honorees":
      return (
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {b.items.map((h) => (
            <li key={h.name} className="flex flex-col rounded-3xl border border-line bg-white p-6">
              <div className="flex items-center gap-4">
                <Image src={h.img} alt={h.name} width={150} height={150} className="h-20 w-20 rounded-full object-cover grayscale" />
                <div>
                  <p className="display text-3xl text-haem">{h.year}</p>
                  <p className="font-[family-name:var(--font-fraunces)] text-xl font-semibold leading-tight text-ink">{h.name}</p>
                </div>
              </div>
              <p className="eyebrow mt-5 text-eosin">{h.title}</p>
              <ul className="mt-2 flex-1 space-y-1 text-sm text-ink-soft">
                {h.lines.map((x, i) => (
                  <li key={i}>{x.href ? <a href={x.href} target="_blank" rel="noopener" className="hover:text-eosin">{x.text}</a> : x.text}</li>
                ))}
              </ul>
              <a href={h.diploma} target="_blank" rel="noopener" className="group eyebrow mt-5 inline-flex items-center gap-2 text-ink-soft hover:text-eosin">
                {l === "ro" ? "Diploma" : "Diploma"} <Arrow />
              </a>
            </li>
          ))}
        </ol>
      );

    case "media":
      return (
        <section>
          {b.title && <H2>{b.title[l]}</H2>}
          <ul className="grid gap-3 sm:grid-cols-2">
            {b.items.map((m, i) => (
              <li key={i}>
                <a href={m.href} target="_blank" rel="noopener" className="group flex items-start gap-4 rounded-2xl border border-line bg-white p-5">
                  <span aria-hidden className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-haem text-paper">
                    {m.type === "audio" ? "♪" : m.type === "video" ? "▶" : "↗"}
                  </span>
                  <span>
                    <span className="block font-medium leading-snug text-ink group-hover:text-eosin">{m.title[l]}</span>
                    {m.text && <span className="mt-1 block text-sm text-ink-soft">{m.text[l]}</span>}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      );
  }
}
