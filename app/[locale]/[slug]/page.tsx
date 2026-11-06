import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, LOCALES, type Locale } from "@/lib/i18n";
import { allPages, english, getById, getPage, pageTitle, sectionOf } from "@/lib/pages";
import { DocList, PageShell } from "@/components/PageShell";
import { Blocks } from "@/components/Blocks";
import { CURATED } from "@/lib/content/curated";
import { labOf } from "@/lib/content/labs";
import Link from "next/link";

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => allPages().map((p) => ({ locale, slug: p.slug })));
}

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const p = getPage(slug);
  if (!p || !isLocale(locale)) return {};
  const c = CURATED[slug];
  return { title: c ? c.title[locale] : pageTitle(p, locale), description: c?.lead?.[locale], alternates: { languages: { ro: `/ro/${slug}`, en: `/en/${slug}` } } };
}

function fmtDate(iso: string, l: Locale) {
  return new Date(iso).toLocaleDateString(l === "ro" ? "ro-RO" : "en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default async function ContentPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const p = getPage(slug);
  if (!p) notFound();
  const ro = locale === "ro";
  const cur = CURATED[slug];
  if (cur) {
    const sec = sectionOf(slug);
    return (
      <PageShell
        locale={locale}
        title={cur.title[locale]}
        kicker={cur.kicker?.[locale] ?? sec?.label[locale]}
        crumbs={[...(sec ? [{ label: sec.label[locale], href: sec.href.replace("{locale}", locale) }] : []), { label: cur.title[locale] }]}
        lead={cur.lead?.[locale]}
      >
        <Blocks blocks={cur.blocks} locale={locale} />
        <p className="mt-16 text-xs text-ink-soft">
          {ro ? "Actualizat la " : "Updated "} {fmtDate(p.modified, locale)}
        </p>
      </PageShell>
    );
  }
  const translated = !ro && p.lang === "ro" ? english(slug)?.html : undefined;
  const html = (translated ?? p.html).replaceAll("{locale}", locale);
  const lang = translated ? "en" : p.lang;
  const section = sectionOf(slug);
  const parent = p.parent ? getById(p.parent) : undefined;
  const labInfo = labOf(slug);
  const exists = new Set(allPages().map((x) => x.slug));
  const crumbs = labInfo
    ? [
        { label: ro ? "Cercetare" : "Research", href: `/${locale}/cercetare` },
        { label: ro ? "Laboratoare" : "Laboratories", href: `/${locale}/laboratoare` },
        ...(labInfo.lab.home !== slug ? [{ label: labInfo.lab.name[locale], href: `/${locale}/${labInfo.lab.home}` }] : []),
        { label: labInfo.lab.home === slug ? labInfo.lab.name[locale] : pageTitle(p, locale) },
      ]
    : [
    ...(section ? [{ label: section.label[locale], href: section.href.replace("{locale}", locale) }] : []),
    ...(parent ? [{ label: pageTitle(parent, locale), href: `/${locale}/${parent.slug}` }] : []),
    { label: pageTitle(p, locale) },
  ];
  const labTitle = labInfo ? (labInfo.lab.home === slug ? labInfo.lab.name[locale] : `${labInfo.lab.tabs.find((x) => x.slug === labInfo.active)?.label[locale] ?? pageTitle(p, locale)}`) : null;
  return (
    <PageShell
      locale={locale}
      title={labInfo && labInfo.active === slug ? labTitle! : pageTitle(p, locale)}
      kicker={labInfo ? (labInfo.lab.home === slug ? (ro ? "Laborator" : "Laboratory") : labInfo.lab.name[locale]) : section?.label[locale]}
      crumbs={crumbs}
      aside={
        <div className="space-y-6">
          {!translated && <DocList locale={locale} docs={p.docs} />}
          <p className="px-2 text-xs text-ink-soft">
            {ro ? "Actualizat la " : "Updated "} {fmtDate(p.modified, locale)}
          </p>
        </div>
      }
    >
      {labInfo && (
        <nav aria-label={labInfo.lab.name[locale]} className="mb-10 flex flex-wrap gap-2">
          {labInfo.lab.tabs.filter((x) => exists.has(x.slug)).map((x) => (
            <Link
              key={x.slug}
              href={`/${locale}/${x.slug}`}
              aria-current={x.slug === labInfo.active ? "page" : undefined}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${x.slug === labInfo.active ? "border-ink bg-ink text-paper" : "border-line bg-white text-ink-soft hover:border-eosin hover:text-eosin"}`}
            >
              {x.label[locale]}
            </Link>
          ))}
        </nav>
      )}
      {translated && (
        <p className="mb-8 text-sm text-ink-soft">
          English translation of the <Link href={`/ro/${slug}`} className="underline underline-offset-2 hover:text-eosin">Romanian page</Link>.
        </p>
      )}
      {lang !== "mixed" && lang !== locale && (
        <p className="mb-8 rounded-2xl border border-gold bg-gold-soft/50 px-5 py-4 text-sm text-ink">
          {ro ? "Această pagină este disponibilă doar în limba engleză." : "This page is currently available in Romanian only. An English version is being prepared."}
        </p>
      )}
      <article lang={lang === "mixed" ? undefined : lang} className="prose-ivb" dangerouslySetInnerHTML={{ __html: html }} />
    </PageShell>
  );
}
