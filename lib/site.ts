/** Public address of the site. Set NEXT_PUBLIC_SITE_URL on Vercel when the real domain is connected. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://ivb.vercel.app").replace(/\/$/, "");

/** Concept stage: keep search engines out until launch. Set NEXT_PUBLIC_INDEX=1 at launch. */
export const INDEXABLE = process.env.NEXT_PUBLIC_INDEX === "1";
