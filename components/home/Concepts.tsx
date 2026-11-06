import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MISSION } from "@/lib/content/home";
import { Announcement, Arrow, Credentials, EventsAndPositions, Labs, PastEvents, Pillars, QuickAccess, SectionHead } from "./Sections";

const ART = { gold: "/art/network-gold.webp", tissue: "/art/tissue-he.webp", if: "/art/if-field.webp" };
const PILLAR_ART = [ART.gold, ART.tissue, ART.if];

type P = { locale: Locale; base: string };
const wrap = "mx-auto max-w-[1320px] px-4 sm:px-8";

/* ------------------------------------------------------------------ */
/* A. Navy & Gold: closest to BritRoMed. Gold line-art on deep navy.   */
/* ------------------------------------------------------------------ */
export function ConceptA({ locale, base }: P) {
  const ro = locale === "ro";
  return (
    <>
      <section className="relative overflow-hidden bg-navy text-white">
        <Image src={ART.gold} alt="" fill priority sizes="100vw" className="slow-pan object-cover opacity-90" />
        <div className="grid-lines absolute inset-0" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/70 to-transparent" aria-hidden />
        <Header locale={locale} tone="dark" base={base} />
        <div className={`relative ${wrap} pb-20 pt-16 sm:pb-28 sm:pt-24`}>
          <p className="eyebrow rise text-gold">{ro ? "Patologie · Științe biomedicale · București" : "Pathology · Biomedical sciences · Bucharest"}</p>
          <h1 className="display rise rise-2 mt-6 max-w-5xl text-[clamp(3rem,8.5vw,7.4rem)]">
            {ro ? <>Știința din spatele <em className="font-normal italic text-gold-soft">fiecărui</em> diagnostic</> : <>The science behind <em className="font-normal italic text-gold-soft">every</em> diagnosis</>}
          </h1>
          <p className="rise rise-3 mt-8 max-w-2xl text-lg text-white/75">{MISSION[locale]}</p>
          <div className="rise rise-3 mt-10 flex flex-wrap gap-3">
            <a href={`/${locale}/cercetare`} className="group inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-medium text-navy">
              {ro ? "Cercetarea noastră" : "Our research"} <Arrow />
            </a>
            <a href={`/${locale}/centrul-de-diagnostic`} className="group inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 font-medium">
              {ro ? "Centrul de Diagnostic" : "Diagnostic Centre"} <Arrow />
            </a>
          </div>
          <Image src="/brand/building-white.png" alt="" width={866} height={348} className="pointer-events-none mt-16 h-auto w-[min(620px,90vw)] opacity-25 lg:absolute lg:bottom-10 lg:right-8 lg:mt-0" />
        </div>
      </section>

      <main className="bg-paper">
        <div className={`${wrap} -mt-8 relative z-10`}>
          <Announcement locale={locale} variant="light" />
        </div>
        <section className={`${wrap} py-20`}>
          <QuickAccess locale={locale} />
        </section>
        <section className={`${wrap} pb-24`}>
          <SectionHead kicker={ro ? "Ce facem" : "What we do"} title={ro ? "Infrastructură, laboratoare, proiecte" : "Infrastructure, laboratories, projects"} />
          <Pillars locale={locale} images={PILLAR_ART} />
        </section>
        <section className="relative overflow-hidden bg-navy py-24 text-white">
          <div className="grid-lines absolute inset-0" aria-hidden />
          <div className={`relative ${wrap}`}>
            <SectionHead tone="dark" kicker={ro ? "Laboratoare" : "Laboratories"} title={ro ? "Opt laboratoare, o singură misiune" : "Eight laboratories, one mission"} />
            <Labs locale={locale} tone="dark" />
          </div>
        </section>
        <section className={`${wrap} py-24`}>
          <EventsAndPositions locale={locale} />
        </section>
        <section className={`${wrap} pb-24`}>
          <Credentials locale={locale} />
          <div className="mt-14">
            <PastEvents locale={locale} />
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* B. Tissue Atlas: light editorial, inspired by crick.ac.uk.          */
/*    Big statements, lots of air, H&E stain colours as the accent.    */
/* ------------------------------------------------------------------ */
export function ConceptB({ locale, base }: P) {
  const ro = locale === "ro";
  return (
    <>
      <div className="bg-paper">
        <Header locale={locale} tone="light" base={base} />
        <section className={`${wrap} pb-16 pt-10 sm:pt-16`}>
          <p className="eyebrow rise text-eosin">{ro ? "Institutul „Victor Babeș” · București" : "Victor Babeș Institute · Bucharest"}</p>
          <h1 className="display rise rise-2 mt-6 max-w-6xl text-[clamp(3rem,9vw,8.4rem)] text-ink">
            {ro ? <>Vedem boala <span className="text-haem">la nivel de celulă</span></> : <>We see disease <span className="text-haem">at the level of the cell</span></>}
          </h1>
          <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <p className="rise rise-3 max-w-2xl text-xl leading-relaxed text-ink-soft">{MISSION[locale]}</p>
            <div className="rise rise-3 flex flex-wrap gap-3 lg:justify-end">
              <a href={`/${locale}/despre_noi`} className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-medium text-paper">
                {ro ? "Despre institut" : "About the institute"} <Arrow />
              </a>
              <a href={`/${locale}/centrul-de-diagnostic`} className="group inline-flex items-center gap-2 rounded-full border border-ink/25 px-6 py-3 font-medium">
                {ro ? "Pacienți" : "Patients"} <Arrow />
              </a>
            </div>
          </div>
        </section>
        <div className="relative mx-4 h-[52vh] min-h-[340px] overflow-hidden rounded-[2rem] sm:mx-8">
          <Image src={ART.tissue} alt="" fill priority sizes="100vw" className="slow-pan object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" aria-hidden />
          <p className="eyebrow absolute bottom-6 left-6 text-white/90">{ro ? "Secțiune de țesut, colorație H&E · ilustrație" : "Tissue section, H&E stain · illustration"}</p>
        </div>
      </div>

      <main className="bg-paper">
        <section className={`${wrap} py-16`}>
          <Announcement locale={locale} variant="gold" />
        </section>
        <section className={`${wrap} pb-24`}>
          <QuickAccess locale={locale} />
        </section>
        <section className="bg-paper-2 py-24">
          <div className={wrap}>
            <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
              <SectionHead accent="text-eosin" kicker={ro ? "Laboratoare" : "Laboratories"} title={ro ? "Opt laboratoare" : "Eight laboratories"} />
              <Labs locale={locale} />
            </div>
          </div>
        </section>
        <section className={`${wrap} py-24`}>
          <SectionHead accent="text-eosin" kicker={ro ? "Ce facem" : "What we do"} title={ro ? "De la microscop la proiecte europene" : "From the microscope to European projects"} />
          <Pillars locale={locale} images={[ART.tissue, ART.if, ART.gold]} />
        </section>
        <section className={`${wrap} pb-24`}>
          <EventsAndPositions locale={locale} />
        </section>
        <section className={`${wrap} pb-24`}>
          <Credentials locale={locale} />
          <div className="mt-14">
            <PastEvents locale={locale} />
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* C. Microscope: dark, immersive, immunofluorescence field.           */
/* ------------------------------------------------------------------ */
export function ConceptC({ locale, base }: P) {
  const ro = locale === "ro";
  return (
    <div className="bg-[#050b18] text-white">
      <section className="relative min-h-[92vh] overflow-hidden">
        <Image src={ART.if} alt="" fill priority sizes="100vw" className="slow-pan object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050b18] via-[#050b18]/60 to-transparent" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050b18] to-transparent" aria-hidden />
        <Header locale={locale} tone="dark" base={base} />
        <div className={`relative ${wrap} flex min-h-[70vh] flex-col justify-center py-16`}>
          <p className="eyebrow rise text-[#7fb4ff]">{ro ? "Imunofluorescență · Genetică · Patologie" : "Immunofluorescence · Genetics · Pathology"}</p>
          <h1 className="display rise rise-2 mt-6 max-w-4xl text-[clamp(3rem,8vw,7rem)]">
            {ro ? <>Unde medicina <span className="text-[#7fb4ff]">devine vizibilă</span></> : <>Where medicine <span className="text-[#7fb4ff]">becomes visible</span></>}
          </h1>
          <p className="rise rise-3 mt-8 max-w-xl text-lg text-white/70">{MISSION[locale]}</p>
          <div className="rise rise-3 mt-10 flex flex-wrap gap-3">
            <a href={`/${locale}/laboratoare`} className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-[#050b18]">
              {ro ? "Explorează laboratoarele" : "Explore the laboratories"} <Arrow />
            </a>
          </div>
        </div>
      </section>

      <main>
        <section className={`${wrap} pb-16`}>
          <Announcement locale={locale} variant="dark" />
        </section>
        <section className={`${wrap} pb-24`}>
          <QuickAccess locale={locale} tone="dark" />
        </section>
        <section className={`${wrap} pb-24`}>
          <SectionHead tone="dark" kicker={ro ? "Ce facem" : "What we do"} title={ro ? "Infrastructură, laboratoare, proiecte" : "Infrastructure, laboratories, projects"} />
          <Pillars locale={locale} tone="dark" images={[ART.if, ART.gold, ART.tissue]} />
        </section>
        <section className={`${wrap} pb-24`}>
          <SectionHead tone="dark" kicker={ro ? "Laboratoare" : "Laboratories"} title={ro ? "Opt laboratoare" : "Eight laboratories"} />
          <Labs locale={locale} tone="dark" />
        </section>
        <section className={`${wrap} pb-24`}>
          <EventsAndPositions locale={locale} tone="dark" />
        </section>
        <section className={`${wrap} pb-24`}>
          <Credentials locale={locale} tone="dark" />
          <div className="mt-14">
            <PastEvents locale={locale} tone="dark" />
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
