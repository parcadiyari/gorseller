import json, sys, os, io, time, urllib.request, urllib.error
import numpy as np
from PIL import Image
from scipy import ndimage

LOGO_URL = "https://cdn.myikas.com/images/theme-images/b6da9a3f-864a-43fa-a13b-4906bdf98aae/image_3840.webp"
SRC = "https://digital-assets.tecalliance.services/images/800/{}.jpg"
UA = {"User-Agent": "Mozilla/5.0 parcadiyari-gorsel"}

def get(url, tries=3):
    if url.startswith("/") or (not url.startswith("http") and os.path.exists(url)):
        return open(url,"rb").read()
    if url==LOGO_URL and os.environ.get("LOGO_FILE"):
        return open(os.environ["LOGO_FILE"],"rb").read()
    for i in range(tries):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=20) as r:
                return r.read()
        except urllib.error.HTTPError as e:
            if e.code in (403, 404): raise
            err = e; time.sleep(2 * (i + 1))
        except Exception as e:
            err = e; time.sleep(2 * (i + 1))
    raise err

def load_logo():
    lg = Image.open(io.BytesIO(get(LOGO_URL))).convert("RGBA")
    return lg.crop(lg.getchannel("A").point(lambda a: 255 if a > 8 else 0).getbbox())

def whiten(im):
    a = np.asarray(im.convert("RGB")).astype(np.int16)
    h, w, _ = a.shape
    border = np.concatenate([a[0], a[-1], a[:, 0], a[:, -1]])
    bgc = np.median(border, 0)
    dist = np.abs(a - bgc).max(2)
    g = np.zeros((h, w), np.int16)
    for dy, dx in ((0, 1), (1, 0)):
        d = np.abs(a[dy:, dx:] - a[:h - dy, :w - dx]).max(2)
        g[dy:, dx:] = np.maximum(g[dy:, dx:], d)
        g[:h - dy, :w - dx] = np.maximum(g[:h - dy, :w - dx], d)
    mx, mn = a.max(2), a.min(2)
    cand = (dist < 60) & (g < 12) & ((mx - mn) < 40)
    lab, _ = ndimage.label(cand)
    edge = np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))
    bg = np.isin(lab, edge[edge > 0])
    fg = ~bg
    # kucuk kirintilari at
    lab2, n = ndimage.label(fg)
    if n:
        sizes = ndimage.sum(fg, lab2, range(1, n + 1))
        keep = np.isin(lab2, np.where(sizes >= max(30, fg.sum() * 0.002))[0] + 1)
        fg = keep
    # urun icindeki delikleri doldurma; kenara bagli arka plani beyaza cek
    soft = ndimage.binary_dilation(fg, iterations=1)
    a[~soft] = 255
    return Image.fromarray(a.astype(np.uint8)), fg

def place(im, fg, logo):
    ys, xs = np.where(fg)
    if len(xs) == 0: raise ValueError("bos")
    box = (xs.min(), ys.min(), xs.max() + 1, ys.max() + 1)
    part = im.crop(box)
    S, pad = 1000, 90
    sc = min((S - 2 * pad) / part.width, (S - 2 * pad - 60) / part.height, 2.2)
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

def olc(src):
    a = np.asarray(src.convert("RGB")).astype(np.int16)
    b = np.concatenate([a[0], a[-1], a[:, 0], a[:, -1]])
    kb = float(((b.min(1) > 225) & ((b.max(1) - b.min(1)) < 20)).mean())
    w, fg = whiten(src)
    return [round(kb, 3), round(float(fg.mean()), 3)]

def main(liste, outdir):
    os.makedirs(outdir, exist_ok=True)
    logo = load_logo()
    logo.save(os.path.join(os.path.dirname(liste), "tools", "logo.png"))
    rapor = []
    for gid, sha in json.load(open(liste)):
        out = os.path.join(outdir, gid + ".jpg")
        if os.path.exists(out): continue
        try:
            raw = get(sha if (sha.startswith(("http","/")) or os.path.exists(sha)) else SRC.format(sha))
            if os.environ.get("SAVE_SRC"):
                os.makedirs(os.path.join(outdir, "_src"), exist_ok=True)
                open(os.path.join(outdir, "_src", gid + ".jpg"), "wb").write(raw)
            src = Image.open(io.BytesIO(raw))
            if os.path.basename(liste).startswith('olc'):
                rapor.append([gid, "olc", src.size, olc(src)]); continue
            if max(src.size) < (200 if 'dusuk' in os.path.basename(liste) else 400):
                rapor.append([gid, "dusuk_cozunurluk", src.size]); continue
            if 'rembg' in os.path.basename(liste):
                from rembg import remove, new_session
                global _SESS
                try: _SESS
                except NameError: _SESS = new_session("isnet-general-use")
                rgba = remove(src.convert("RGB"), session=_SESS)
                al = np.asarray(rgba.getchannel("A"))
                fg = al > 128
                lab2, n = ndimage.label(fg)
                if n:
                    sizes = ndimage.sum(fg, lab2, range(1, n + 1))
                    fg = np.isin(lab2, np.where(sizes >= max(30, fg.sum() * 0.01))[0] + 1)
                if fg.sum() < 0.02 * fg.size: raise ValueError("maske_bos")
                wbg = Image.new("RGB", rgba.size, "white"); wbg.paste(rgba, mask=rgba.getchannel("A"))
                w = wbg
            else:
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
