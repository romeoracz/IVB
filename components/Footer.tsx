import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import { CONTACT, SOCIAL, USEFUL_LINKS } from "@/lib/content/nav";
import { NAME } from "@/lib/content/home";

/** Footer: the same blocks ivb.ro shows (contact, useful links, patient hours, certification, social). */
export function Footer({ locale }: { locale: Locale }) {
  const ro = locale === "ro";
  return (
    <footer className="relative overflow-hidden bg-navy text-white">
      <div className="grid-lines absolute inset-0 opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-[1320px] px-4 pb-10 pt-20 sm:px-8">
        <div className="flex flex-col gap-10 border-b border-white/10 pb-14 lg:flex-row lg:items-end lg:justify-between">
          <Image src="/brand/building-gold.png" alt="" width={866} height={348} className="h-auto w-[min(420px,80vw)] opacity-90" />
          <p className="max-w-xl font-[family-name:var(--font-fraunces)] text-xl leading-snug text-white/85">{NAME[locale]}</p>
        </div>

        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="eyebrow mb-4 text-gold">Contact</h2>
            <address className="not-italic leading-relaxed text-white/80">
              {CONTACT.address.map((l) => (
                <span key={l} className="block">{l}</span>
              ))}
            </address>
            <p className="mt-3 text-white/80">
              {CONTACT.phones.map((p) => (
                <a key={p} href={`tel:+40${p.replace(/\s/g, "").slice(1)}`} className="link-underline block w-fit">{p}</a>
              ))}
            </p>
            <p className="mt-3">
              {CONTACT.emails.map((e) => (
                <a key={e} href={`mailto:${e}`} className="link-underline block w-fit text-white/80">{e}</a>
              ))}
            </p>
          </div>

          <div>
            <h2 className="eyebrow mb-4 text-gold">{ro ? "Program pacienți" : "Patient hours"}</h2>
            <p className="text-white/80">{ro ? "Luni – Vineri" : "Monday – Friday"}</p>
            <p className="font-[family-name:var(--font-fraunces)] text-3xl">{CONTACT.patients.hours}</p>
            <p className="mt-1 text-sm text-white/60">{ro ? "Cu excepția sărbătorilor legale" : "Except public holidays"}</p>
            <a href={`tel:+40${CONTACT.patients.phone.replace(/\s/g, "").slice(1)}`} className="link-underline mt-3 block w-fit text-white/80">
              {CONTACT.patients.phone}
            </a>
          </div>

          <div>
            <h2 className="eyebrow mb-4 text-gold">{ro ? "Link-uri utile" : "Useful links"}</h2>
            <ul className="space-y-1.5 text-sm text-white/75">
              {USEFUL_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} target="_blank" rel="noopener" className="link-underline">{l.label[locale]}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="eyebrow mb-4 text-gold">{ro ? "Certificare" : "Certification"}</h2>
            <Image src="/media/certind-2026.jpg" alt={ro ? "Sistem de management certificat ISO 9001, CERTIND" : "ISO 9001 certified management system, CERTIND"} width={100} height={107} className="rounded-md bg-white p-1" />
            <ul className="mt-6 flex gap-4 text-sm">
              {SOCIAL.map((s) => (
                <li key={s.name}>
                  <a href={s.href} target="_blank" rel="noopener" className="link-underline text-white/80">{s.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-2 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row">
          <p>© 2026 {NAME[locale]}</p>
          <p>
            <a href="mailto:responsabilgdpr@ivb.ro" className="link-underline">{ro ? "Protecția datelor (GDPR)" : "Data protection (GDPR)"}</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
