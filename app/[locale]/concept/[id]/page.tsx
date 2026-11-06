import { notFound } from "next/navigation";
import { isLocale, LOCALES } from "@/lib/i18n";
import { ConceptA, ConceptB, ConceptC } from "@/components/home/Concepts";

const MAP = { a: ConceptA, b: ConceptB, c: ConceptC } as const;

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => Object.keys(MAP).map((id) => ({ locale, id })));
}

export default async function ConceptPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  if (!isLocale(locale) || !(id in MAP)) notFound();
  const C = MAP[id as keyof typeof MAP];
  return <C locale={locale} base={`/concept/${id}`} />;
}
