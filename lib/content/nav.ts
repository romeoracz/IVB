import type { Locale } from "@/lib/i18n";

export type L10n = Record<Locale, string>;
export type NavItem = { label: L10n; href: string; external?: boolean; children?: NavItem[] };

/**
 * Main menu, mirroring https://www.ivb.ro/ exactly (same items, same order).
 * During the concept phase every link still points at the live ivb.ro page or
 * document it points at today, so nothing is lost while the new pages are built.
 */
export const NAV: NavItem[] = [
  { label: { ro: "Acasă", en: "Home" }, href: "/" },
  {
    label: { ro: "Despre noi", en: "About us" },
    href: "/{locale}/despre_noi",
    children: [
      { label: { ro: "Conducerea Institutului", en: "Institute leadership" }, href: "https://www.ivb.ro/wp-content/uploads/2025/11/conducerea_2025_ivb.png" },
      { label: { ro: "Echipa administrativă", en: "Administrative team" }, href: "/{locale}/administratie" },
      { label: { ro: "Egalitate de gen", en: "Gender equality" }, href: "/{locale}/egalitate-de-gen" },
      { label: { ro: "Consiliul consultativ", en: "Advisory board" }, href: "/{locale}/c" },
      { label: { ro: "Organigrama Institutului", en: "Organisational chart" }, href: "https://www.ivb.ro/wp-content/uploads/2025/10/Organigrama_IVB_2025.pdf" },
      { label: { ro: "Contractul colectiv de muncă", en: "Collective labour agreement" }, href: "https://www.ivb.ro/wp-content/uploads/2026/01/Contract-colectiv-de-munca-IVB-2026-2028.pdf" },
      { label: { ro: "Transparență instituțională", en: "Institutional transparency" }, href: "/{locale}/transparenta" },
      { label: { ro: "Regulament de organizare și funcționare", en: "Rules of organisation and operation" }, href: "https://www.ivb.ro/wp-content/uploads/2025/01/ROF_IVB_2018.pdf" },
      { label: { ro: "Regulament intern", en: "Internal regulations" }, href: "https://www.ivb.ro/wp-content/uploads/2023/07/RI_Regulament-intern.pdf" },
      { label: { ro: "Planul strategic de dezvoltare", en: "Strategic development plan" }, href: "https://www.ivb.ro/wp-content/uploads/2025/01/Plan-Strategic-de-Dezvoltare_IVB_2025-2029.pdf" },
      { label: { ro: "Comisia de etică", en: "Ethics committee" }, href: "/{locale}/etica" },
      { label: { ro: "CTT", en: "Technology Transfer Centre (CTT)" }, href: "/{locale}/ctt-ivb" },
    ],
  },
  { label: { ro: "Cercetare", en: "Research" }, href: "/{locale}/cercetare" },
  { label: { ro: "Diagnostic", en: "Diagnostics" }, href: "/{locale}/centrul-de-diagnostic" },
  { label: { ro: "Honorary Scientist", en: "Honorary Scientist" }, href: "/{locale}/honorary-scientist" },
  { label: { ro: "Educație", en: "Education" }, href: "/{locale}/education" },
  { label: { ro: "Cariere", en: "Careers" }, href: "/{locale}/hrs4r-strategia-de-resurse-umane" },
  { label: { ro: "JCI", en: "JCI" }, href: "https://www.cellidentity.org/", external: true },
  { label: { ro: "Dincolo de Medicină", en: "Beyond Medicine" }, href: "/{locale}/dincolo-de-medicina" },
];

export const USEFUL_LINKS: { label: L10n; href: string }[] = [
  { label: { ro: "Ministerul Cercetării, Inovării şi Digitalizării", en: "Ministry of Research, Innovation and Digitalisation" }, href: "https://www.research.gov.ro/" },
  { label: { ro: "Ministerul Educaţiei", en: "Ministry of Education" }, href: "https://www.edu.ro/" },
  { label: { ro: "FSE România", en: "ESF Romania" }, href: "http://www.fseromania.ro/" },
  { label: { ro: "POSCCE", en: "POSCCE" }, href: "http://www.poscce.research.gov.ro/" },
  { label: { ro: "UEFISCDI", en: "UEFISCDI" }, href: "https://uefiscdi.gov.ro/" },
  { label: { ro: "POSDRU", en: "POSDRU" }, href: "https://www.fonduri-ue.ro" },
  { label: { ro: "Muzeul Victor Babeş Bucureşti", en: "Victor Babeş Museum, Bucharest" }, href: "https://muzeulbucurestiului.ro/en/the-victor-babes-museum.html" },
];

export const SOCIAL = [
  { name: "Facebook", href: "https://www.facebook.com/share/Rp5Y7WCHHmNM1Q9X/?mibextid=LQQJ4d" },
  { name: "Instagram", href: "https://www.instagram.com/institutul.victorbabes" },
  { name: "LinkedIn", href: "https://ro.linkedin.com/company/victor-babes-national-institute-of-pathology" },
];

/** Contact details exactly as published on ivb.ro (footer "CONTACT" block). */
export const CONTACT = {
  address: ["Splaiul Independenţei 99-101", "Sector 5", "Bucureşti"],
  phones: ["021 319 27 32", "021 319 45 28"],
  emails: ["info@ivb.ro", "responsabilgdpr@ivb.ro"],
  patients: { phone: "021 319 27 34", hours: "09:00 – 16:00" },
};
