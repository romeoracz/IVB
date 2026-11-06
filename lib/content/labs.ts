import type { L10n } from "./nav";

/** The eight laboratories and the old-site pages that belong to each (as on ivb.ro). */
type Tab = { slug: string; label: L10n };
export type Lab = { key: string; name: L10n; home: string; tabs: Tab[]; extra: { slug: string; tab: string }[] };

const T = {
  home: { ro: "Prezentare", en: "Overview" },
  about: { ro: "Despre", en: "About" },
  team: { ro: "Echipa", en: "Team" },
  projects: { ro: "Proiecte", en: "Projects" },
  done: { ro: "Proiecte încheiate", en: "Completed projects" },
  pubs: { ro: "Publicații", en: "Publications" },
  equip: { ro: "Echipamente", en: "Equipment" },
  news: { ro: "Noutăți", en: "News" },
  patents: { ro: "Brevete", en: "Patents" },
  services: { ro: "Servicii", en: "Services" },
  workshops: { ro: "Workshopuri", en: "Workshops" },
  tissue: { ro: "Țesuturi", en: "Tissue" },
  soft: { ro: "Software", en: "Software" },
  auth: { ro: "Autorizație", en: "Authorisation" },
  jobs: { ro: "Posturi", en: "Positions" },
};

export const LABS: Lab[] = [
  {
    key: "imunologie",
    name: { ro: "Imunologie", en: "Immunology" },
    home: "laborator-imunologie",
    tabs: [
      { slug: "laborator-imunologie", label: T.home },
      { slug: "team-imunologie", label: T.team },
      { slug: "projects-imunologie", label: T.projects },
      { slug: "publications-imunologie", label: T.pubs },
      { slug: "immunobiology-facilities", label: T.equip },
      { slug: "noutati-imunologie", label: T.news },
    ],
    extra: [
      { slug: "facilities-imunologie", tab: "immunobiology-facilities" },
      ...["immunobiolgy-pn-iii-p1-1-2-pccdi-2017-0782", "immunobiology-cost-ca-16120-epitran", "immunobiology-cost-ca-18125-aerogels", "immunobiology-cost-ca-18127", "immunobiology-p_37_732", "immunobiology-pn-19-29-01-01-2019", "immunobiology-pn-iii-p1-1-2-pccdi-2017-0341", "immunobiology-poc-52-2016"].map((s) => ({ slug: s, tab: "projects-imunologie" })),
    ],
  },
  {
    key: "biologie-celulara",
    name: { ro: "Biologie celulară, Neuroștiințe și Miologie experimentală", en: "Cell Biology, Neuroscience and Experimental Myology" },
    home: "cell-biology-home",
    tabs: [
      { slug: "cell-biology-home", label: T.home },
      { slug: "about-us-cell-biology", label: T.about },
      { slug: "cell-biology-team", label: T.team },
      { slug: "cell-biology-projects", label: T.projects },
      { slug: "cell-biology-publications", label: T.pubs },
      { slug: "cell-biology-facilities", label: T.equip },
    ],
    extra: ["cell-biology", "cell-biology-pn-19-29-01-03-oncorad", "cost-action-ca-17103-cell-biology", "pn-iii-p1-1-2-pccdi-2017-0769-cell-biology", "pn19-29-01-03-cell-biology"].map((s) => ({ slug: s, tab: "cell-biology-projects" })),
  },
  {
    key: "biobaza",
    name: { ro: "Biobază", en: "Biobase" },
    home: "home-biobaza",
    tabs: [
      { slug: "home-biobaza", label: T.home },
      { slug: "despre-biobaza", label: T.about },
      { slug: "echipa-biobaza", label: T.team },
      { slug: "proiecte-in-derulare-biobaza", label: T.projects },
      { slug: "proiecte-finalizate-biobaza", label: T.done },
      { slug: "publicatii-biobaza", label: T.pubs },
      { slug: "biobaza-echipamente", label: T.equip },
      { slug: "autorizatie-biobaza", label: T.auth },
    ],
    extra: [{ slug: "biobaza-337ped-pn-iii-p2-2-1-ped-2019-3297", tab: "proiecte-in-derulare-biobaza" }],
  },
  {
    key: "genetica",
    name: { ro: "Genetică", en: "Genetics" },
    home: "genetics",
    tabs: [
      { slug: "genetics", label: T.home },
      { slug: "despre-noi-genetica", label: T.about },
      { slug: "echipa-genetica", label: T.team },
      { slug: "proiecte-in-derulare-genetica", label: T.projects },
      { slug: "proiecte-incheiate-genetica", label: T.done },
      { slug: "publicatii-genetica", label: T.pubs },
      { slug: "echipamente-genetica", label: T.equip },
    ],
    extra: [
      { slug: "proiecte-genetica", tab: "proiecte-in-derulare-genetica" },
      { slug: "genetica-actiune-cost-ca-16118", tab: "proiecte-in-derulare-genetica" },
    ],
  },
  {
    key: "radiobiologie",
    name: { ro: "Radiobiologie", en: "Radiobiology" },
    home: "radiobiology",
    tabs: [
      { slug: "radiobiology", label: T.home },
      { slug: "about-us-radiobiology", label: T.about },
      { slug: "team-radiobiology", label: T.team },
      { slug: "radiobiology-project-13-eli", label: T.projects },
      { slug: "publications-radiobiology", label: T.pubs },
      { slug: "radiobiology-news", label: T.news },
    ],
    extra: [
      { slug: "radiobiology-facilities", tab: "radiobiology" },
      ...["radiobiologie-project-eli-09", "radiobiology-ao-2017-iber-esa-hre-ul-le-0003", "radiobiology-nanother", "radiobiology-redbrain"].map((s) => ({ slug: s, tab: "radiobiology-project-13-eli" })),
    ],
  },
  {
    key: "biochimie-proteomica",
    name: { ro: "Biochimie – Proteomică", en: "Biochemistry – Proteomics" },
    home: "laborator-biochimie-proteomica",
    tabs: [
      { slug: "laborator-biochimie-proteomica", label: T.home },
      { slug: "team-biochimie-proteomica", label: T.team },
      { slug: "proiectele-laboratorului-biochimie-proteomica", label: T.projects },
      { slug: "publicatii-biochimie-proteomica", label: T.pubs },
      { slug: "brevete_biochimie", label: T.patents },
      { slug: "echipamentele-laboratorului-de-biochimie-proteomica", label: T.equip },
      { slug: "elementor-1002", label: T.news },
      { slug: "posturi-biochimie", label: T.jobs },
    ],
    extra: [{ slug: "despre-laboratorul-biochimie-proteomica", tab: "laborator-biochimie-proteomica" }],
  },
  {
    key: "histopatologie",
    name: { ro: "Histopatologie și Imunohistochimie", en: "Histopathology and Immunohistochemistry" },
    home: "anatomic-pathology",
    tabs: [
      { slug: "anatomic-pathology", label: T.home },
      { slug: "anatomic-pathology-team", label: T.team },
      { slug: "anatomic-pathology-services", label: T.services },
      { slug: "anatomic-pathology-projects", label: T.projects },
      { slug: "anatomic-pathology-pub", label: T.pubs },
      { slug: "anatomic-pathology-tissue", label: T.tissue },
      { slug: "anatomic-pathology-soft", label: T.soft },
      { slug: "anatomic-pathology-workshops", label: T.workshops },
      { slug: "anatomic-pathology-news", label: T.news },
    ],
    extra: [],
  },
];

/** Which lab (and which tab) a page belongs to. */
export function labOf(slug: string): { lab: Lab; active: string } | null {
  for (const lab of LABS) {
    if (lab.tabs.some((t) => t.slug === slug)) return { lab, active: slug };
    const e = lab.extra.find((x) => x.slug === slug);
    if (e) return { lab, active: e.tab };
  }
  return null;
}
