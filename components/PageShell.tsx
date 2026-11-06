import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

type Crumb = { label: string; href?: string };

/** Interior page frame in the Tissue Atlas style. */
export function PageShell({
  locale,
  title,
  kicker,
  crumbs = [],
  lead,
  children,
  aside,
}: {
  locale: Locale;
  title: string;
  kicker?: string;
  crumbs?: Crumb[];
  lead?: React.ReactNode;
  children: React.ReactNode;
  aside?: React.ReactNode;
}) {
  const ro = locale === "ro";
  return (
    <>
      <div className="relative overflow-hidden bg-paper">
        <div className="pointer-events-none absolute -right-24 top-0 h-full w-[46%] opacity-[0.22] [mask-image:linear-gradient(to_left,black,transparent)]" aria-hidden>
          <Image src="/art/tissue-he-sm.webp" alt="" fill sizes="50vw" className="object-cover" />
        </div>
        <Header locale={locale} tone="light" />
        <div className="relative mx-auto max-w-[1320px] px-4 pb-12 pt-8 sm:px-8 sm:pb-16 sm:pt-12">
          <nav aria-label={ro ? "Cale de navigare" : "Breadcrumb"} className="eyebrow flex flex-wrap items-center gap-2 text-ink-soft">
            <Link href={`/${locale}`} className="hover:text-eosin">{ro ? "Acasă" : "Home"}</Link>
            {crumbs.map((c) => (
              <span key={c.label} className="flex items-center gap-2">
                <span aria-hidden>/</span>
                {c.href ? <Link href={c.href} className="hover:text-eosin">{c.label}</Link> : <span>{c.label}</span>}
              </span>
            ))}
          </nav>
          {kicker && <p className="eyebrow mt-10 text-eosin">{kicker}</p>}
          <h1 className={`display ${kicker ? "mt-4" : "mt-10"} max-w-5xl text-[clamp(2.4rem,6vw,5.2rem)] text-ink`}>{title}</h1>
          {lead && <div className="mt-6 max-w-3xl text-xl leading-relaxed text-ink-soft">{lead}</div>}
        </div>
      </div>
      <main className="bg-paper">
        <div className="mx-auto grid max-w-[1320px] gap-12 px-4 pb-24 sm:px-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="min-w-0">{children}</div>
          {aside && <aside className="lg:sticky lg:top-6 lg:self-start">{aside}</aside>}
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}

function safeDecode(s: string) {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

export function DocList({ locale, docs }: { locale: Locale; docs: { label: string; href: string }[] }) {
  if (!docs.length) return null;
  const seen = new Set<string>();
  const uniq = docs.filter((d) => (seen.has(d.href) ? false : (seen.add(d.href), true)));
  return (
    <div className="rounded-3xl border border-line bg-white p-6">
      <p className="eyebrow mb-4 text-eosin">{locale === "ro" ? `Documente (${uniq.length})` : `Documents (${uniq.length})`}</p>
      <ul className="max-h-[60vh] space-y-1 overflow-auto pr-1">
        {uniq.map((d) => {
          const ext = (d.href.split("?")[0].match(/\.(\w+)$/)?.[1] ?? "").toUpperCase();
          const name = d.label || safeDecode(d.href.split("/").pop() ?? "").replace(/[-_]/g, " ").replace(/\.\w+$/, "");
          return (
            <li key={d.href}>
              <a href={d.href} target="_blank" rel="noopener" className="group flex items-start gap-3 rounded-xl p-2 text-sm hover:bg-paper">
                <span className="eyebrow mt-0.5 shrink-0 rounded-md bg-haem/10 px-1.5 py-0.5 !text-[0.6rem] text-haem">{ext || "DOC"}</span>
                <span className="text-ink group-hover:text-eosin">{name}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
