import type { L10n } from "./nav";

/**
 * Homepage content. Every fact here comes from the live ivb.ro pages
 * (captured 2026-11-06, see /mnt/project-files/ivb-content/). Romanian is
 * tightened from the original wording; English is a translation of it.
 */

export const NAME: L10n = {
  ro: "Institutul Național de Cercetare-Dezvoltare în Domeniul Patologiei și Științelor Biomedicale „Victor Babeș”",
  en: "“Victor Babeș” National Institute of Research and Development in the Field of Pathology and Biomedical Sciences",
};
export const SHORT_NAME: L10n = {
  ro: "Institutul „Victor Babeș”",
  en: "Victor Babeș Institute",
};

// From the "Despre noi" page lead sentence.
export const MISSION: L10n = {
  ro: "Una dintre cele mai vechi instituții din România cu activitate neîntreruptă. Facem cercetare fundamentală și aplicativă în patologia umană, genetica medicală, imunologie și medicina celulară și moleculară.",
  en: "One of Romania’s oldest institutions in continuous operation. We carry out fundamental and applied research in human pathology, medical genetics, immunology, and cellular and molecular medicine.",
};

export const ANNOUNCEMENT = {
  kicker: { ro: "Anunț oficial", en: "Official notice" },
  title: { ro: "Concurs pentru funcția de Director General", en: "Competition for the post of Director General" },
  body: {
    ro: "Autoritatea Națională pentru Cercetare organizează concursul pentru ocuparea funcției de Director General al Institutului. Înscrierile se fac online până la 12.11.2026, ora 23:59.",
    en: "The National Research Authority is holding a competition for the post of Director General of the Institute. Online applications close on 12 November 2026 at 23:59.",
  },
  href: "/{locale}/concurs-director-general",
};

// The three tiles on the current homepage, same order and targets.
export const PILLARS = [
  {
    title: { ro: "Infrastructură", en: "Infrastructure" },
    text: { ro: "Infrastructura de cercetare a institutului, pe platforma EERTIS.", en: "The institute’s research infrastructure, on the EERTIS platform." },
    href: "https://eertis.eu/erio-2300-000p-4603",
  },
  {
    title: { ro: "Laboratoare", en: "Laboratories" },
    text: { ro: "Opt laboratoare, de la imunologie la proteomică.", en: "Eight laboratories, from immunology to proteomics." },
    href: "/{locale}/laboratoare",
  },
  {
    title: { ro: "Proiecte", en: "Projects" },
    text: { ro: "Proiecte naționale și internaționale în desfășurare.", en: "Ongoing national and international projects." },
    href: "/{locale}/proiecte-ivb",
  },
];

// The eight laboratories, from https://www.ivb.ro/laboratoare (same order).
export const LABS = [
  { ro: "Patologie ultrastructurală", en: "Ultrastructural Pathology", href: "https://www.cell-imaging.ro/" },
  { ro: "Imunologie", en: "Immunology", href: "/{locale}/laborator-imunologie" },
  { ro: "Biologie celulară, Neuroștiințe și Miologie experimentală", en: "Cell Biology, Neuroscience and Experimental Myology", href: "/{locale}/cell-biology-home" },
  { ro: "Biobază", en: "Biobase", href: "/{locale}/home-biobaza" },
  { ro: "Genetică", en: "Genetics", href: "/{locale}/genetics" },
  { ro: "Radiobiologie", en: "Radiobiology", href: "/{locale}/radiobiology" },
  { ro: "Biochimie – Proteomică", en: "Biochemistry – Proteomics", href: "/{locale}/laborator-biochimie-proteomica" },
  { ro: "Histopatologie și Imunohistochimie", en: "Histopathology and Immunohistochemistry", href: "/{locale}/anatomic-pathology" },
];

export const EVENTS = [
  {
    date: { ro: "5–6 noiembrie 2026", en: "5–6 November 2026" },
    title: { ro: "Annual Pathology Conference", en: "Annual Pathology Conference" },
    place: { ro: "București", en: "Bucharest" },
    href: "/{locale}/symposium_2026",
  },
  {
    date: { ro: "30–31 octombrie 2026", en: "30–31 October 2026" },
    title: { ro: "The 19th Course of Digestive Pathology", en: "The 19th Course of Digestive Pathology" },
    place: { ro: "", en: "" },
    href: "https://pathpathology.ro/",
  },
];

export const POSITIONS = [
  { title: { ro: "Concurs pentru ocuparea a trei poziții de cercetare", en: "Competition for three research positions" }, meta: { ro: "Sesiunea 4 · 2026", en: "Session 4 · 2026" }, href: "/{locale}/sesiunea-4-din-anul-2026" },
  { title: { ro: "Concurs pentru ocuparea a două poziții de cercetare", en: "Competition for two research positions" }, meta: { ro: "Sesiunea 5 · 2026", en: "Session 5 · 2026" }, href: "/{locale}/sesiunea-5-din-anul-2026-09" },
];

export const PAST_EVENTS = [
  { title: "16th Course on Digestive Pathology", href: "/{locale}/16th-course-on-digestive-pathology-3-4-nov-2023" },
  { title: "Online Workshop: Elisa Liehn", href: "/{locale}/strategies-for-scientific-publication-in-high-impact-journals" },
  { title: "Prelegerea Prof. Luis A. Diaz", href: "/{locale}/lecture-targeting-tumor-intrinsic-immmunity" },
  { title: "Școala din vacanță 2023", href: "/{locale}/scoala-din-vacanta" },
  { title: "Prelegerea Prof. David Gurwitz", href: "/{locale}/prelegerea-prof-david-gurwitz" },
  { title: "Prelegerea Prof. Rudolph A. Marcus", href: "/{locale}/prelegerea-prof-rudolph-a-marcus" },
  { title: "Prelegerea Prof. Alexandru Almășan", href: "/{locale}/prelegerea-prof-alexandru-almasan" },
  { title: "Workshop: Electron microscopy sample preparation", href: "/{locale}/workshop-electron-micrscopy-sample-preparation" },
];

// Proof points, each stated on ivb.ro.
export const CREDENTIALS = [
  { k: "ISO 9001", v: { ro: "Sistem de management certificat (CERTIND)", en: "Certified management system (CERTIND)" }, href: "https://www.ivb.ro/wp-content/uploads/2026/05/CERTIND_IVB_2026.jpg" },
  { k: "ISO 15189", v: { ro: "Laborator de histopatologie acreditat RENAR", en: "RENAR-accredited histopathology laboratory" }, href: "https://www.ivb.ro/wp-content/uploads/2026/10/RENAR_IVB_2025.pdf" },
  { k: "HR Excellence", v: { ro: "Distincția Comisiei Europene HR Excellence in Research", en: "European Commission HR Excellence in Research award" }, href: "/{locale}/hrs4r-strategia-de-resurse-umane" },
];

export const QUICK = [
  { label: { ro: "Pacienți", en: "Patients" }, text: { ro: "Centrul de Diagnostic, prețuri și program", en: "Diagnostic Centre, prices and hours" }, href: "/{locale}/centrul-de-diagnostic" },
  { label: { ro: "Cercetători", en: "Researchers" }, text: { ro: "Laboratoare, proiecte, rezultate", en: "Labs, projects, results" }, href: "/{locale}/cercetare" },
  { label: { ro: "Cariere", en: "Careers" }, text: { ro: "Concursuri deschise și HRS4R", en: "Open competitions and HRS4R" }, href: "/{locale}/hrs4r-strategia-de-resurse-umane" },
  { label: { ro: "Transparență", en: "Transparency" }, text: { ro: "Documente publice, Legea 544", en: "Public documents, Law 544" }, href: "/{locale}/transparenta" },
];
