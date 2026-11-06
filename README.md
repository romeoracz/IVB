# ivb.ro redesign

New website for the “Victor Babeș” National Institute of Research and Development in the Field of Pathology and Biomedical Sciences, Bucharest.

- Stack: Next.js 16 (App Router) + Tailwind CSS 4, deployed on Vercel.
- Languages: Romanian (`/ro`) and English (`/en`).
- Fonts: Fraunces (headings), IBM Plex Sans (body), IBM Plex Mono (labels), all from Google Fonts (SIL Open Font License).
- Logo: the building drawing from the institute's logo, in `public/brand/` (navy, white, gold).
- Background art: drawn procedurally by `scripts/art/generate.py` (no stock photos). Run `npm run art` to regenerate.

## Current stage: design concepts

`/ro` lists three homepage directions (A Navy & Gold, B Tissue Atlas, C Microscope). Every link still points at the matching page or document on the live ivb.ro until the full site is built.

## Develop

```bash
npm install
npm run dev
```
