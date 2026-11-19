# k22 – kullanıcının ikas-urunler_22.xlsx (3551 kategorili fotosuz ürün) – 19.11.2026 11:50 TR
- Hepsi daha önce Bing (katli_q) ile aranmıştı; şimdi Google + Yandex ikinci tur.
- Google: durum/google_q_k22.json (1776 gid / 2202 sorgu), 10–12 sn bekleme, Chrome sekmesi google.com, durum __G.
- Yandex: durum/yandex_q_k22.json (1775 gid / 2194 sorgu), 3.5–6 sn, Chrome sekmesi yandex.com.tr/robots.txt (CSP yok), durum __Y.
- Script: durum/webtools/google_k22.js, yandex_k22.js (sha 7f48cdb… sabit Q URL ile eval).
- Partiler: k22gN (Google), k22yN (Yandex). Liste: liste_k.py; inceleme: hazirla_kt.py yerine /tmp/k22.pkl kullanan sürüm gerekir.
- Kurallar aynı (sıkı). Yükleme sadece Görsel URL. Bulunamayanlar sonda kullanıcıya listelenir (logo kararı kullanıcıda).

## Autodoc ajanı (19.11 17:05 TR)
- Kuyruk: durum/autodoc_q_k22.json (593 yan sanayi ürün; BSG/MAG/INA/PRG/VAL/LUK/FEBI/ELR/BCH/COR/HEL/FAE/DAY/VRN/TRW/SCH/GTS/CAVO; stoklular önde).
- Worker: durum/webtools/autodoc_k22.js — Chrome'da autodoc.co.uk sekmesi (Cloudflare geçildikten sonra), durum __A.
- Görsel URL'leri cdn.autodoc.de/thumb?id=…&m=0 (sorgulu). Çekerken ? & = → __Q__ __A__ __E__ olarak kodlanır; python'da geri çevirip liste_k22.py'ye ver.
- Partiler: k22aN. OE-PSA/OPAR ürünler Autodoc'ta aranmaz (muadil marka fotosu yasak).
