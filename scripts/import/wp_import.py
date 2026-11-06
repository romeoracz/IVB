"""Import the captured ivb.ro WordPress pages into clean, site-ready JSON.

Input : WordPress REST export (pages_*.json, posts_*.json) captured from
        https://www.ivb.ro/wp-json/wp/v2/ on 2026-11-06.
Output: content/pages/<slug>.json  {slug,id,title,modified,source,html,docs}
        content/index.json         list of all pages

The text is NOT changed here. The importer only strips page-builder markup
(Elementor wrappers, inline styles, scripts, decorative icons) and rewrites
links to pages of the old site so they point at the same page on the new site.
Documents and images are served from the copy in public/wp-content/ (mirrored
from ivb.ro on 2026-11-06). The few files the old server no longer serves keep
their original ivb.ro address.

Run: python3 -I scripts/import/wp_import.py <export_dir>
"""
from __future__ import annotations

import glob
import html
import json
import os
import re
import sys
from urllib.parse import unquote, urlparse, parse_qs

from bs4 import BeautifulSoup, Comment, NavigableString, Tag

SRC = sys.argv[1] if len(sys.argv) > 1 else "/mnt/project-files/ivb-content/raw/api"
OUT = os.path.join(os.path.dirname(__file__), "..", "..", "content")

KEEP = {
    "p", "h1", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li", "a", "strong", "b", "em", "i", "u",
    "br", "table", "thead", "tbody", "tr", "td", "th", "img", "figure", "figcaption", "blockquote",
    "sup", "sub", "hr", "iframe", "video", "source",
}
DROP = {"script", "style", "svg", "noscript", "form", "input", "label", "button", "xml", "select", "textarea"}
ATTRS = {"a": {"href"}, "img": {"src", "alt", "width", "height"}, "iframe": {"src", "title"},
         "video": {"src", "controls", "poster"}, "source": {"src", "type"}, "td": {"colspan", "rowspan"}, "th": {"colspan", "rowspan"}}
# Decorative images used as icons/placeholders on the old site.
DECOR = re.compile(r"(female_place|placeholder\.png|male_place|pdf-file|domain-registration|startup\.png|certificate\.png|offer-|arrow|icon)", re.I)
GENERIC = {"detalii", "aici", "here", "ro", "en", "click", "citeste mai mult", "citește mai mult", "read more", "download", "descarca", "descarcă", "pdf", "link"}
DOC_EXT = re.compile(r"\.(pdf|docx?|xlsx?|pptx?|zip|rar|mp3|mp4)(\?|#|$)", re.I)


def load(pattern: str) -> list[dict]:
    items: list[dict] = []
    for f in sorted(glob.glob(os.path.join(SRC, pattern))):
        items += json.load(open(f))
    return items


_pages = load("pages_*.json")
_page_slugs = {p["slug"] for p in _pages}
# Posts only where no page has the same address (the 3 posts are empty duplicates of pages).
pages = _pages + [p for p in load("posts_*.json") if p["slug"] not in _page_slugs]
by_id = {p["id"]: p["slug"] for p in pages}
slugs = {p["slug"] for p in pages}
HOME_SLUG = "elementor-123"
PUBLIC = os.path.join(os.path.dirname(__file__), "..", "..", "public")


def upload(path: str, query: str = "") -> str:
    """Local copy of an old-site upload when we have it, else the ivb.ro address."""
    if os.path.isfile(os.path.join(PUBLIC, unquote(path).lstrip("/"))):
        return path
    return "https://www.ivb.ro" + path + (("?" + query) if query else "")


def map_href(href: str) -> str:
    href = href.strip()
    if not href or href.startswith(("mailto:", "tel:", "#")):
        return href.replace("[at]", "@")
    u = urlparse(href)
    host = (u.netloc or "").lower()
    if host in ("ivb.ro", "www.ivb.ro"):
        if "/wp-content/" in u.path or DOC_EXT.search(u.path):
            return upload(u.path, u.query)
        q = parse_qs(u.query)
        if "page_id" in q:
            try:
                s = by_id.get(int(q["page_id"][0]))
                if s:
                    return "/{locale}/" + s if s != HOME_SLUG else "/{locale}"
            except ValueError:
                pass
        m = re.fullmatch(r"/archives/(\d+)/?", u.path)
        if m and by_id.get(int(m.group(1))):
            return "/{locale}/" + by_id[int(m.group(1))]
        path = unquote(u.path).strip("/ ").split("/")[-1] if u.path.strip("/ ") else ""
        if path == "" :
            return "/{locale}"
        if path in slugs:
            return "/{locale}/" + path
        return "https://www.ivb.ro" + u.path
    return href


def clean(content: str) -> tuple[str, list[dict]]:
    # Word/Outlook paste residue (conditional comments, <xml>, <style>) confuses the parser.
    content = re.sub(r"<!--.*?-->", "", content, flags=re.S)
    content = re.sub(r"<(xml|style|script)\b.*?</\1>", "", content, flags=re.S | re.I)
    content = re.sub(r"</?[a-z]+:[^>]*>", "", content, flags=re.I)  # o:p, w:..., m:...
    soup = BeautifulSoup(content, "html.parser")
    for c in soup.find_all(string=lambda s: isinstance(s, Comment)):
        c.extract()
    for t in soup.find_all(DROP):
        t.decompose()
    # PDF viewer widgets and the password-protected intranet frame become plain links.
    for f in soup.find_all("iframe"):
        src = html.unescape(f.get("src", ""))
        title = f.get("title", "").strip()
        target = None
        if "embedpress" in src and "file=" in src:
            target = map_href(unquote(parse_qs(urlparse(src.split("#")[0]).query)["file"][0]))
        elif "/wp-content/inet" in src:
            target = src
        if target:
            a = soup.new_tag("a", href=target)
            a.string = title or target.rsplit("/", 1)[-1]
            p = soup.new_tag("p")
            p.append(a)
            f.replace_with(p)
    for t in soup.find_all(string=re.compile(r"Powered By EmbedPress", re.I)):
        t.extract()
    docs: list[dict] = []
    for img in soup.find_all("img"):
        src = img.get("src", "")
        if DECOR.search(src):
            img.decompose()
    for t in soup.find_all(["img", "video", "source", "iframe"]):
        if t.get("src"):
            u = urlparse(t["src"])
            if (u.netloc or "").lower() in ("ivb.ro", "www.ivb.ro") and "/wp-content/" in u.path:
                t["src"] = upload(u.path)
    for t in list(soup.find_all(True)):
        if t.name not in KEEP:
            t.unwrap()
            continue
        allowed = ATTRS.get(t.name, set())
        for a in list(t.attrs):
            if a not in allowed:
                del t[a]
        if t.name == "a" and t.get("href"):
            t["href"] = map_href(t["href"])
            if DOC_EXT.search(t["href"]):
                label = t.get_text(" ", strip=True)
                if label.lower().strip(" .:") in GENERIC or len(label) < 4:
                    label = ""
                docs.append({"label": label, "href": t["href"]})
    # drop empty elements (left behind by the page builder)
    changed = True
    while changed:
        changed = False
        for t in soup.find_all(["p", "h1", "h2", "h3", "h4", "h5", "h6", "li", "a", "strong", "em", "b", "span", "figure", "figcaption", "ul", "ol"]):
            if not t.get_text(strip=True) and not t.find(["img", "iframe", "video", "br"]):
                t.decompose()
                changed = True
            elif not t.get_text(strip=True) and t.find("br") and not t.find(["img", "iframe", "video"]):
                t.decompose()
                changed = True
    out = str(soup)
    out = re.sub(r"\s*\n\s*", "\n", out)
    out = out.replace("[at]", "@")
    return out.strip(), docs


os.makedirs(os.path.join(OUT, "pages"), exist_ok=True)
index = []
for p in pages:
    body, docs = clean(p["content"]["rendered"])
    title = html.unescape(p["title"]["rendered"]).strip()
    rec = {
        "slug": p["slug"],
        "id": p["id"],
        "parent": p.get("parent", 0),
        "title": title,
        "modified": p["modified"],
        "source": p["link"],
        "html": body,
        "docs": docs,
    }
    json.dump(rec, open(os.path.join(OUT, "pages", p["slug"] + ".json"), "w"), ensure_ascii=False, indent=0)
    index.append({k: rec[k] for k in ("slug", "id", "parent", "title", "modified", "source")} | {"chars": len(body), "docs": len(docs)})

index.sort(key=lambda r: r["slug"])
json.dump(index, open(os.path.join(OUT, "index.json"), "w"), ensure_ascii=False, indent=1)
print(f"{len(index)} pages written to {os.path.abspath(OUT)}")
