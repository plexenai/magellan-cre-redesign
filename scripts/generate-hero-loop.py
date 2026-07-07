from math import cos, pi, sin
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter


WIDTH = 1280
HEIGHT = 720
FPS = 24
SECONDS = 15
FRAMES = FPS * SECONDS

OUT_DIR = Path("/tmp/magellan-hero-frames")
OUT_DIR.mkdir(parents=True, exist_ok=True)

INK = (23, 32, 42)
PAPER = (246, 241, 232)
BRASS = (176, 138, 60)
SAGE = (111, 129, 120)
WHITE = (255, 255, 255)
TEXT = (75, 83, 91)


def lerp(a, b, t):
    return int(a + (b - a) * t)


def mix(c1, c2, t):
    return tuple(lerp(c1[i], c2[i], t) for i in range(3))


def draw_grid(draw, phase):
    grid_color = (*mix(TEXT, PAPER, 0.45), 42)
    offset = int((phase * 96) % 96)
    for x in range(-96 + offset, WIDTH + 96, 96):
        draw.line([(x, 0), (x + 150, HEIGHT)], fill=grid_color, width=1)
    for y in range(-96 + offset, HEIGHT + 96, 96):
        draw.line([(0, y), (WIDTH, y - 120)], fill=grid_color, width=1)


def draw_parcel(draw, points, fill, outline, width=2):
    draw.polygon(points, fill=fill)
    draw.line(points + [points[0]], fill=outline, width=width, joint="curve")


def draw_buildings(draw, phase):
    pulse = 0.5 + 0.5 * sin(phase * 2 * pi)
    parcels = [
        ([(780, 158), (1118, 132), (1184, 250), (840, 288)], SAGE, 0.20),
        ([(700, 372), (1042, 330), (1148, 474), (770, 536)], BRASS, 0.18),
        ([(514, 244), (700, 226), (752, 344), (550, 374)], SAGE, 0.18),
        ([(970, 525), (1180, 488), (1238, 602), (1016, 650)], SAGE, 0.17),
    ]

    for pts, color, alpha in parcels:
        draw_parcel(
            draw,
            pts,
            (*color, int(255 * (alpha + 0.02 * pulse))),
            (*color, 150),
            2,
        )

    # Strip center blocks
    for i in range(6):
        x = 810 + i * 50
        y = 191 + int(4 * sin(phase * 2 * pi + i))
        draw.rounded_rectangle(
            [x, y, x + 38, y + 58],
            radius=2,
            fill=(*WHITE, 88),
            outline=(*INK, 74),
            width=1,
        )

    # Gas station canopy and convenience store footprint
    draw.rounded_rectangle([804, 414, 1018, 456], radius=8, fill=(*BRASS, 150))
    draw.rounded_rectangle([836, 470, 950, 518], radius=4, fill=(*INK, 172))
    draw.rectangle([786, 456, 796, 516], fill=(*INK, 140))
    draw.rectangle([1014, 456, 1024, 516], fill=(*INK, 140))

    # Bank / lender node
    draw.ellipse([1126, 154, 1188, 216], fill=(*WHITE, 112), outline=(*BRASS, 184), width=3)
    draw.line([(1143, 200), (1171, 200)], fill=(*BRASS, 185), width=3)
    draw.line([(1148, 190), (1166, 190)], fill=(*BRASS, 185), width=3)
    draw.polygon([(1139, 184), (1157, 169), (1175, 184)], fill=(*BRASS, 155))


def draw_routes(draw, phase):
    route_color = (*BRASS, 170)
    route_shadow = (*INK, 42)
    routes = [
        [(410, 570), (628, 430), (828, 420), (1157, 185)],
        [(495, 286), (678, 286), (842, 220), (1157, 185)],
        [(620, 602), (844, 526), (1088, 576)],
    ]
    for route in routes:
        draw.line(route, fill=route_shadow, width=7, joint="curve")
        draw.line(route, fill=route_color, width=3, joint="curve")

    for route_i, route in enumerate(routes):
        seg = route[(route_i + int(phase * 3)) % (len(route) - 1)]
        nxt = route[(route_i + int(phase * 3) + 1) % (len(route) - 1) + 1]
        t = (phase * 3 + route_i * 0.26) % 1
        x = lerp(seg[0], nxt[0], t)
        y = lerp(seg[1], nxt[1], t)
        glow = int(100 + 80 * sin(phase * 2 * pi + route_i))
        draw.ellipse([x - 8, y - 8, x + 8, y + 8], fill=(*BRASS, glow))
        draw.ellipse([x - 3, y - 3, x + 3, y + 3], fill=(*WHITE, 190))


def draw_quiet_left(draw):
    # Keeps text area readable while the right side carries the detailed motion.
    draw.rectangle([0, 0, 625, HEIGHT], fill=(*PAPER, 184))
    draw.rectangle([0, 0, 525, HEIGHT], fill=(*PAPER, 74))
    draw.rectangle([0, 0, 420, HEIGHT], fill=(*PAPER, 56))


for frame in range(FRAMES):
    phase = frame / FRAMES
    base = Image.new("RGBA", (WIDTH, HEIGHT), PAPER + (255,))
    draw = ImageDraw.Draw(base, "RGBA")

    draw.rectangle([0, 0, WIDTH, HEIGHT], fill=(*PAPER, 255))
    draw_grid(draw, phase)
    draw_buildings(draw, phase)
    draw_routes(draw, phase)
    draw_quiet_left(draw)

    # Warm editorial vignette.
    vignette = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    vdraw = ImageDraw.Draw(vignette, "RGBA")
    vdraw.rectangle([0, 0, WIDTH, HEIGHT], fill=(*INK, 28))
    vdraw.ellipse([-350, -280, WIDTH + 420, HEIGHT + 360], fill=(0, 0, 0, 0))
    vignette = vignette.filter(ImageFilter.GaussianBlur(48))
    base = Image.alpha_composite(base, vignette)

    # Soft brass wash that loops with the motion.
    wash = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    wdraw = ImageDraw.Draw(wash, "RGBA")
    cx = int(955 + 42 * cos(phase * 2 * pi))
    cy = int(370 + 26 * sin(phase * 2 * pi))
    wdraw.ellipse([cx - 280, cy - 200, cx + 280, cy + 200], fill=(*BRASS, 26))
    wash = wash.filter(ImageFilter.GaussianBlur(42))
    base = Image.alpha_composite(base, wash)

    base.convert("RGB").save(OUT_DIR / f"frame_{frame:04d}.png", "PNG")

print(OUT_DIR)
