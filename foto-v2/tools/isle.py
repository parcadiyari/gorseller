import json, sys, os, io, time, urllib.request
import numpy as np
from PIL import Image
from scipy import ndimage

LOGO_URL = "https://cdn.myikas.com/images/theme-images/b6da9a3f-864a-43fa-a13b-4906bdf98aae/image_3840.webp"
SRC = "https://digital-assets.tecalliance.services/images/800/{}.jpg"
UA = {"User-Agent": "Mozilla/5.0 parcadiyari-gorsel"}

def get(url, tries=3):
    for i in range(tries):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30) as r:
                return r.read()
        except Exception as e:
            err = e; time.sleep(2 * (i + 1))
    raise err

def load_logo():
    lg = Image.open(io.BytesIO(get(LOGO_URL))).convert("RGBA")
    return lg.crop(lg.getchannel("A").point(lambda a: 255 if a > 8 else 0).getbbox())

def whiten(im):
    a = np.asarray(im.convert("RGB")).astype(np.int16)
    mx, mn = a.max(2), a.min(2)
    cand = (mn > 145) & ((mx - mn) < 40)          # acik + dusuk doygunluk
    lab, _ = ndimage.label(cand)
    edge = np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))
    bg = np.isin(lab, edge[edge > 0])
    bg = ndimage.binary_opening(bg, iterations=1)
    a[bg] = 255
    return Image.fromarray(a.astype(np.uint8)), ~bg

def place(im, fg, logo):
    ys, xs = np.where(fg)
    if len(xs) == 0: raise ValueError("bos")
    box = (xs.min(), ys.min(), xs.max() + 1, ys.max() + 1)
    part = im.crop(box)
    S, pad = 1000, 90
    sc = min((S - 2 * pad) / part.width, (S - 2 * pad - 60) / part.height)
    part = part.resize((max(1, round(part.width * sc)), max(1, round(part.height * sc))), Image.LANCZOS)
    can = Image.new("RGB", (S, S), "white")
    can.paste(part, ((S - part.width) // 2, (S - part.height) // 2 - 20))
    can = can.convert("RGBA")
    def lay(w, alpha, pos):
        l = logo.resize((w, round(logo.height * w / logo.width)), Image.LANCZOS)
        l.putalpha(l.getchannel("A").point(lambda v: int(v * alpha)))
        x, y = pos(l)
        can.alpha_composite(l, (x, y))
    lay(620, 0.08, lambda l: ((S - l.width) // 2, (S - l.height) // 2))
    lay(330, 0.90, lambda l: (S - l.width - 28, S - l.height - 24))
    return can.convert("RGB"), sc

def main(liste, outdir):
    os.makedirs(outdir, exist_ok=True)
    logo = load_logo()
    rapor = []
    for gid, sha in json.load(open(liste)):
        out = os.path.join(outdir, gid + ".jpg")
        if os.path.exists(out): continue
        try:
            src = Image.open(io.BytesIO(get(SRC.format(sha))))
            w, fg = whiten(src)
            res, sc = place(w, fg, logo)
            res.save(out, "JPEG", quality=88, optimize=True)
            rapor.append([gid, "ok", src.size, round(sc, 2)])
        except Exception as e:
            rapor.append([gid, "hata", str(e)[:120]])
    json.dump(rapor, open(os.path.join(outdir, "_rapor.json"), "w"), indent=0)
    print(sum(1 for r in rapor if r[1] == "ok"), "/", len(rapor))

if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
