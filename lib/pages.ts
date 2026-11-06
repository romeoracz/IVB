import fs from "node:fs";
import path from "node:path";
import type { Locale } from "@/lib/i18n";
import { NAV } from "@/lib/content/nav";

export type PageRec = {
  slug: string;
  id: number;
  parent: number;
  title: string;
  modified: string;
  source: string;
  lang: "ro" | "en" | "mixed";
  html: string;
  docs: { label: string; href: string }[];
};

const DIR = path.join(process.cwd(), "content", "pages");

/** Pages that were WordPress plumbing (shop, empty builder drafts, the old homepage). */
const HIDDEN = new Set(["elementor-123", "elementor-128", "cos", "finalizare", "magazin", "contul-meu", "ivb-ro-english", "acasa"]);

let cache: PageRec[] | null = null;
export function allPages(): PageRec[] {
  if (cache) return cache;
  cache = fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8")) as PageRec)
    .filter((p) => !HIDDEN.has(p.slug) && (p.html.replace(/<[^>]+>/g, "").trim().length > 0 || p.docs.length > 0 || /<(img|video|iframe)\b/.test(p.html)));
  return cache;
}

export function getPage(slug: string): PageRec | undefined {
  return allPages().find((p) => p.slug === slug);
}

/**
 * Hand-made English translation of an imported Romanian page (content/en/<slug>.html), if any.
 * An optional first line `<!-- title: ... -->` gives the English page title.
 */
export function english(slug: string): { title?: string; html: string } | undefined {
  const f = path.join(process.cwd(), "content", "en", `${slug}.html`);
  if (!fs.existsSync(f)) return undefined;
  const raw = fs.readFileSync(f, "utf8");
  const m = raw.match(/^<!-- title: (.+?) -->\s*/);
  return { title: m?.[1], html: m ? raw.slice(m[0].length) : raw };
}

export function getById(id: number): PageRec | undefined {
  return allPages().find((p) => p.id === id);
}

/** Menu labels double as clean page titles for menu pages. */
const MENU_TITLES: Record<string, Record<Locale, string>> = {};
for (const item of NAV) {
  for (const n of [item, ...(item.children ?? [])]) {
    const m = n.href.match(/^\/\{locale\}\/([^/]+)$/);
    if (m) MENU_TITLES[m[1]] = n.label;
  }
}
const EXTRA_TITLES: Record<string, Record<Locale, string>> = {
  laboratoare: { ro: "Laboratoare", en: "Laboratories" },
  "proiecte-ivb": { ro: "Proiecte", en: "Projects" },
  "elementor-728": { ro: "Proiecte", en: "Projects" },
  "concurs-director-general": { ro: "Concurs pentru funcția de Director General", en: "Competition for the post of Director General" },
  "analize-anatomie-patologica": { ro: "Lista de prețuri", en: "Price list" },
  "legea-544": { ro: "Legea 544", en: "Law 544 (access to public information)" },
  "declaratii-ani": { ro: "Declarații ANI", en: "ANI declarations" },
  "control-intern-managerial": { ro: "Control intern managerial", en: "Internal managerial control" },
  "registrul-de-evidenta-al-rezultatelor-cercetarii": { ro: "Registrul de evidență al rezultatelor cercetării", en: "Register of research results" },
};

export function pageTitle(p: PageRec, locale: Locale): string {
  const t = MENU_TITLES[p.slug] ?? EXTRA_TITLES[p.slug];
  if (t) return t[locale];
  if (locale === "en" && p.lang === "ro") {
    const e = english(p.slug)?.title;
    if (e) return e;
  }
  return p.title.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase());
}

/** Section a page belongs to, for breadcrumbs. */
export function sectionOf(slug: string): { label: Record<Locale, string>; href: string } | null {
  for (const item of NAV) {
    if (item.children?.some((c) => c.href === `/{locale}/${slug}`)) return { label: item.label, href: item.href };
  }
  return null;
}
