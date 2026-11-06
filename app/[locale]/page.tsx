import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { ConceptB } from "@/components/home/Concepts";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ConceptB locale={locale} base="" />;
}
