import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { NAV } from "@/lib/content/nav";
import { SHORT_NAME } from "@/lib/content/home";
import { LangSwitch } from "./LangSwitch";

type Tone = "dark" | "light";

function href(h: string, locale: Locale, base: string) {
  return h === "/" ? `/${locale}${base}` : h.replace("{locale}", locale);
}

/**
 * Same menu as ivb.ro today. Improvements: sticky, a proper dropdown for
 * "Despre noi" that also works by keyboard, and a language switch.
 */
export function Header({ locale, tone, base = "" }: { locale: Locale; tone: Tone; base?: string }) {
  const dark = tone === "dark";
  const fg = dark ? "text-white" : "text-ink";
  const sub = dark ? "text-white/70" : "text-ink-soft";
  return (
    <header className={`relative z-30 ${fg}`}>
      <div className="mx-auto flex max-w-[1320px] items-center gap-6 px-4 py-5 sm:px-8">
        <Link href={`/${locale}${base}`} className="flex min-w-0 items-center gap-3" aria-label={SHORT_NAME[locale]}>
          <Image
            src={dark ? "/brand/building-white.png" : "/brand/building-navy.png"}
            alt=""
            width={866}
            height={348}
            priority
            className="h-10 w-auto sm:h-12"
          />
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-[family-name:var(--font-fraunces)] text-[1.05rem] font-semibold">{SHORT_NAME[locale]}</span>
            <span className={`eyebrow !text-[0.62rem] ${sub}`}>{locale === "ro" ? "București" : "Bucharest"}</span>
          </span>
        </Link>

        <nav aria-label={locale === "ro" ? "Meniu principal" : "Main menu"} className="ml-auto hidden xl:block">
          <ul className="flex items-center gap-0.5 whitespace-nowrap text-[0.88rem]">
            {NAV.map((item) => (
              <li key={item.href} className="group relative">
                <a
                  href={href(item.href, locale, base)}
                  className={`block rounded-full px-2.5 py-2 transition-colors ${dark ? "hover:bg-white/10" : "hover:bg-ink/5"}`}
                  {...(item.external ? { target: "_blank", rel: "noopener" } : {})}
                >
                  {item.label[locale]}
                  {item.children && <span aria-hidden className="ml-1 opacity-60">▾</span>}
                </a>
                {item.children && (
                  <div className="invisible absolute left-0 top-full w-[22rem] pt-2 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <ul className="rounded-2xl border border-line bg-paper p-2 text-ink shadow-2xl shadow-navy/20">
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <a href={c.href.replace("{locale}", locale)} className="block rounded-xl px-3 py-2 text-[0.9rem] hover:bg-paper-2">
                            {c.label[locale]}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <LangSwitch locale={locale} className="ml-auto xl:ml-2" />

        {/* Mobile menu: no JavaScript needed */}
        <details className="group xl:hidden">
          <summary
            className={`flex cursor-pointer list-none items-center gap-2 rounded-full border px-4 py-2 text-sm ${dark ? "border-white/30" : "border-ink/20"}`}
          >
            <span className="eyebrow !tracking-[0.18em]">{locale === "ro" ? "Meniu" : "Menu"}</span>
          </summary>
          <div className="absolute inset-x-0 top-full mx-4 mt-2 max-h-[75vh] overflow-auto rounded-2xl border border-line bg-paper p-3 text-ink shadow-2xl">
            <ul>
              {NAV.map((item) => (
                <li key={item.href}>
                  <a href={href(item.href, locale, base)} className="block rounded-xl px-3 py-2.5 font-medium hover:bg-paper-2">
                    {item.label[locale]}
                  </a>
                  {item.children && (
                    <ul className="mb-2 ml-3 border-l border-line pl-3">
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <a href={c.href.replace("{locale}", locale)} className="block rounded-lg px-2 py-1.5 text-sm text-ink-soft hover:bg-paper-2">
                            {c.label[locale]}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </details>
      </div>
    </header>
  );
}
