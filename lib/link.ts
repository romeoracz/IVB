import type { Locale } from "@/lib/i18n";

/** Resolve "/{locale}/..." content links for the current language. */
export function loc(href: string, locale: Locale): string {
  return href.replace("{locale}", locale);
}

export function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href);
}

/** Props for an <a>: new tab only for links that leave the site. */
export function linkProps(href: string, locale: Locale) {
  const h = loc(href, locale);
  return isExternal(h) ? { href: h, target: "_blank", rel: "noopener" } : { href: h };
}
