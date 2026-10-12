#!/usr/bin/env python3
"""Build the scroll-scrub hero frame sequence from still photos (Ken Burns + crossfade).
Swap-in for real footage later:  scripts/make-hero-sequence.sh path/to/film.mp4
"""
import os, glob
from PIL import Image

W, H = 1280, 720
IMGS = ["heritage-palace", "villa-pool", "aerial-resort", "suite-interior", "spa", "resort"]
PER, FADE = 25, 9          # frames per photo, crossfade length
OUT = "public/media/frames"
os.makedirs(OUT, exist_ok=True)
for f in glob.glob(f"{OUT}/f_*.webp"):
    try: os.remove(f)
    except OSError: pass  # overwritten below

def cover(im, zoom, pan):
    s = max(W / im.width, H / im.height) * zoom
    w, h = int(im.width * s), int(im.height * s)
    r = im.resize((w, h), Image.LANCZOS)
    x = int((w - W) * (0.5 + pan)); y = (h - H) // 2
    return r.crop((x, y, x + W, y + H))

srcs = [Image.open(f"public/media/placeholder/{n}.jpg").convert("RGB") for n in IMGS]
total = PER * len(srcs)
for n in range(total):
    k, t = divmod(n, PER)
    zoom = lambda tt: 1.0 + 0.10 * (tt / PER)
    direction = 1 if k % 2 == 0 else -1
    base = cover(srcs[k], zoom(t), 0.12 * direction * (t / PER - 0.5))
    if t >= PER - FADE and k + 1 < len(srcs):
        a = (t - (PER - FADE) + 1) / (FADE + 1)
        nxt = cover(srcs[k + 1], zoom(0), 0.0)
        base = Image.blend(base, nxt, a)
    base.save(f"{OUT}/f_{n+1:04d}.webp", quality=70, method=4)
print(total, "frames")
