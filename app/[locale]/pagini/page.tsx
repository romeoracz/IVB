import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, LOCALES, type Locale } from "@/lib/i18n";
import { allPages, pageTitle, type PageRec } from "@/lib/pages";
import { CURATED } from "@/lib/content/curated";
import { labOf, LABS } from "@/lib/content/labs";
import { PageShell } from "@/components/PageShell";

/* Index of every page carried over from ivb.ro, so nothing is unreachable. */

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === "en" ? "All pages" : "Toate paginile", alternates: { languages: { ro: "/ro/pagini", en: "/en/pagini" } } };
}

const GROUPS: { key: string; ro: string; en: string; test?: RegExp }[] = [
  { key: "careers", ro: "Cariere și concursuri", en: "Careers and competitions", test: /anunt|concurs|posturi|sesiunea|asistent-cercetare|hrs4r|resurse-umane/ },
  { key: "events", ro: "Evenimente, conferințe și cursuri", en: "Events, conferences and courses", test: /conference|conferinta|course|scoala|prelegere|lansare|volum|ipc-|symposium|pfe|mc-wg|carreras|path_conference|education|honorary/ },
  { key: "transparency", ro: "Transparență, calitate și etică", en: "Transparency, quality and ethics", test: /declarat|legea|control|calitate|achizit|transparen|etic|situatii|instruiri|protectia|dezbatere|integritate|egalitate|gdpr/ },
  { key: "projects", ro: "Programe și proiecte", en: "Programmes and projects", test: /^pn|cost|project|proiect|grant|crp-|smis|pce|opset|porphyderm|bioesfood|nucleu|excelsan|pnrr|eli|nanother|oportunitati|registrul/ },
  { key: "labs", ro: "Laboratoare", en: "Laboratories" },
  { key: "institute", ro: "Institutul", en: "The institute" },
];

function groupOf(p: PageRec): string {
  if (labOf(p.slug)) return "labs";
  for (const g of GROUPS) if (g.test?.test(p.slug)) return g.key;
  return "institute";
}

export default async function AllPages({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l: Locale = locale;
  const ro = l === "ro";
  const title = (p: PageRec) => (CURATED[p.slug] ? CURATED[p.slug].title[l] : pageTitle(p, l));
  const pages = allPages().slice().sort((a, b) => title(a).localeCompare(title(b), "ro"));
  return (
    <PageShell
      locale={l}
      title={ro ? "Toate paginile" : "All pages"}
      crumbs={[{ label: ro ? "Toate paginile" : "All pages" }]}
      lead={ro ? `Cele ${pages.length} de pagini ale site-ului, grupate pe teme.` : `All ${pages.length} pages of the site, grouped by topic.`}
    >
      <nav aria-label={ro ? "Teme" : "Topics"} className="mb-14 flex flex-wrap gap-2">
        {GROUPS.map((g) => (
          <a key={g.key} href={`#${g.key}`} className="rounded-full border border-line bg-white px-4 py-2 text-sm hover:border-eosin hover:text-eosin">
            {ro ? g.ro : g.en}
          </a>
        ))}
      </nav>
      <div className="space-y-16">
        {GROUPS.map((g) => {
          const items = pages.filter((p) => groupOf(p) === g.key);
          if (!items.length) return null;
          const sub =
            g.key === "labs"
              ? LABS.map((lab) => ({ name: lab.name[l], items: items.filter((p) => labOf(p.slug)?.lab.key === lab.key) })).filter((s) => s.items.length)
              : [{ name: "", items }];
          return (
            <section key={g.key} id={g.key} className="scroll-mt-24">
              <h2 className="font-display text-3xl font-semibold tracking-tight">
                {ro ? g.ro : g.en} <span className="eyebrow ml-2 align-middle text-eosin">{items.length}</span>
              </h2>
              {sub.map((s) => (
                <div key={s.name || g.key} className="mt-6">
                  {s.name && <h3 className="eyebrow mb-2 mt-8 text-ink-soft">{s.name}</h3>}
                  <ul className="divide-y divide-line border-y border-line">
                    {s.items.map((p) => (
                      <li key={p.slug}>
                        <Link href={`/${l}/${p.slug}`} className="flex items-baseline justify-between gap-6 py-3 hover:text-eosin">
                          <span>{title(p)}</span>
                          <span aria-hidden className="shrink-0 text-ink-soft">→</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          );
        })}
      </div>
    </PageShell>
  );
}
