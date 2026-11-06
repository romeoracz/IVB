import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, LOCALES, type Locale } from "@/lib/i18n";
import { allPages, getById, getPage, pageTitle, sectionOf } from "@/lib/pages";
import { DocList, PageShell } from "@/components/PageShell";

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => allPages().map((p) => ({ locale, slug: p.slug })));
}

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const p = getPage(slug);
  if (!p || !isLocale(locale)) return {};
  return { title: pageTitle(p, locale), alternates: { languages: { ro: `/ro/${slug}`, en: `/en/${slug}` } } };
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
  const html = p.html.replaceAll("{locale}", locale);
  const section = sectionOf(slug);
  const parent = p.parent ? getById(p.parent) : undefined;
  const crumbs = [
    ...(section ? [{ label: section.label[locale], href: section.href.replace("{locale}", locale) }] : []),
    ...(parent ? [{ label: pageTitle(parent, locale), href: `/${locale}/${parent.slug}` }] : []),
    { label: pageTitle(p, locale) },
  ];
  return (
    <PageShell
      locale={locale}
      title={pageTitle(p, locale)}
      kicker={section?.label[locale]}
      crumbs={crumbs}
      aside={
        <div className="space-y-6">
          <DocList locale={locale} docs={p.docs} />
          <p className="px-2 text-xs text-ink-soft">
            {ro ? "Actualizat la " : "Updated "} {fmtDate(p.modified, locale)}
          </p>
        </div>
      }
    >
      {!ro && (
        <p className="mb-8 rounded-2xl border border-gold bg-gold-soft/50 px-5 py-4 text-sm text-ink">
          This page is currently available in Romanian only. An English version is being prepared.
        </p>
      )}
      <article lang="ro" className="prose-ivb" dangerouslySetInnerHTML={{ __html: html }} />
    </PageShell>
  );
}
