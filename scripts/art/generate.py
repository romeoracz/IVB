"""Procedural background art for the IVB website.

Generates three families of artwork, all drawn from scratch (no stock photos,
no AI image model), inspired by what the institute's labs look at:

  tissue-he.*     haematoxylin & eosin tissue section, watercolour feel
  network-gold.*  gold line-art of cells and molecular networks on navy
  if-field.*      immunofluorescence microscope field in brand blues

Run:  python3 scripts/art/generate.py   (needs numpy, scipy, pillow)
Output goes to public/art/.
"""
from __future__ import annotations

import math
import os
import random

import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from scipy.spatial import Voronoi, cKDTree

OUT = os.path.join(os.path.dirname(__file__), "..", "..", "public", "art")
os.makedirs(OUT, exist_ok=True)
W, H = 2400, 1500


def save(img: Image.Image, name: str) -> None:
    img = img.convert("RGB")
    img.save(os.path.join(OUT, f"{name}.webp"), quality=82, method=6)
    img.resize((img.width // 2, img.height // 2), Image.LANCZOS).save(
        os.path.join(OUT, f"{name}-sm.webp"), quality=80, method=6
    )
    img.save(os.path.join(OUT, f"{name}.jpg"), quality=84, optimize=True, progressive=True)


def lloyd(points: np.ndarray, iters: int, w: int, h: int) -> np.ndarray:
    """Relax random points so cells look organic but even (like real tissue)."""
    for _ in range(iters):
        gx, gy = np.meshgrid(np.arange(0, w, 6), np.arange(0, h, 6))
        grid = np.c_[gx.ravel(), gy.ravel()]
        _, idx = cKDTree(points).query(grid)
        new = np.zeros_like(points)
        cnt = np.bincount(idx, minlength=len(points))[:, None]
        np.add.at(new, idx, grid)
        mask = cnt[:, 0] > 0
        points[mask] = new[mask] / cnt[mask]
    return points


def noise(w: int, h: int, scale: float, seed: int) -> np.ndarray:
    rng = np.random.default_rng(seed)
    small = rng.random((int(h / scale) + 2, int(w / scale) + 2))
    img = Image.fromarray((small * 255).astype(np.uint8)).resize((w, h), Image.BICUBIC)
    return np.asarray(img, dtype=np.float32) / 255.0


def fbm(w: int, h: int, seed: int) -> np.ndarray:
    total = np.zeros((h, w), np.float32)
    amp, s, norm = 1.0, 260.0, 0.0
    for o in range(5):
        total += amp * noise(w, h, s, seed + o)
        norm += amp
        amp *= 0.5
        s /= 2.0
    return total / norm


# ---------------------------------------------------------------------------
# 1. H&E tissue section, painterly
# ---------------------------------------------------------------------------
def tissue_he(seed: int = 7) -> Image.Image:
    random.seed(seed)
    rng = np.random.default_rng(seed)
    pts = np.vstack([rng.random((1400, 2)) * [W, H], rng.random((500, 2)) * [W * 0.5, H * 0.6] + [W * 0.45, H * 0.1]])
    pts = lloyd(pts, 2, W, H)

    paper = np.array([247, 241, 236], np.float32)
    base = np.ones((H, W, 3), np.float32) * paper
    canvas = Image.fromarray(base.astype(np.uint8)).convert("RGBA")

    # eosin cytoplasm washes per cell, varied pinks
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    vor = Voronoi(np.vstack([pts, [[-W, -H], [3 * W, -H], [-W, 3 * H], [3 * W, 3 * H]]]))
    stroma = fbm(W, H, seed + 11)
    for i, p in enumerate(pts):
        reg = vor.regions[vor.point_region[i]]
        if -1 in reg or not reg:
            continue
        poly = vor.vertices[reg]
        c = poly.mean(axis=0)
        shrink = 0.86 + 0.12 * random.random()
        poly = c + (poly - c) * shrink
        sx, sy = int(min(max(p[0], 0), W - 1)), int(min(max(p[1], 0), H - 1))
        dens = stroma[sy, sx]
        if dens < 0.38:  # lumen / empty space, like a gland opening
            continue
        pink = (
            int(226 - 40 * dens + random.randint(-8, 8)),
            int(150 - 50 * dens + random.randint(-10, 10)),
            int(185 - 25 * dens + random.randint(-8, 8)),
            int(40 + 80 * dens),
        )
        d.polygon([tuple(v) for v in poly], fill=pink)
    soft = layer.filter(ImageFilter.GaussianBlur(5))
    # watercolour edge darkening: pigment pools at the rim of each wash
    a1 = np.asarray(soft, np.float32)
    a2 = np.asarray(layer.filter(ImageFilter.GaussianBlur(14)), np.float32)
    rim = np.clip(a1[..., 3] - a2[..., 3], 0, 255) * 1.6
    a1[..., 3] = np.clip(a1[..., 3] * 0.85 + rim, 0, 255)
    canvas.alpha_composite(Image.fromarray(a1.astype(np.uint8), "RGBA"))

    # haematoxylin nuclei, deep purple, slightly irregular ellipses
    nuc = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    dn = ImageDraw.Draw(nuc)
    for p in pts:
        sx, sy = int(min(max(p[0], 0), W - 1)), int(min(max(p[1], 0), H - 1))
        if stroma[sy, sx] < 0.38:
            continue
        r = 4 + random.random() * 9
        ang = random.random() * math.pi
        el = 0.6 + random.random() * 0.4
        poly = []
        for k in range(18):
            t = k / 18 * 2 * math.pi
            rr = r * (1 + 0.12 * math.sin(3 * t + ang))
            x, y = rr * math.cos(t), rr * el * math.sin(t)
            poly.append((p[0] + x * math.cos(ang) - y * math.sin(ang), p[1] + x * math.sin(ang) + y * math.cos(ang)))
        dn.polygon(poly, fill=(78 + random.randint(-10, 10), 52, 128 + random.randint(-12, 12), random.randint(120, 200)))
    nuc = nuc.filter(ImageFilter.GaussianBlur(2.2))
    canvas.alpha_composite(nuc)

    # watercolour bloom + fibre strands (collagen) for an artistic finish
    fib = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    df = ImageDraw.Draw(fib)
    for _ in range(140):
        x, y = random.random() * W, random.random() * H
        a = random.random() * math.pi
        pts_line = []
        for s in range(60):
            a += (stroma[int(y) % H, int(x) % W] - 0.5) * 0.25
            x += math.cos(a) * 9
            y += math.sin(a) * 9
            pts_line.append((x, y))
        df.line(pts_line, fill=(214, 120, 160, 60), width=2)
    canvas.alpha_composite(fib.filter(ImageFilter.GaussianBlur(1.2)))

    arr = np.asarray(canvas.convert("RGB"), np.float32)
    grain = (noise(W, H, 2, seed + 3) - 0.5) * 10
    tex = (fbm(W, H, seed + 5)[..., None] - 0.5) * 26
    arr = np.clip(arr + grain[..., None] + tex, 0, 255)
    return Image.fromarray(arr.astype(np.uint8))


# ---------------------------------------------------------------------------
# 2. Gold line-art: cells + molecular network on navy
# ---------------------------------------------------------------------------
def network_gold(seed: int = 3) -> Image.Image:
    random.seed(seed)
    rng = np.random.default_rng(seed)
    navy_a = np.array([8, 19, 44], np.float32)
    navy_b = np.array([24, 48, 92], np.float32)
    yy, xx = np.mgrid[0:H, 0:W]
    t = np.clip((xx / W) * 0.7 + (1 - yy / H) * 0.3, 0, 1)[..., None]
    bg = navy_a * (1 - t) + navy_b * t
    glow = np.exp(-(((xx - W * 0.78) / (W * 0.35)) ** 2 + ((yy - H * 0.3) / (H * 0.45)) ** 2))[..., None]
    bg = bg + glow * np.array([30, 40, 70])
    img = Image.fromarray(np.clip(bg, 0, 255).astype(np.uint8)).convert("RGBA")

    lines = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(lines)
    gold = (206, 174, 112)

    # field fades to the left so headline text stays readable
    def alpha_at(x: float) -> int:
        return int(30 + 170 * max(0.0, min(1.0, (x - W * 0.30) / (W * 0.5))))

    # cell outlines (relaxed Voronoi), only on right two thirds
    pts = rng.random((260, 2)) * [W, H]
    pts = lloyd(pts, 3, W, H)
    vor = Voronoi(np.vstack([pts, [[-W, -H], [3 * W, -H], [-W, 3 * H], [3 * W, 3 * H]]]))
    for i, p in enumerate(pts):
        if p[0] < W * 0.28:
            continue
        reg = vor.regions[vor.point_region[i]]
        if -1 in reg or not reg:
            continue
        poly = vor.vertices[reg]
        c = poly.mean(axis=0)
        poly = c + (poly - c) * 0.86
        a = alpha_at(p[0]) // 2
        d.line([tuple(v) for v in poly] + [tuple(poly[0])], fill=gold + (a,), width=2, joint="curve")
        r = 6 + random.random() * 8
        d.ellipse([c[0] - r, c[1] - r, c[0] + r, c[1] + r], outline=gold + (a,), width=2)

    # molecular network: nodes + edges + hexagonal rings
    nodes = rng.random((70, 2)) * [W * 0.62, H] + [W * 0.38, 0]
    tree = cKDTree(nodes)
    for i, n in enumerate(nodes):
        for j in tree.query(n, 4)[1][1:]:
            m = nodes[j]
            a = alpha_at((n[0] + m[0]) / 2)
            d.line([tuple(n), tuple(m)], fill=gold + (a,), width=2)
    for n in nodes:
        a = alpha_at(n[0])
        r = 4 + random.random() * 5
        d.ellipse([n[0] - r, n[1] - r, n[0] + r, n[1] + r], outline=gold + (a,), width=2)
        if random.random() < 0.22:
            R = 22 + random.random() * 14
            hexp = [(n[0] + R * math.cos(k * math.pi / 3), n[1] + R * math.sin(k * math.pi / 3)) for k in range(7)]
            d.line(hexp, fill=gold + (a,), width=2)

    # double helix along the right edge
    cx = W * 0.92
    for s in range(0, H, 6):
        ph = s / 70.0
        x1 = cx + 60 * math.sin(ph)
        x2 = cx + 60 * math.sin(ph + math.pi)
        d.point((x1, s), fill=gold + (170,))
        d.point((x2, s), fill=gold + (170,))
        if s % 36 == 0:
            d.line([(x1, s), (x2, s)], fill=gold + (90,), width=1)

    lines = lines.filter(ImageFilter.GaussianBlur(0.6))
    img.alpha_composite(lines)
    arr = np.asarray(img.convert("RGB"), np.float32)
    arr = np.clip(arr + (noise(W, H, 2, seed) - 0.5)[..., None] * 8, 0, 255)
    return Image.fromarray(arr.astype(np.uint8))


# ---------------------------------------------------------------------------
# 3. Immunofluorescence microscope field
# ---------------------------------------------------------------------------
def if_field(seed: int = 21) -> Image.Image:
    random.seed(seed)
    rng = np.random.default_rng(seed)
    acc = np.zeros((H, W, 3), np.float32)
    pts = rng.random((900, 2)) * [W, H]
    pts = lloyd(pts, 1, W, H) + rng.normal(0, 14, (900, 2))
    dens = fbm(W, H, seed + 2)

    # cytoskeleton filaments (cyan), radiating from each cell
    fil = Image.new("L", (W, H), 0)
    df = ImageDraw.Draw(fil)
    for p in pts:
        if dens[int(p[1]) % H, int(p[0]) % W] < 0.5:
            continue
        for _ in range(16):
            a = random.random() * 2 * math.pi
            x, y = p
            line = [(x, y)]
            L = 30 + random.random() * 50
            for s in range(10):
                a += random.uniform(-0.25, 0.25)
                x += math.cos(a) * L / 10
                y += math.sin(a) * L / 10
                line.append((x, y))
            df.line(line, fill=90, width=2)
    f = np.asarray(fil.filter(ImageFilter.GaussianBlur(1.6)), np.float32) / 255
    acc += f[..., None] * np.array([70, 200, 230])

    # nuclei (DAPI-like blue), soft glow
    nuc = Image.new("L", (W, H), 0)
    dn = ImageDraw.Draw(nuc)
    for p in pts:
        if dens[int(p[1]) % H, int(p[0]) % W] < 0.5:
            continue
        r = 11 + random.random() * 8
        e = 0.7 + random.random() * 0.3
        dn.ellipse([p[0] - r, p[1] - r * e, p[0] + r, p[1] + r * e], fill=230)
    n_sharp = np.asarray(nuc.filter(ImageFilter.GaussianBlur(2)), np.float32) / 255
    n_glow = np.asarray(nuc.filter(ImageFilter.GaussianBlur(14)), np.float32) / 255
    acc += n_sharp[..., None] * np.array([80, 120, 255]) + n_glow[..., None] * np.array([20, 40, 140])

    # a few gold-marked cells (the "signal" a pathologist looks for)
    mark = Image.new("L", (W, H), 0)
    dm = ImageDraw.Draw(mark)
    for p in random.sample(list(pts), 14):
        r = 26
        dm.ellipse([p[0] - r, p[1] - r, p[0] + r, p[1] + r], fill=160)
    m = np.asarray(mark.filter(ImageFilter.GaussianBlur(12)), np.float32) / 255
    acc += m[..., None] * np.array([210, 160, 70])

    base = np.array([4, 10, 26], np.float32)
    out = base + acc
    # circular eyepiece vignette, offset to the right
    yy, xx = np.mgrid[0:H, 0:W]
    rr = np.sqrt(((xx - W * 0.68) / (H * 0.62)) ** 2 + ((yy - H * 0.5) / (H * 0.62)) ** 2)
    vig = np.clip(1.15 - rr ** 3, 0.08, 1)[..., None]
    out = out * vig + (noise(W, H, 2, seed) - 0.5)[..., None] * 6
    return Image.fromarray(np.clip(out, 0, 255).astype(np.uint8))


if __name__ == "__main__":
    save(tissue_he(), "tissue-he")
    save(network_gold(), "network-gold")
    save(if_field(), "if-field")
    print("written to", os.path.abspath(OUT))
