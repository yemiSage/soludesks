"""
One-off image optimization pass for client/public/assets.

Resizes oversized raster assets down to a sensible max dimension for how large
they're actually rendered on the page (2x retina headroom), then re-saves with
PNG/JPEG optimization. Never upscales. Keeps the original file extension and
path so no component code needs to change.
"""

import os
from PIL import Image

ASSETS_ROOT = os.path.join('client', 'public', 'assets')

# (path-prefix relative to ASSETS_ROOT, max dimension in px). First match wins.
RULES = [
    ('pathways', 160),          # rendered at 42x42
    ('assessment/path', 320),   # rendered at 120x90 in the learning-path list
    ('assessment', 1800),       # full-bleed hero/banner art, up to ~880px wide on screen
    ('courses', 900),           # rendered at ~393-426px wide
    ('hero', 1800),             # full-bleed hero art
    ('business', 1800),         # full-bleed hero art / bento cards
    ('cta', 1200),              # trainer.jpg card image, lines.svg untouched
    ('brand', 400),             # logo, rendered at 140-164px wide
    ('brands', 1000),           # logo strip, rendered at up to 700px wide
    ('auth', 1200),             # auth modal side panel, up to ~540px wide
    ('dashboard', 900),         # dashboard course thumbnails, ~121-320px wide
    ('scholarships/avatars', 300),  # floating hero avatars, rendered ~136px
    ('scholarships', 1200),     # scholarship hero/card art, up to ~730px wide
]

DEFAULT_MAX = 1600


def max_dim_for(rel_path: str) -> int:
    normalized = rel_path.replace('\\', '/')
    for prefix, max_dim in RULES:
        if normalized.startswith(prefix + '/') or normalized == prefix:
            return max_dim
    return DEFAULT_MAX


def optimize(path: str, max_dim: int) -> tuple[int, int]:
    before = os.path.getsize(path)
    with Image.open(path) as im:
        # Some assets are JPEG-encoded bytes saved with a .png extension (common with
        # downloaded stock art). Trust the actual decoded format, not the file
        # extension, or re-saving would blow up a lossy photo into a lossless PNG.
        real_format = im.format
        original_mode = im.mode
        im.thumbnail((max_dim, max_dim), Image.LANCZOS)

        if real_format == 'JPEG':
            if im.mode != 'RGB':
                im = im.convert('RGB')
            im.save(path, format='JPEG', optimize=True, quality=82, progressive=True)
        elif real_format == 'PNG':
            if im.mode not in ('RGBA', 'RGB', 'P', 'LA', 'L'):
                im = im.convert('RGBA' if 'A' in original_mode else 'RGB')
            im.save(path, format='PNG', optimize=True, compress_level=9)
        else:
            return before, before  # unsupported/unknown format, leave untouched
    after = os.path.getsize(path)
    return before, after


def main():
    total_before = 0
    total_after = 0
    rows = []
    for root, _dirs, files in os.walk(ASSETS_ROOT):
        for f in files:
            if not f.lower().endswith(('.png', '.jpg', '.jpeg')):
                continue
            full = os.path.join(root, f)
            rel = os.path.relpath(full, ASSETS_ROOT)
            max_dim = max_dim_for(rel)
            before, after = optimize(full, max_dim)
            total_before += before
            total_after += after
            if before != after:
                rows.append((rel, before, after))

    rows.sort(key=lambda r: r[1] - r[2], reverse=True)
    for rel, before, after in rows:
        pct = 100 * (1 - after / before) if before else 0
        print(f'{rel:55s} {before/1024:8.1f} KB -> {after/1024:8.1f} KB  ({pct:4.1f}% smaller)')

    print(f'\nTotal: {total_before/1024:.1f} KB -> {total_after/1024:.1f} KB '
          f'({100*(1-total_after/total_before):.1f}% smaller)')


if __name__ == '__main__':
    main()
