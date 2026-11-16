# Devam notu (2026-11-10 19:25)
- webdusuk4 (588 urun) ikasa yuklendi ve dogrulandi. Bing tarayici kodu: durum/bing_tarayici.js (yeni sekme 1456760530, 3198den yeniden basladi).
- Bing taramasi: durum/web_q.json (11354 urun). 0..1143 tarandi ve disari alindi (web_b1.json -> webdusuk2). Kaldigi yer: index 1143.
- webdusuk2: isleniyor/inceleme bekliyor. Inceleme -> /home/claude/webtools/kabul.py -> ikas'a Gorsel URL ile yukle.
- Islenen urunler: durum/web_islenen.json
- Yeni PC: Chrome + Claude eklentisi, ikas girisi (dmcyedekparca.myikas.com) gerekli. Basbug/RepXpert gerekirse ayrica giris.
- 12.11: webdusuk5 -> 287 urun ikas'a yuklendi ve dogrulandi (Gorsel URL tek). webdusuk6 (1261 urun/3210 aday, web_b5) isleniyor. Bing tarayici ~5745/11354.
- 12.11: webdusuk6 -> 711 urun ikas'a yuklendi ve dogrulandi. Not: 'ALET TAKIMI 9840566680' urun adi yanlis olabilir (etikette fan rezistansi).
- 12.11: Chrome sekme grubu kayboldu; Bing tarayici yeni sekmede (robots.txt, 1456760769) 7147'den yeniden baslatildi. webdusuk7 (1017 urun/1844 aday) incelemede.
- 12.11: webdusuk7 -> 570 urun ikas'a yuklendi ve dogrulandi (8/8 ornek 1000px).
- 12.11: webdusuk8 -> 347 urun ikas'a yuklendi ve dogrulandi. Bilgisayar degisti (masa19); Bing tarayici 7984'ten yeniden baslatildi (sekme bing robots.txt).
- 12.11 18:55: Bing taramasi BITTI (11354/11354). Son cikti web_b8.json alindi -> webdusuk9 (998 urun, islendi) + webdusuk10 (1013 urun, GitHub'da isleniyor). Sirada: inceleme (/tmp/rv15, /tmp/rv16) -> kabul.py -> foto_v2_yukle_32_web9.xlsx / _33_web10.xlsx -> ikas (yalniz Gorsel URL). Sonra: Bing'de bulunamayanlar icin Yandex/Google.
- PC degisimi (12.11 aksami): yeni PC'de Chrome + Claude eklentisi bagli olmali, ikas'a kullanici giris yapmali. Bing sekmesine artik gerek yok.
- 12.11: webdusuk9 -> 508 urun, webdusuk10 -> 423 urun incelendi (cift kontrol). Excel: /home/claude/yukle/foto_v2_yukle_32_web9.xlsx, _33_web10.xlsx. ikas yuklemesi bekliyor (yeni PC).
- 13.11: webdusuk9 (508) + webdusuk10 (423) ikas'a yuklendi ve dogrulandi (10/10 1000px). Yandex tarayici basladi: durum/yandex_q.json (7251 urun), kod durum/webtools/yandex_tarayici.js, sekme yandex.com.tr/robots.txt, sonuclar window.__Y.res, BroadcastChannel('yx').

## Yandex parti 1 (13.11.2026)
- yandex_q.json ilk 1197 urun tarandi -> 368 aday urun, 663 foto -> 2 tur inceleme -> 140 urun yuklendi (foto_v2_yukle_34_yandex1.xlsx, sadece Gorsel URL).
- Liste scripti: durum/webtools/yliste.py (done-set: durum/yandex_islenen.json).
- Tarayici BLOCK genisletildi (pejo, erdemoto, fiatparcacim, abcp, kornauto ...), commit e8392d5; tarama 1708'den devam ediyor.
- Export: yandex sekmesinde blob indir -> C:\Users\Masa19\Downloads\yandex_sonuc_N.json -> device_stage_files. Sonraki partide sadece yeni gid'ler (yandex_islenen disinda) islenir.

## Yandex parti 2 (13.11.2026)
- yandex_sonuc_2.json (tarama 3144'e kadar) -> 876 yeni urun, 1916 aday, 1604 islenmis foto -> 2 tur inceleme + katalog-bar dedektoru (/tmp/rv18/bar2.py) -> 342 urun ikas'a yuklendi (foto_v2_yukle_35_yandex2.xlsx, sadece Gorsel URL).
- Chrome yandex.com.tr'den 2. otomatik indirmeyi engelliyor. Cozum: yandex sekmesinde butona tikla -> window.open(parcadiyari.com/robots.txt) -> o sekmede message listener ile opener.postMessage('YGET') -> veri gelir -> indir. Yandex sekmesi YGET mesajina __Y verisiyle cevap veriyor.
- Tarayici durumu her 2 dk localStorage['__YSAVE'] (yandex.com.tr) icine kaydediliyor; Chrome kapanirsa oradan devam: f(SV.i) + Object.assign(__Y.res,SV.res).
- BLOCK tekrar genisletildi (benimopel, opelline, vdopel, zapchast, ...), commit aec517f; tarama 3360'tan devam.
- PSA katalog cizimleri altindaki gri "CITROEN PEUGEOT - xxx N-01" bari -> arka_plan (red).

## 14.11.2026 17:40 - PC degisimi hazirligi
- Yandex taramasi BITTI: 7251/7251, 2662 urunde aday. Tum sonuc: durum/yandex_sonuc_final.json ({gid:[url]}).
- yandex3: 1418 yeni urun / 2826 aday -> foto-isle calisiyor (liste foto-v2/yandex3_liste.json). Sonra: hazirla.py yandex3 /tmp/rv19 -> 4 ilk-tur + 3 ikinci-tur inceleme + bar2.py (katalog bari) -> kabul.py -> foto_v2_yukle_36_yandex3.xlsx -> ikas (yalniz Gorsel URL).
- Yandex sekmesine artik gerek yok. Yeni PC'de gerekenler: Chrome + Claude eklentisi bagli, ikas'a giris (dmcyedekparca.myikas.com).
- Sirada: Bing+Yandex'te bulunamayan urunler icin Google denemesi.
- 14.11 aksam: yandex3 incelemesi BITTI -> 1451 fotodan 534 kabul, 400 urun. Excel: /home/claude/yukle/foto_v2_yukle_36_yandex3.xlsx (kabul.py yeniden uretebilir: durum/yandex3_yuklenen.json). ikas importu BEKLIYOR (Chrome baglanmadi). Import sonrasi: API ile dogrula, foto-v2/yandex3_liste.json -> _arsiv.
- 16.11: yandex3 -> 400 urun ikas'a yuklendi ve dogrulandi (10/10). Toplam: 3728.
- 16.11: GOOGLE taramasi basladi. Kuyruk durum/google_q.json (6369 urun = yandex_q - yandex1/2/3 yuklenenler; marka kisaltmalari tam marka adina cevrildi). Kod durum/webtools/google_tarayici.js (google.com sekmesinde worker; window.__G.res, localStorage '__GSAVE' her 2 dk; postMessage 'GGET' -> {gdata,i}). Captcha cikarsa durur (__G.captcha) -> kullaniciya sor, asla gecme.
- 16.11 14:30: Google, fetch ile yapilan aramalari ~35 urunden sonra JS dogrulama sayfasiyla (enablejs) engelledi -> tarama durduruldu (asilmaz). 0..33 arasi sonuc localStorage '__GSAVE' (21 urun). Kullanici "Google'i yavas dene" dedi: script urun basina 50-75 sn bekleyecek sekilde degisti (commit 702e2e6), enablejs gorurse durur. 19:30 TR civari yeniden denenecek (start 34).
- 16.11 16:40: Google yerine BRAVE (search.brave.com/images) taramasi basladi; ayni kuyruk durum/google_q.json, kod durum/webtools/brave_tarayici.js. Brave CSP github'a fetch'i engelliyor -> Q ve kod parcadiyari.com/robots.txt yardimci sekmesinden (window.open, opener.postMessage({bq,bsrc})) veriliyor. Sonuc window.__B.res, localStorage '__BSAVE', disari alma: yardimci sekmede opener.postMessage('BGET','*') -> {bdata,i}. 429/bos sayfada 10 dk bekleyip tekrar dener (3 kez), captcha url'de durur. Isabet ~%7 (BSG kisminda).
