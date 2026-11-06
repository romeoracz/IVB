import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";

const CONCEPTS = [
  { id: "a", img: "/art/network-gold-sm.webp", name: "Navy & Gold", ro: "Bleumarin și auriu, linii fine de celule și molecule. Cel mai apropiat de BritRoMed.", en: "Navy and gold, fine line-art of cells and molecules. Closest to BritRoMed." },
  { id: "b", img: "/art/tissue-he-sm.webp", name: "Tissue Atlas", ro: "Luminos și editorial, ca Francis Crick Institute, cu culorile colorației H&E.", en: "Light and editorial, like the Francis Crick Institute, in H&E stain colours." },
  { id: "c", img: "/art/if-field-sm.webp", name: "Microscope", ro: "Întunecat și imersiv, ca un câmp de imunofluorescență la microscop.", en: "Dark and immersive, like an immunofluorescence field under the microscope." },
];

export default async function Picker({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const ro = locale === "ro";
  return (
    <main className="min-h-screen bg-navy px-4 py-16 text-white sm:px-8">
      <div className="mx-auto max-w-[1320px]">
        <Image src="/brand/building-gold.png" alt="" width={866} height={348} className="h-auto w-56" priority />
        <p className="eyebrow mt-10 text-gold">{ro ? "Propuneri de design · noiembrie 2026" : "Design proposals · November 2026"}</p>
        <h1 className="display mt-4 text-[clamp(2.6rem,6vw,5rem)]">{ro ? "Trei direcții pentru ivb.ro" : "Three directions for ivb.ro"}</h1>
        <p className="mt-4 max-w-2xl text-white/70">
          {ro ? "Același meniu și aceleași informații ca astăzi, cu un design nou. Alegeți una; o construim complet, în română și engleză." : "The same menu and information as today, with a new design. Pick one and we build it fully, in Romanian and English."}
        </p>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {CONCEPTS.map((c) => (
            <li key={c.id}>
              <Link href={`/${locale}/concept/${c.id}`} className="group block overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={c.img} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <p className="eyebrow text-gold">{c.id.toUpperCase()}</p>
                  <p className="mt-1 font-[family-name:var(--font-fraunces)] text-3xl font-semibold">{c.name}</p>
                  <p className="mt-2 text-sm text-white/65">{ro ? c.ro : c.en}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-sm text-white/50">
          <Link href={ro ? "/en" : "/ro"} className="link-underline">{ro ? "English version" : "Versiunea în română"}</Link>
        </p>
      </div>
    </main>
  );
}
