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

## 19.11 17:25 TR değişiklik
- Google captcha'ya düştü (wi=70); sonuçları (37 gid) /tmp/k22g_res.json'a alındı → bir sonraki Yandex partisine eklenecek.
- Google sekmesi (345850203) artık 2. Yandex ajanı: yandex.com.tr/robots.txt, kuyruk durum/yandex_q_k22b.json (google_q_k22[70:], 2132 sorgu), 6–9 sn, durum __Y2 (sha 9cea5bb…, __Y→__Y2 replace ile eval).

## 19.11 19:11 TR — Chrome bağlantısı koptu
- Son bilinen: Y1 (yandex_q_k22) wi≈1751/2194, Y2 (yandex_q_k22b) wi≈47/2132. Bekleyen (yüklenmemiş) sonuçlar sekmelerdeydi, kaybolmuş olabilir.
- Yeniden başlatma: Y1 → __KSTART benzeri: yandex_k22.js f(1700) ; Y2 → yandex_q_k22b f(40). Yüklenen k22 toplam: 156 (y1 42, y2 59, y3 44, a1 11).

- 21.11: k22y4 yüklendi (48). k22 toplam 204. k22y5 dispatch (162 gid/330 img). Y1 k22b wi1120, Y2 wi537/1100.
- 21.11 15:20: k22y5 yüklendi (83). k22 toplam 287. Y1 wi1426 n60, Y2 wi747 n77.
- 21.11 19:10 PC DEĞİŞİMİ: k22y6 (261 gid/464 img) dispatch edildi, incelenmedi.
  Taramadaki son sonuçlar durum/k22_bekleyen.json'a kaydedildi (bekleyen, listeye girmedi).
  Y2 bitti (k22b 0-1100). Y1 k22b wi 2034/2132 → kalan: yandex_q_k22b.json [2034:].
  Yeni PC: yandex.com.tr/robots.txt aç, yandex_k22.js (sha 9cea5bb) k22b ile f(2034) başlat.
  Bitince: bekleyen + yeni sonuçlar → liste_k22.py → k22y7. Sonra son rapor (fotosuz kalanlar).
- k22y6 incelendi: 51 kabul, k22y6.xlsx hazır, ikas yüklendi 19:20 (toast görülmedi, dialog normal kapandı — kontrol et). k22 toplam 338.
- Y1 sekmesi ikas için kullanıldı; Y1 durdu (wi 2034). Kalan k22b[2034:] yeni PC de.
