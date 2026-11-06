import type { Block } from "@/components/Blocks";
import type { L10n } from "./nav";

/**
 * Redesigned pages. Facts, names, dates and document links are taken from the
 * live ivb.ro pages captured on 2026-11-06 (content/pages/<slug>.json). Romanian
 * is tightened from the original; English is translated from it.
 */
export type Curated = { kicker?: L10n; title: L10n; lead?: L10n; blocks: Block[]; art?: string };

const UP = "https://www.ivb.ro/wp-content/uploads";
const r = (ro: string, en: string): L10n => ({ ro, en });

export const CURATED: Record<string, Curated> = {
  /* ------------------------------------------------------------ About */
  despre_noi: {
    title: r("Despre noi", "About us"),
    lead: r(
      "Una dintre cele mai vechi instituții din România cu activitate neîntreruptă. Facem cercetare fundamentală și aplicativă în patologia umană, genetica medicală, imunologie și medicina celulară și moleculară.",
      "One of Romania’s oldest institutions in continuous operation. We carry out fundamental and applied research in human pathology, medical genetics, immunology, and cellular and molecular medicine.",
    ),
    blocks: [
      {
        kind: "cards",
        kicker: r("Organizare", "Organisation"),
        title: r("Cum funcționează institutul", "How the institute is run"),
        cols: 3,
        items: [
          { title: r("Conducerea Institutului", "Institute leadership"), text: r("Componența conducerii, 2025", "Leadership team, 2025"), href: `${UP}/2025/11/conducerea_2025_ivb.png` },
          { title: r("Echipa administrativă", "Administrative team"), text: r("Economic, achiziții, administrativ", "Finance, procurement, administration"), href: "/{locale}/administratie" },
          { title: r("Consiliul consultativ", "Advisory board"), text: r("Cinci profesori din SUA și Suedia", "Five professors from the US and Sweden"), href: "/{locale}/c" },
          { title: r("Organigrama", "Organisational chart"), text: r("Structura institutului, 2025", "Institute structure, 2025"), href: `${UP}/2025/10/Organigrama_IVB_2025.pdf` },
          { title: r("Contractul colectiv de muncă", "Collective labour agreement"), text: r("2026–2028", "2026–2028"), href: `${UP}/2026/01/Contract-colectiv-de-munca-IVB-2026-2028.pdf` },
          { title: r("Transparență instituțională", "Institutional transparency"), text: r("Integritate, ANI, Legea 544", "Integrity, ANI, Law 544"), href: "/{locale}/transparenta" },
          { title: r("Regulament de organizare și funcționare", "Rules of organisation and operation"), text: r("ROF", "ROF"), href: `${UP}/2025/01/ROF_IVB_2018.pdf` },
          { title: r("Planul strategic de dezvoltare", "Strategic development plan"), text: r("2025–2029", "2025–2029"), href: `${UP}/2025/01/Plan-Strategic-de-Dezvoltare_IVB_2025-2029.pdf` },
          { title: r("Comisia de etică", "Ethics committee"), text: r("Componență, cod de etică, CoARA", "Members, code of ethics, CoARA"), href: "/{locale}/etica" },
        ],
      },
      {
        kind: "docs",
        kicker: r("Rapoarte", "Reports"),
        title: r("Rapoarte de activitate", "Activity reports"),
        items: [
          { label: r("Raport de activitate 2025", "Activity report 2025"), href: `${UP}/2026/06/Raport-de-activitate-2025.pdf` },
          { label: r("Raport de activitate 2024", "Activity report 2024"), href: `${UP}/2025/06/Raport-de-activitate-2024_.pdf` },
          { label: r("Raport de activitate 2023", "Activity report 2023"), href: `${UP}/2024/06/Raport-anual_2023_INCD-Victor-Babes.pdf` },
          { label: r("Raport de activitate 2022", "Activity report 2022"), href: `${UP}/2023/06/INCD-Victor-Babes-Raport-anual-2022.pdf` },
          { label: r("Raport de activitate 2021", "Activity report 2021"), href: `${UP}/2022/06/INCD-Victor-Babes-Raport-anual-2021.pdf` },
          { label: r("Raport de activitate 2020", "Activity report 2020"), href: `${UP}/2021/06/INCD-Victor-Babes-Raport-anual-2020.pdf` },
          { label: r("Raport de activitate 2019", "Activity report 2019"), href: `${UP}/2021/03/Raport_Anual2019.pdf` },
          { label: r("Raport de activitate 2018", "Activity report 2018"), href: `${UP}/2021/06/Raport-anual-INCD-Victor-Babes2018.pdf` },
          { label: r("Raport de activitate 2017", "Activity report 2017"), href: `${UP}/2021/03/Raport-anual-2017-28mai2018.pdf` },
          { label: r("Raport de activitate 2016", "Activity report 2016"), meta: "nepublicat online / not published online" },
          { label: r("Raport de activitate 2015", "Activity report 2015"), href: `${UP}/2021/03/INCD-Victor-Babes_RAPORT-ANUAL-2015-final.pdf` },
          { label: r("Raport de activitate 2014", "Activity report 2014"), href: `${UP}/2021/03/Raport-Anual-INCD-Victor-Babes.pdf` },
          { label: r("Raport de activitate 2007–2011", "Activity report 2007–2011"), href: `${UP}/2021/03/Victor-Babes-Institute-Self-assessment-report.pdf` },
          { label: r("Raport de activitate 2003–2007", "Activity report 2003–2007"), href: `${UP}/2021/03/RAPORT-DE-AUTOEVALUARE3.pdf` },
        ],
      },
      {
        kind: "cards",
        kicker: r("Istorie și comunitate", "History and community"),
        title: r("Simpozioane și apariții media", "Symposia and media"),
        cols: 2,
        items: [
          { title: r("Simpozioanele Victor Babeș, 2015–2021", "Victor Babeș Symposia, 2015–2021"), href: "/{locale}/symposium" },
          { title: r("Intranet", "Intranet"), text: r("Pentru angajați", "For staff"), href: "https://www.ivb.ro/inet" },
        ],
      },
      {
        kind: "media",
        title: r("Victor Babeș la radio și televiziune", "Victor Babeș on radio and television"),
        items: [
          { type: "video", title: r("„Români care au schimbat lumea”: Victor Babeș", "“Romanians who changed the world”: Victor Babeș"), text: r("Televiziunea Română, TVR1. Episodul 11, un portret al lui Victor Babeș de Cristina Mageara.", "Romanian Television, TVR1. Episode 11, a portrait of Victor Babeș by Cristina Mageara."), href: "https://www.youtube.com/hashtag/tvr1" },
          { type: "audio", title: r("Știința în cuvinte potrivite, 3 octombrie 2016", "Știința în cuvinte potrivite, 3 October 2016"), text: r("Radio România Cultural. Moderatori: Corina Negrea și Dan Manolache.", "Radio România Cultural. Presenters: Corina Negrea and Dan Manolache."), href: "https://www.ivb.ro/media/1-Stiinta%20in%20cuvinte%203%20October%202016%20fragment%20Nobel%20medicina%202016.MP3" },
          { type: "audio", title: r("Știința în cuvinte potrivite, 6 octombrie 2016", "Știința în cuvinte potrivite, 6 October 2016"), text: r("Radio România Cultural. Moderatori: Corina Negrea și Dan Manolache.", "Radio România Cultural. Presenters: Corina Negrea and Dan Manolache."), href: "https://www.ivb.ro/media/2-RR%20CULTURAL%206%20October%202016%2013_14_47%20(2).mp3" },
          { type: "audio", title: r("Idei în nocturnă: Fațete ale patriotismului, 1 decembrie 2016", "Idei în nocturnă: Facets of patriotism, 1 December 2016"), text: r("Radio România Cultural. Moderator: Corina Negrea.", "Radio România Cultural. Presenter: Corina Negrea."), href: "https://www.ivb.ro/media/3-Idei%20in%20nocturna%20Mircea%20Leabu%201%20decembrie%202016.mp3" },
        ],
      },
    ],
  },

  administratie: {
    kicker: r("Despre noi", "About us"),
    title: r("Echipa administrativă", "Administrative team"),
    blocks: [
      {
        kind: "people",
        groups: [
          { label: r("Director economic", "Finance director"), people: [{ name: "Ec. Belu Mihaela", role: r("Director economic", "Finance director"), email: "contab@ivb.ro" }] },
          {
            label: r("Compartiment financiar-contabil", "Finance and accounting"),
            people: [
              { name: "Ec. Ion Liliana", role: r("Economist", "Economist"), email: "contab@ivb.ro" },
              { name: "Ec. Nicolae Mariana", role: r("Economist", "Economist") },
              { name: "Ec. Oprea Iulia", role: r("Economist", "Economist") },
            ],
          },
          {
            label: r("Compartiment achiziții", "Procurement"),
            people: [
              { name: "Niţă Alina", role: r("Expert", "Expert") },
              { name: "Reşinari Roxana", role: r("Economist", "Economist") },
            ],
          },
          {
            label: r("Compartiment administrativ, tehnic și PSI", "Administration, technical services and fire safety"),
            people: [
              { name: "Filipescu Cătălin", role: r("Specialist", "Specialist") },
              { name: "Lungu Daniela", role: r("Expert", "Expert") },
              { name: "Bala Stelian", role: r("Auditor", "Auditor") },
              { name: "Cristian Ciupitu", role: r("Jurist", "Legal adviser") },
              { name: "Dumitru Dodi", role: r("Jurist", "Legal adviser") },
              { name: "Ciucă Mihai", role: r("Inginer", "Engineer") },
              { name: "Petrescu Cezar", role: r("Inginer", "Engineer") },
              { name: "Ciobanu Mariana", role: r("Secretară", "Secretary") },
            ],
          },
        ],
      },
    ],
  },

  "egalitate-de-gen": {
    kicker: r("Despre noi", "About us"),
    title: r("Egalitate de gen", "Gender equality"),
    lead: r("Planul institutului pentru egalitate de gen acoperă perioada ianuarie 2025 – decembrie 2029.", "The institute’s Gender Equality Plan runs from January 2025 to December 2029."),
    blocks: [
      { kind: "docs", items: [{ label: r("Gender Equality Plan, ianuarie 2025 – decembrie 2029", "Gender Equality Plan, January 2025 – December 2029"), href: `${UP}/2025/03/GEP-INCDVB_2025-2029.pdf` }] },
    ],
  },

  c: {
    kicker: r("Despre noi", "About us"),
    title: r("Consiliul consultativ", "Advisory board"),
    lead: r("Membrii consiliului consultativ al institutului.", "Members of the institute’s advisory board."),
    blocks: [
      {
        kind: "people",
        groups: [
          {
            label: r("Membri", "Members"),
            people: [
              { name: "Victor E. Velculescu, M.D., Ph.D.", role: r("Co-Director of Cancer Genetics and Epigenetics; Professor of Oncology and Pathology, Johns Hopkins University Kimmel Cancer Center, Baltimore, MD", "Co-Director of Cancer Genetics and Epigenetics; Professor of Oncology and Pathology, Johns Hopkins University Kimmel Cancer Center, Baltimore, MD"), href: "https://www.hopkinsmedicine.org/profiles/details/victor-velculescu" },
              { name: "Lucian Radu Chirieac, Professor, M.D.", role: r("Professor of Pathology, Harvard Medical School; Senior Pathologist, Brigham and Women’s Hospital, Boston, MA, USA", "Professor of Pathology, Harvard Medical School; Senior Pathologist, Brigham and Women’s Hospital, Boston, MA, USA"), href: "https://connects.catalyst.harvard.edu/Profiles/display/Person/41938" },
              { name: "Bhanu P. Jena, Professor, PhD", role: r("Department of Physiology, School of Medicine, Wayne State University", "Department of Physiology, School of Medicine, Wayne State University"), href: "https://physiology.med.wayne.edu/profile/ai6873" },
              { name: "Rudolph A. Marcus", role: r("Kirkwood-Noyes Professor, Professor of Chemistry, Division of Chemistry and Chemical Engineering, California Institute of Technology, Pasadena, CA", "Kirkwood-Noyes Professor, Professor of Chemistry, Division of Chemistry and Chemical Engineering, California Institute of Technology, Pasadena, CA"), href: "https://www.cce.caltech.edu/people/rudolph-a-rudy-marcus" },
              { name: "Lars Larsson", role: r("Professor of neurophysiology; group leader, Basic and Clinical Muscle Biology, Department of Physiology and Pharmacology, Karolinska Institutet", "Professor of neurophysiology; group leader, Basic and Clinical Muscle Biology, Department of Physiology and Pharmacology, Karolinska Institutet"), href: "https://staff.ki.se/people/lars-larsson" },
            ],
          },
        ],
      },
    ],
  },

  transparenta: {
    kicker: r("Despre noi", "About us"),
    title: r("Transparență instituțională", "Institutional transparency"),
    lead: r("Documentele publice ale institutului, într-un singur loc.", "The institute’s public documents, in one place."),
    blocks: [
      {
        kind: "docs",
        items: [
          { label: r("Politica în domeniul calității și al mediului", "Quality and environmental policy"), href: `${UP}/2025/10/MMI_A3_Declaratia-de-politica-in-domeniul-calitatii-si-mediului_2025.pdf` },
          { label: r("Plan de integritate", "Integrity plan"), href: `${UP}/2022/06/Declaratie-integritateanticoruptie.pdf` },
          { label: r("Declarații ANI", "ANI asset and interest declarations"), href: "/{locale}/declaratii-ani" },
          { label: r("Avertizor de integritate", "Whistleblowing (integrity warning)"), href: `${UP}/2024/03/Avertizor-de-integritate-INCDVB.pdf` },
          { label: r("Program de prevenire și reducere a cantității deșeurilor", "Waste prevention and reduction programme"), href: `${UP}/2026/04/Program-de-prevenire-si-reducere-a-cantitatilor-deseurilor-2026_r.pdf` },
          { label: r("Control intern managerial", "Internal managerial control"), href: "/{locale}/control-intern-managerial" },
          { label: r("Legea 544/2001: acces la informații de interes public", "Law 544/2001: access to public information"), href: "/{locale}/legea-544" },
        ],
      },
    ],
  },

  etica: {
    kicker: r("Despre noi", "About us"),
    title: r("Comisia de etică", "Ethics committee"),
    blocks: [
      {
        kind: "docs",
        items: [
          { label: r("Componența comisiei de etică", "Ethics committee members"), meta: "Decizia 101P/08.04.2025", href: `${UP}/2025/06/Decizie-Comisie-Etica_2025.pdf` },
          { label: r("Codul de etică al institutului", "The institute’s code of ethics"), href: `${UP}/2026/05/COD-ETICA-INCDVB_2026.pdf` },
          { label: r("CoARA: Plan de acțiune", "CoARA: Action plan"), href: `${UP}/2025/06/Action-Plan-CoARA-IVB_v1.pdf` },
        ],
      },
    ],
  },

  "ctt-ivb": {
    kicker: r("Despre noi", "About us"),
    title: r("Centrul de Transfer Tehnologic (CTT-IVB)", "Technology Transfer Centre (CTT-IVB)"),
    lead: r(
      "Legătura dintre cercetarea institutului și mediul economic. Aducem rezultatele științifice acolo unde economia are nevoie de inovare, mai ales în sănătate.",
      "The bridge between the institute’s research and industry. We bring scientific results to where the economy needs innovation, above all in health.",
    ),
    blocks: [
      {
        kind: "text",
        title: r("Ce face CTT-IVB", "What CTT-IVB does"),
        body: [
          r(
            "CTT-IVB este o structură fără personalitate juridică, distinctă în organigrama institutului din 2025. Facilitează colaborarea dintre cercetători, companii și administrațiile publice locale și centrale, și consolidează legăturile cu rețelele naționale, europene și internaționale de cercetare și inovare.",
            "CTT-IVB is a unit without separate legal personality, shown as a distinct unit in the institute’s organisational chart since 2025. It connects researchers with companies and with local and central public administrations, and strengthens links with national, European and international research and innovation networks.",
          ),
          r(
            "Obiectivul principal: promovarea biotehnologiilor medicale și a sănătății ca domenii de specializare inteligentă, punerea în legătură a producătorilor și utilizatorilor de rezultate de cercetare și transferul tehnologic, în țară și în străinătate.",
            "Main objective: to promote medical biotechnology and health as smart-specialisation fields, to connect the producers and users of research results, and to transfer technology in Romania and abroad.",
          ),
        ],
      },
      {
        kind: "list",
        kicker: r("Servicii", "Services"),
        title: r("Servicii in vivo", "In vivo services"),
        items: [
          r("Consultanță etică și legislativă", "Ethics and regulatory advice"),
          r("Cazare și servicii pentru animale", "Animal housing and care"),
          r("Modele experimentale de tumori și boli inflamatorii", "Experimental models of tumours and inflammatory disease"),
          r("Teste pentru evaluarea durerii și inflamației", "Pain and inflammation testing"),
          r("Teste pentru coordonarea motorie, învățarea spațială și memorie", "Motor coordination, spatial learning and memory testing"),
        ],
      },
      {
        kind: "list",
        title: r("Servicii in vitro", "In vitro services"),
        items: [
          r("Extracție ADN din probe biologice (sânge, fragment tisular, pelet celular)", "DNA extraction from biological samples (blood, tissue, cell pellet)"),
          r("Cuantificare absolută a acizilor nucleici prin ddPCR", "Absolute quantification of nucleic acids by ddPCR"),
          r("Testări de citotoxicitate, viabilitate și proliferare, în timp real și la momente definite, pentru biocompuși și nanostructuri", "Cytotoxicity, viability and proliferation testing, in real time and at set time points, for biocompounds and nanostructures"),
          r("Analiză multiplex xMAP pe platforma Luminex 200", "Multiplex xMAP analysis on the Luminex 200 platform"),
          r("Determinări de specii reactive de oxigen și de azot pe culturi celulare", "Reactive oxygen and nitrogen species measurement in cell cultures"),
          r("Determinări cantitative ELISA", "Quantitative ELISA"),
        ],
      },
      {
        kind: "docs",
        title: r("Fișe de servicii", "Service sheets"),
        items: [
          { label: r("Consultanță etică și legislativă (modele murine)", "Ethics and regulatory advice (mouse models)"), href: `${UP}/2026/08/serviciu_consultanta_etica_soareci.pdf` },
          { label: r("Testări de citotoxicitate", "Cytotoxicity testing"), href: `${UP}/2026/07/serviciu-citotoxicitate_CTT.pdf` },
          { label: r("Analiză multiplex, model inflamator", "Multiplex analysis, inflammation model"), href: `${UP}/2026/08/serviciu-model-inflamator_CTT-final.pdf` },
        ],
      },
      {
        kind: "contact",
        title: r("Contact CTT-IVB", "Contact CTT-IVB"),
        lines: [
          { label: r("Email", "Email"), value: "ctt@ivb.ro", href: "mailto:ctt@ivb.ro" },
          { label: r("Telefon", "Phone"), value: "021 319 27 32", href: "tel:+40213192732" },
          { label: r("Adresă", "Address"), value: "Splaiul Independenței 99-101, 050096, Sector 5, București" },
          { label: r("Program", "Hours"), value: "Luni – Vineri / Mon – Fri, 9:00 – 17:00" },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------ Research */
  cercetare: {
    title: r("Cercetare", "Research"),
    lead: r("Opt laboratoare, proiecte naționale și internaționale și un registru public al rezultatelor.", "Eight laboratories, national and international projects, and a public register of results."),
    blocks: [
      {
        kind: "cards",
        cols: 3,
        items: [
          { img: "/art/if-field-sm.webp", title: r("Laboratoare", "Laboratories"), text: r("Opt unități de cercetare", "Eight research units"), href: "/{locale}/laboratoare" },
          { img: "/art/tissue-he-sm.webp", title: r("Proiecte în desfășurare", "Ongoing projects"), text: r("Competiții naționale și internaționale, cu parteneri", "National and international competitions, with partners"), href: "/{locale}/proiecte-ivb" },
          { img: "/art/network-gold-sm.webp", title: r("Registrul rezultatelor cercetării", "Register of research results"), text: r("2019–2024", "2019–2024"), href: "/{locale}/registrul-de-evidenta-al-rezultatelor-cercetarii" },
        ],
      },
      {
        kind: "rows",
        kicker: r("Programe", "Programmes"),
        title: r("Programul Nucleu", "Core Programme (Nucleu)"),
        items: [
          { title: r("Programul Nucleu 2023–2026", "Core Programme 2023–2026"), href: "/{locale}/program-nucleu-2023-2026" },
          { title: r("Programul Nucleu 2019–2022", "Core Programme 2019–2022"), href: "/{locale}/program-nucleu-2019-2022" },
          { title: r("Infrastructura de cercetare pe EERTIS", "Research infrastructure on EERTIS"), href: "https://eertis.eu/erio-2300-000p-4603" },
        ],
      },
    ],
  },

  laboratoare: {
    kicker: r("Cercetare", "Research"),
    title: r("Laboratoare", "Laboratories"),
    lead: r("Cele opt unități de cercetare ale institutului.", "The institute’s eight research units."),
    blocks: [
      {
        kind: "cards",
        cols: 2,
        items: [
          { meta: "01", title: r("Patologie ultrastructurală", "Ultrastructural Pathology"), text: r("Site dedicat: cell-imaging.ro", "Dedicated site: cell-imaging.ro"), href: "https://www.cell-imaging.ro/" },
          { meta: "02", title: r("Imunologie", "Immunology"), href: "/{locale}/laborator-imunologie" },
          { meta: "03", title: r("Biologie celulară, Neuroștiințe și Miologie experimentală", "Cell Biology, Neuroscience and Experimental Myology"), href: "/{locale}/cell-biology-home" },
          { meta: "04", title: r("Biobază", "Biobase"), href: "/{locale}/home-biobaza" },
          { meta: "05", title: r("Genetică", "Genetics"), href: "/{locale}/genetics" },
          { meta: "06", title: r("Radiobiologie", "Radiobiology"), href: "/{locale}/radiobiology" },
          { meta: "07", title: r("Biochimie – Proteomică", "Biochemistry – Proteomics"), href: "/{locale}/laborator-biochimie-proteomica" },
          { meta: "08", title: r("Histopatologie și Imunohistochimie", "Histopathology and Immunohistochemistry"), href: "/{locale}/anatomic-pathology" },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------ Diagnostics */
  "centrul-de-diagnostic": {
    title: r("Centrul de Diagnostic", "Diagnostic Centre"),
    lead: r(
      "Din 15 mai 2025 facem gratuit testare genetică pentru pacienții oncologici, în Programul Național de Oncologie.",
      "Since 15 May 2025 we provide free genetic testing for cancer patients under the National Oncology Programme.",
    ),
    blocks: [
      {
        kind: "callout",
        tone: "eosin",
        title: r("Testare genetică gratuită, la recomandarea medicului oncolog", "Free genetic testing, on referral by your oncologist"),
        body: r(
          "Subprogramul Național de Testare Genetică acoperă diagnosticul molecular și testele genetice pentru terapie personalizată în: cancer colorectal (panel 1), cancer bronhopulmonar (panelurile 1, 3, 4) și cancer de sân (panelurile 1 și 2).",
          "The National Genetic Testing Subprogramme covers molecular diagnosis and genetic tests for personalised therapy in: colorectal cancer (panel 1), lung cancer (panels 1, 3, 4) and breast cancer (panels 1 and 2).",
        ),
        href: "mailto:centrudiagnostic@ivb.ro",
        cta: r("Scrieți-ne: centrudiagnostic@ivb.ro", "Email us: centrudiagnostic@ivb.ro"),
      },
      {
        kind: "contact",
        title: r("Programări și informații", "Appointments and information"),
        lines: [
          { label: r("Telefon", "Phone"), value: "021 319 27 34", href: "tel:+40213192734" },
          { label: r("Email", "Email"), value: "centrudiagnostic@ivb.ro", href: "mailto:centrudiagnostic@ivb.ro" },
          { label: r("Program pacienți", "Patient hours"), value: "Luni – Vineri / Mon – Fri, 09:00 – 16:00" },
          { label: r("Adresă", "Address"), value: "Splaiul Independenţei 99-101, Sector 5, Bucureşti" },
        ],
      },
      {
        kind: "list",
        kicker: r("La cerere", "On request"),
        title: r("Alte teste pentru diagnostic și terapie personalizată în cancer", "Other tests for cancer diagnosis and personalised therapy"),
        items: [
          r(
            "Imunohistochimie (IHC): ALK (clona D5F3 Ventana), PD-L1 (clonele SP263 sau SP142 Ventana; clona 22C3 Dako Agilent), HER2 (clona 4B5 Ventana), CLAUDIN18 (clona 43-14A Ventana, cancer gastric), pan-TRK (EPR17341 Ventana), HER2 DISH (carcinom gastric, carcinom mamar), SSTR2, SSTR5 și altele.",
            "Immunohistochemistry (IHC): ALK (clone D5F3 Ventana), PD-L1 (clones SP263 or SP142 Ventana; clone 22C3 Dako Agilent), HER2 (clone 4B5 Ventana), CLAUDIN18 (clone 43-14A Ventana, gastric cancer), pan-TRK (EPR17341 Ventana), HER2 DISH (gastric and breast carcinoma), SSTR2, SSTR5 and others.",
          ),
          r(
            "Teste genetice: mutații KRAS (exonii 2, 3 și 4), NRAS (exonii 2, 3 și 4), EGFR (exonii 18, 19, 20 și 21) sau BRAF codon 600; fuziunea genelor NTRK1, NTRK2 și NTRK3; instabilitate microsatelitară (MSI) și altele.",
            "Genetic tests: KRAS mutations (exons 2, 3 and 4), NRAS (exons 2, 3 and 4), EGFR (exons 18, 19, 20 and 21) or BRAF codon 600; NTRK1, NTRK2 and NTRK3 gene fusions; microsatellite instability (MSI) and others.",
          ),
        ],
      },
      {
        kind: "callout",
        tone: "gold",
        title: r("Lista de prețuri", "Price list"),
        body: r("Toate analizele de anatomie patologică și tarifele lor.", "All anatomic pathology tests and their prices."),
        href: "/{locale}/analize-anatomie-patologica",
        cta: r("Vezi prețurile", "See prices"),
      },
      {
        kind: "facts",
        items: [
          { k: "ISO 15189:2023", v: r("Laborator acreditat RENAR, nr. LM 156", "RENAR-accredited laboratory, no. LM 156"), href: `${UP}/2026/10/RENAR_IVB_2025.pdf` },
          { k: "2001", v: r("Anul înființării laboratorului", "Year the laboratory was founded") },
          { k: "7", v: r("Medici anatomopatologi", "Pathologists") },
        ],
      },
      {
        kind: "text",
        title: r("Laboratorul de Histopatologie și Imunohistochimie", "Histopathology and Immunohistochemistry Laboratory"),
        body: [
          r(
            "Înființat în 2001, laboratorul oferă servicii medicale pentru pacienți, cabinete medicale, policlinici, spitale și alți beneficiari.",
            "Founded in 2001, the laboratory provides medical services to patients, medical practices, outpatient clinics, hospitals and other clients.",
          ),
        ],
      },
      {
        kind: "people",
        groups: [
          { label: r("Coordonator", "Coordinator"), people: [{ name: "Dr. Niculae Andrei Marian" }] },
          {
            label: r("Medici anatomopatologi", "Pathologists"),
            people: [
              { name: "Dr. Almarii Florina" },
              { name: "Dr. Becheanu Gabriel" },
              { name: "Dr. Braitor Diana-Ionelia" },
              { name: "Dr. Enache Simona Iuliana" },
              { name: "Dr. Ene Adina Elena" },
              { name: "Dr. Florea Maria Alexandra" },
              { name: "Dr. Pop Doina Mihaela" },
            ],
          },
          {
            label: r("Asistenți medicali de laborator", "Laboratory nurses"),
            people: [{ name: "Asist. Dumitru Mihaela" }, { name: "Asist. Țîndrea Georgeta Mirela" }, { name: "Asist. Neamţu Paul Adrian" }],
          },
        ],
      },
      {
        kind: "docs",
        kicker: r("Pentru pacienți", "For patients"),
        title: r("Termeni, calitate și reclamații", "Terms, quality and complaints"),
        items: [
          { label: r("Criterii de acceptabilitate a probelor biologice", "Acceptance criteria for biological samples"), href: `${UP}/2024/09/Criterii-de-acceptabilitate.pdf` },
          { label: r("Procedura de tratare a reclamațiilor", "Complaints procedure"), href: `${UP}/2024/09/Proces-de-tratare-a-reclamatiei.pdf` },
          { label: r("Certificat de acreditare RENAR", "RENAR accreditation certificate"), href: `${UP}/2026/10/RENAR_IVB_2025.pdf` },
          { label: r("Organizare (certificare RENAR LHIH)", "Organisation (RENAR certification, LHIH)"), href: `${UP}/2024/09/CERTIFICARE-RENAR-_LHIH.pdf` },
        ],
      },
      {
        kind: "text",
        body: [
          r(
            "Protecția datelor personale ale pacienților este foarte importantă pentru noi; datele nu fac obiectul unui proces automatizat.",
            "Protecting patients’ personal data matters to us; your data is not subject to automated processing.",
          ),
        ],
      },
    ],
  },

  /* ------------------------------------------------------------ Honorary */
  "honorary-scientist": {
    title: r("Honorary Scientist", "Honorary Scientist"),
    lead: r("Oamenii de știință cărora institutul le-a acordat titlul de Honorary Scientist.", "The scientists awarded the title of Honorary Scientist by the institute."),
    blocks: [
      {
        kind: "honorees",
        items: [
          { year: "2024", name: "Angel Cedazo Minguez", title: "Professor, MD, PhD", img: "/media/wp/2024/09/angel_cedazo-150x150.webp", diploma: `${UP}/2024/09/angel_cedazo_honorary.png`, lines: [{ text: "Department of Neurobiology, Care Sciences and Society", href: "https://ki.se/en/people/angel-cedazo-minguez" }, { text: "Karolinska Institute, Sweden", href: "https://ki.se/en" }] },
          { year: "2023", name: "Lucian Radu Chirieac", title: "Professor, M.D.", img: "/media/wp/2023/11/Lucian-Chirieac-Honorary-Scientist-2023-150x150.jpg", diploma: `${UP}/2023/11/Honorary-Scientist_Prof.-Chririeac_nov-2023-scaled.jpg`, lines: [{ text: "Professor of Pathology, Harvard Medical School", href: "https://connects.catalyst.harvard.edu/Profiles/display/Person/41938" }, { text: "Senior Pathologist, Brigham and Women’s Hospital" }, { text: "Boston, MA, USA" }] },
          { year: "2023", name: "Luis A. Diaz", title: "Professor, M.D.", img: "/media/wp/2023/07/Prof.-Luis-A-Diaz-150x150.jpg", diploma: `${UP}/2023/07/HONORARY-SCIENTIST-2023_Prof-Diaz-LA.png`, lines: [{ text: "Head of Division of Solid Tumor Oncology; Grayer Family Chair" }, { text: "Professor of Medicine, Weill Cornell Medical College" }, { text: "Memorial Sloan Kettering Cancer Center, New York, NY, USA", href: "https://www.mskcc.org/cancer-care/doctors/luis-diaz-jr" }] },
          { year: "2022", name: "Derek J. Hausenloy", title: "Professor, MD, PhD", img: "/media/wp/2022/08/derekhausenloy-150x150.jpg", diploma: `${UP}/2022/08/diploma_derek.png`, lines: [{ text: "Cardiovascular & Metabolic Disorders Signature Program, Duke-NUS Medical School, Singapore", href: "https://www.duke-nus.edu.sg/directory/detail/derek-john-hausenloy" }, { text: "Senior Consultant, National Heart Centre Singapore", href: "https://www.nhcs.com.sg/profile/derek-hausenloy" }, { text: "Professor of Cardiovascular Medicine, The Hatter Cardiovascular Institute, University College London", href: "https://iris.ucl.ac.uk/iris/browse/profile?upi=DHAUS05" }] },
          { year: "2021", name: "Victor Velculescu", title: "Professor, MD, PhD", img: "/media/wp/2021/11/profvv-150x150.jpg", diploma: `${UP}/2021/11/HonoraryScientistProfVV-scaled.jpg`, lines: [{ text: "Professor of Oncology and Pathology, Johns Hopkins University School of Medicine", href: "https://www.jhu-bmb-phd.org/faculty/victor-velculescu" }, { text: "Co-Director of Cancer Genetics and Epigenetics, Johns Hopkins Kimmel Cancer Center", href: "https://www.hopkinsmedicine.org/profiles/details/victor-velculescu" }, { text: "Baltimore, MD" }] },
          { year: "2020", name: "Ştefan Constantinescu", title: "Professor, MD, PhD", img: "/media/wp/2021/07/StefanConstantinescu-150x150.png", diploma: `${UP}/2021/07/DiplomaHonoraryScientistStefanN.png`, lines: [{ text: "Université Catholique de Louvain" }, { text: "Ludwig Institute for Cancer Research", href: "https://www.ludwigcancerresearch.org/scientist/stefan-n-constantinescu/" }, { text: "Christian de Duve Institute of Cellular Pathology, Brussels, Belgium", href: "https://www.deduveinstitute.be/receptor-and-JAK-signaling-and-hematology" }] },
          { year: "2019", name: "Ruedi Aebersold", title: "Professor, PhD", img: "/media/wp/2021/07/ruedi-150x150.jpg", diploma: `${UP}/2021/07/Prof-Ruedi-Aebersold.png`, lines: [{ text: "Institute of Molecular Systems Biology, ETH Zurich", href: "https://imsb.ethz.ch/research/aebersold/people/ruedi-aebersold.html" }, { text: "HUPO Award (2005), Otto Naegeli Prize (2010), Thomson Medal Award (2012), Bijvoet Medal, Utrecht University (2018)" }] },
          { year: "2018", name: "Rudolph A. Marcus", title: "Professor, PhD", img: "/media/wp/2021/07/RAM_2-150x150-1-150x150.jpeg", diploma: `${UP}/2021/07/Diploma_RudolphAMarcus.png`, lines: [{ text: "Nobel Prize in Chemistry 1992", href: "https://www.nobelprize.org/prizes/chemistry/1992/marcus/biographical/" }, { text: "Kirkwood-Noyes Professor, Professor of Chemistry" }, { text: "California Institute of Technology, Pasadena, CA", href: "https://www.cce.caltech.edu/people/rudolph-a-rudy-marcus" }] },
          { year: "2017", name: "Bhanu P. Jena", title: "Professor, PhD", img: "/media/wp/2021/07/Untitled-e1513333331836-150x150-1-150x150.jpg", diploma: `${UP}/2021/07/Babes-Honorary-SCIENTIST-BP-JENA-A3-Fata-940x1329-1.jpg`, lines: [{ text: "Department of Physiology, School of Medicine, Wayne State University", href: "https://physiology.med.wayne.edu/profile/ai6873" }, { text: "Director, NanoBioScience Institute, Detroit, MI" }] },
          { year: "2017", name: "Antonio P. Cuadrado", title: "Professor, PhD", img: "/media/wp/2021/07/Cuadrado-150x150.jpg", diploma: `${UP}/2021/07/Babes-Honorary-SCIENTIST-Cuadrado-A3-Fata-940x1329-1.jpg`, lines: [{ text: "Professor of Biochemistry and Molecular Biology, Faculty of Medicine, Autonomous University of Madrid (UAM)", href: "https://www.bq.uam.es/acuadrado/" }, { text: "CIBERNED, Madrid, Spain", href: "https://www.ciberned.es/en/grupo-cuadrado.html" }, { text: "Institute of Biomedical Investigations “Alberto Sols”, Madrid", href: "https://www.iib.uam.es/portal/en/investigacion/grupos" }] },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------ Education */
  education: {
    title: r("Educație", "Education"),
    lead: r("Simpozioane, cursuri, workshopuri și prelegeri pentru cercetători și medici.", "Symposia, courses, workshops and lectures for researchers and doctors."),
    blocks: [
      {
        kind: "cards",
        cols: 2,
        items: [
          { img: "/media/wp/2023/08/2023_conf-768x427.png", title: r("Simpozioane", "Symposia"), text: r("Simpozioanele Victor Babeș", "The Victor Babeș Symposia"), href: "/{locale}/symposium" },
          { img: "/media/wp/2022/04/banner_simplu.jpg", title: r("135 de ani de activitate", "135 years of activity"), text: r("Aniversarea din 2022", "The 2022 anniversary"), href: "/{locale}/aniversar-2022" },
          { img: "/media/wp/2020/10/6-1024x683.jpg", title: r("Teaching & Training", "Teaching & Training"), text: r("Workshopuri și prezentări", "Workshops and presentations"), href: "/{locale}/workshopuri-si-prezentari" },
          { img: "/media/wp/2020/10/4-1024x681.jpg", title: r("Proiecte", "Projects"), href: "https://www.ivb.ro/archives/728" },
        ],
      },
      {
        kind: "rows",
        kicker: r("Conferințe și cursuri", "Conferences and courses"),
        title: r("Evenimente recente", "Recent events"),
        items: [
          { title: r("Annual Pathology Conference 2026", "Annual Pathology Conference 2026"), meta: "5–6.11.2026", href: "/{locale}/symposium_2026" },
          { title: r("The 19th Course of Digestive Pathology", "The 19th Course of Digestive Pathology"), meta: "30–31.10.2026", href: "https://pathpathology.ro/" },
          { title: r("Annual Conference of Pathology 2025", "Annual Conference of Pathology 2025"), href: "/{locale}/annual-conference-of-pathology-2025" },
          { title: r("17th Course on Digestive Pathology", "17th Course on Digestive Pathology"), href: "/{locale}/17-th-course-on-digestive-pathology" },
          { title: r("16th Course on Digestive Pathology", "16th Course on Digestive Pathology"), href: "/{locale}/16th-course-on-digestive-pathology-3-4-nov-2023" },
          { title: r("Școala din vacanță", "Holiday school"), href: "/{locale}/scoala-din-vacanta" },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------ Careers */
  "hrs4r-strategia-de-resurse-umane": {
    title: r("Cariere", "Careers"),
    lead: r(
      "Pe 6 mai 2024 institutul a primit de la Comisia Europeană distincția HR Excellence in Research.",
      "On 6 May 2024 the institute received the European Commission’s HR Excellence in Research award.",
    ),
    blocks: [
      {
        kind: "rows",
        kicker: r("Concursuri deschise", "Open competitions"),
        title: r("Poziții deschise", "Open positions"),
        items: [
          { title: r("Sesiunea 5: concurs pentru ocuparea a două poziții de cercetare", "Session 5: competition for two research positions"), meta: "2026", href: "/{locale}/sesiunea-5-din-anul-2026-09" },
          { title: r("Sesiunea 4: concurs pentru ocuparea a trei poziții de cercetare", "Session 4: competition for three research positions"), meta: "2026", href: "/{locale}/sesiunea-4-din-anul-2026" },
          { title: r("Concurs pentru funcția de Director General", "Competition for the post of Director General"), meta: "2026", href: "/{locale}/concurs-director-general" },
        ],
      },
      {
        kind: "text",
        title: r("Strategia de resurse umane (HRS4R)", "Human Resources Strategy for Researchers (HRS4R)"),
        body: [
          r(
            "Institutul susține Carta Europeană a Cercetătorului și Codul de conduită pentru recrutarea cercetătorilor și implementează Strategia de resurse umane pentru cercetători, care a dus la obținerea distincției HR Excellence in Research.",
            "The institute endorses the European Charter for Researchers and the Code of Conduct for the Recruitment of Researchers, and implements the Human Resources Strategy for Researchers, which led to the HR Excellence in Research award.",
          ),
        ],
      },
      {
        kind: "docs",
        kicker: r("HRS4R", "HRS4R"),
        title: r("Documente HRS4R", "HRS4R documents"),
        items: [
          { label: r("Angajamentul față de Carta și Codul European (2022)", "Commitment to the European Charter and Code (2022)"), href: `${UP}/2024/01/03_Commitment-to-the-European-Charter-and-Code_HRS4R_IVB2022.pdf` },
          { label: r("Consultarea cercetătorilor privind principiile Cartei și Codului", "Researcher consultation on the Charter and Code principles"), href: `${UP}/2024/01/Raport-chestionar-HRS4R-INCD-Victor-Babes.pdf` },
          { label: r("Descrierea procesului, faza inițială", "Process description, initial phase"), alt: [{ label: "RO", href: `${UP}/2024/01/Process-description-RO.pdf` }, { label: "EN", href: `${UP}/2024/01/Process-description-EN.pdf` }] },
          { label: r("OTM-R: recrutare deschisă, transparentă și pe bază de merit", "OTM-R: open, transparent and merit-based recruitment"), alt: [{ label: "RO", href: `${UP}/2024/01/2.-OTM-R-RO.pdf` }, { label: "EN", href: `${UP}/2024/01/06_OTMR_-EURAXESS.pdf` }] },
          { label: r("Analiza GAP", "Gap analysis"), alt: [{ label: "RO", href: `${UP}/2024/01/1.-GAP-RO.pdf` }, { label: "EN", href: `${UP}/2024/01/07_GAP_-EURAXESS.pdf` }] },
          { label: r("Plan de acțiune", "Action plan"), alt: [{ label: "RO", href: `${UP}/2024/02/3.-Action-Plan-rev1-RO.pdf` }, { label: "EN", href: `${UP}/2024/01/08_Action-plan_-EURAXESS-rev1.pdf` }] },
          { label: r("Evaluare intermediară HRS4R, 2026", "HRS4R interim assessment, 2026"), alt: [{ label: "RO", href: `${UP}/2026/06/Evaluare-intermediara_HRS4R__IVB_2026_ro.pdf` }, { label: "EN", href: `${UP}/2026/06/Interim-Assessment_HRS4R_IVB_2026_eng.pdf` }] },
          { label: r("Consultarea cercetătorilor privind Carta Europeană a Cercetătorilor, 2026", "Researcher consultation on the European Charter for Researchers, 2026"), href: `${UP}/2026/06/Consultarea-cercetatorilor-cu-privire-la-implementarea-principiilor-Cartei-Europene-a-Cercetatorilor.pdf` },
        ],
      },
      {
        kind: "docs",
        kicker: r("Politici interne", "Internal policies"),
        title: r("Regulamente și metodologii", "Regulations and methodologies"),
        items: [
          { label: r("Metodologie-cadru pentru concursurile de ocupare a posturilor vacante", "Framework methodology for vacancy competitions"), href: `${UP}/2026/06/Metodologie-cadru-concurs-posturi-vacante_IVB_2025.pdf` },
          { label: r("Metodologie-cadru pentru promovare", "Framework methodology for promotion"), href: `${UP}/2026/06/Metodologie-cadru-pentru-promovare_IVB_2026.pdf` },
          { label: r("Regulament de evaluare periodică a cercetătorilor", "Regulation on periodic evaluation of researchers"), href: `${UP}/2025/06/Regulament-evaluare-periodica_cercetatori_IVB_2025_1.pdf` },
          { label: r("Codul de etică", "Code of ethics"), href: `${UP}/2026/06/COD-ETICA-INCDVB_2026.pdf` },
          { label: r("Contractul colectiv de muncă", "Collective labour agreement"), href: `${UP}/2026/01/Contract-colectiv-de-munca-IVB-2026-2028.pdf` },
          { label: r("Gender Equality Plan 2025–2029", "Gender Equality Plan 2025–2029"), href: `${UP}/2025/03/GEP-INCDVB_2025-2029.pdf` },
        ],
      },
      {
        kind: "docs",
        kicker: r("Referințe europene", "European references"),
        title: r("Carta, Codul și recomandări", "Charter, Code and recommendations"),
        items: [
          { label: r("Carta Europeană a Cercetătorilor și Codul de conduită pentru recrutarea cercetătorilor (2005)", "European Charter for Researchers and Code of Conduct for the Recruitment of Researchers (2005)"), alt: [{ label: "RO", href: `${UP}/2024/01/01_Recomadarea-CE-2005-251-CE_ro.pdf` }, { label: "EN", href: `${UP}/2024/01/02_Recomadarea-CE-2005-251-CE_eng.pdf` }] },
          { label: r("Codul european de conduită pentru integritatea cercetării (ALLEA, 2023)", "The European Code of Conduct for Research Integrity (ALLEA, 2023)"), href: `${UP}/2024/01/09_European-Code-of-Conduct-Revised-Edition_2023.pdf` },
          { label: r("Recomandarea Consiliului privind atragerea și păstrarea talentelor în cercetare și inovare (2023)", "Council Recommendation on attracting and retaining research and innovation talent (2023)"), alt: [{ label: "RO", href: `${UP}/2024/01/10_Recomandarea-CE_OJ_C_2023_1640_RO.pdf` }, { label: "EN", href: `${UP}/2024/01/11_Recommendation-CE-2023-1640_EN.pdf` }] },
          { label: r("CoARA: institutul a semnat Acordul pentru reformarea evaluării cercetării", "CoARA: the institute signed the Agreement on Reforming Research Assessment"), href: "https://coara.eu/about/" },
          { label: r("EURAXESS", "EURAXESS"), href: "https://euraxess.ec.europa.eu/" },
          { label: r("EURAXESS România", "EURAXESS Romania"), href: "https://www.euraxess.gov.ro/ro" },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------ Beyond medicine */
  "dincolo-de-medicina": {
    title: r("Dincolo de Medicină", "Beyond Medicine"),
    lead: r("„Cu Cioran în actualitate”: o serie de volume semnate de Mircea Leabu.", "“With Cioran, today”: a series of volumes by Mircea Leabu."),
    blocks: [
      {
        kind: "list",
        kicker: r("Seria", "The series"),
        title: r("Dincolo de Medicină: șapte volume", "Beyond Medicine: seven volumes"),
        items: [
          r("Vol. 1 – Cioran & tămăduirea disperării", "Vol. 1 – Cioran & tămăduirea disperării"),
          r("Vol. 2 – De la Platon la Cioran – Un salt direct", "Vol. 2 – De la Platon la Cioran – Un salt direct"),
          r("Vol. 3 – Amurg & Aurora la Cioran", "Vol. 3 – Amurg & Aurora la Cioran"),
          r("Vol. 4 – Descompunere sau tentație existențială", "Vol. 4 – Descompunere sau tentație existențială"),
          r("Vol. 5 – Timp, istorie, răutate, utopie în viziune cioraniană", "Vol. 5 – Timp, istorie, răutate, utopie în viziune cioraniană"),
          r("Vol. 6 – Naștere & Sfârtecare", "Vol. 6 – Naștere & Sfârtecare"),
          r("Vol. 7 – Admirație & Afurisenie", "Vol. 7 – Admirație & Afurisenie"),
        ],
      },
      {
        kind: "contact",
        title: r("Mircea Leabu", "Mircea Leabu"),
        lines: [
          { label: r("Website", "Website"), value: "mircea-leabu.ro", href: "https://www.mircea-leabu.ro/" },
          { label: r("Media", "Media"), value: "mircea-leabu.ro/events", href: "https://www.mircea-leabu.ro/events/" },
          { label: r("Email", "Email"), value: "mircea.leabu@ivb.ro", href: "mailto:mircea.leabu@ivb.ro?subject=Dincolo%20de%20Medicin%C4%83" },
        ],
      },
    ],
  },
};
