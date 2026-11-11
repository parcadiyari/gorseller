# Parçadiyarı – Ürün Fotoğrafı Projesi: Sohbet Özeti (11.11.2026)

## Amaç
ikas mağazasındaki (dmcyedekparca.myikas.com) ürünlere 1000×1000, beyaz zeminli, sağ altta PARCADIYARI logolu ve ortada silik filigranlı ürün fotoğrafı koymak.
Bu sohbet **kategorili** ürünlerle ilgilendi. Yeni sohbet **kategorisiz** ürünlere aynı yöntemle bakacak.

## Değişmez kurallar (kullanıcının talimatları)
- **"HERHANGİ Bİ YERİ BOZMA… SADECE GÖRSEL EKLİYORSUN"** → ikas içe aktarmada SADECE **"Görsel URL"** seçilir ("1 bilgi seçili" görülmeli). Fiyat, stok, kategori, isim vb. ASLA seçilmez.
- **"kesinlikle kendi markasının filigranı olabilir yoksa olmaz"** → Başka marka veya dükkân filigranı / yazısı olan foto reddedilir. OE-PSA / OPAR / IOE-OPEL ürünlerinde Peugeot, Citroën, Fiat, Opel, Mopar gibi araç üreticisi logoları serbesttir.
- Captcha aşılmaz, site engelleri dolanılmaz, şifre girilmez; girişi kullanıcı yapar.
- Kategorilere ve filtre / bakım setlerine dokunulmaz.
- Kullanıcıya **her zaman Türkçe** yazılır.

## Altyapı
- **Repo:** `github.com/parcadiyari/gorseller` (çalışma kopyası `/home/claude/gorseller`).
- **İşleme:** `foto-v2/<parti>_liste.json` dosyası (`[[id, url], ...]`) push edilince GitHub Actions'taki `foto-isle` iş akışı fotoları indirir, beyazlatır, logo ve filigranı ekler.
  - Çıktı: `foto-v2/<parti>/<id>.jpg`.
  - Parti adında `dusuk` geçerse en küçük kenar 200 px, geçmezse 400 px olmalı.
  - Parti adında `rembg` geçerse arka plan yapay zekâyla silinir.
  - Tek bir listeyi elle çalıştırmak için:
    `gh api -X POST repos/parcadiyari/gorseller/actions/workflows/foto-isle.yml/dispatches -f ref=main -f "inputs[liste]=PARTI"`
  - **Önemli:** Push ile tetiklenen iş akışı, `tam` ile başlamayan TÜM listeleri işler. Biten listeleri `foto-v2/_arsiv/` klasörüne taşı. Yoksa her çalışma eskileri de dener ve 100 dakika sınırını aşar.
- **Görsel adresi:** `https://raw.githubusercontent.com/parcadiyari/gorseller/main/foto-v2/<parti>/<id>.jpg`. GitHub Pages artık kullanılmıyor (site çok büyük). ikas bu fotoğrafı kendi sunucusuna kopyalıyor.
- **Araçlar (repoda):** `durum/webtools/`
  - `bing_tarayici.js`: Bing tarayıcısı (aşağıda).
  - `liste.py <web_bN.json> <parti>`: İşlenmiş ürünleri ve engelli siteleri atlar, ürün başına en fazla 3 aday alır, liste dosyasını yazar ve `durum/web_islenen.json` dosyasını günceller.
  - `hazirla.py <parti> <rvdir>`: İşlenen jpg dosyalarından 48'lik kontak sayfaları (`s_*.jpg`), `order.json` ve `isim.tsv` üretir. `grid.py` ve `PROMPT.md` dosyalarını kopyalar; yol bilgileri içinde sabit yazılı, kendine göre düzelt.
  - `PROMPT_web.md`: İnceleme ajanlarına verilen sıkı kurallar. Ret nedenleri: kirik, baska_marka, yanlis_urun, arka_plan, kutu, kullanilmis, bulanik.
  - `kabul.py <rvdir> <cikti.xlsx> <parti>`: `red_*.json` dosyalarını okur, ürün başına reddedilmeyen ilk adayı seçer ve ikas formatında Excel yazar. Kategoriler sütunu boş kalır, Resim URL sütununa raw adres yazılır.
  - Ana ürün tablosu `/tmp/ana/ana.pkl`: ikas dışa aktarımı `Ürünleriniz_05.11.2026-10.13.xlsx` dosyasından üretildi; yeni sohbette yeniden üretmek gerekir. Sütunlar: Ürün Grup ID, Varyant ID, İsim, Marka, Kategoriler, SKU…

## Bing yöntemi (en verimli yol)
1. Chrome'da bir `bing.com/images/search?...` sekmesi aç. Sorgu listesini fetch et (örnek: `durum/web_q.json`, raw.githubusercontent'ten). Satır biçimi: `[gid, "MARKA KOD", normalKod, marka]`.
2. `bing_tarayici.js` kodunu enjekte et: `(fonksiyon)(window.__Q, BASLANGIC)`.
   - Kod, Web Worker içinde `https://www.bing.com/images/async?q=..&count=40&mmasync=1` adresini çağırır. Fetch adresi **mutlak** olmalı; göreli adres worker'da çalışmaz.
   - Bir sonucu tutmak için normal kod; URL, başlık veya kaynak sayfada geçmeli.
   - Kod 8 karakterden kısaysa marka kelimesi de geçmeli.
   - Engelli siteler atlanır, ürün başına en fazla 4 aday alınır.
   - Sorgular arası 2,5–4 saniye bekler, dakikada yaklaşık 15–20 ürün tarar.
   - Durum `window.__W` içinde tutulur: `wi` = sıradaki indeks, `res` = bulunanlar.
3. **Dışarı alma:** Chrome bir sekmeden yalnızca 1 otomatik indirmeye izin veriyor.
   - YENİ bir `https://www.bing.com/robots.txt` sekmesi aç.
   - `BroadcastChannel('webx')` kanalına `{get:1}` gönder, `{txt,i}` yanıtını al ve blob bağlantısıyla `web_bN.json` olarak indir.
   - Sonra tarayıcı sekmesinde `__W.res={}` ile listeyi boşalt.
4. Dosyayı `device_stage_files` ile `C:\Users\YUSUF\Downloads\web_bN.json` yolundan sunucuya al. Dosya `/mnt/user-data/uploads/Downloads/` altına düşer.
5. `liste.py` → push → işleme (yaklaşık 1 saat) → `hazirla.py` → 3 paralel inceleme ajanı (`red_A`, `red_B`, `red_C.json`) → kabul edilenleri gözle kontrol et (jant gibi şüpheli olanları) → `kabul.py` → ikas içe aktarma.
6. **ikas içe aktarma:**
   1. Ürünler sayfasında **İçe Aktar**'a tıkla.
   2. "Ürünler Ad, fiyat, stok" seçeneğini seç.
   3. Yalnızca **Görsel URL** etiketini işaretle; ekranda "1 bilgi seçili" yazmalı.
   4. Diyalogdaki İçe Aktar'a tıkla.
   5. Gizli dosya alanına `file_upload` ile Excel'i yükle.
7. **Doğrulama:** ikas-admin `listProduct(id:{in:[...]}){data{id updatedAt variants{prices{sellPrice} images{imageId}}}}` sorgusunu çalıştır.
   - updatedAt yeni olmalı, fiyatlar aynı kalmalı.
   - Fotoğraf `https://cdn.myikas.com/images/01c1b3f2-1539-4fce-869f-8ea15967b981/<imageId>/image_1080.webp` adresinden yüklenmeli.
- **Kabul oranı:** Bing adaylarının yaklaşık %45'i ret yiyor (dükkân filigranı, yanlış ürün, kullanılmış parça). Ürün bazında ise ~%60–65'i fotoğraf alıyor.

## Bu sohbette yapılanlar (kategorili ürünler)

| Kaynak | ikas'a yüklenen ürün |
|---|---|
| ANA dosya (RepXpert/TecDoc vb.) | 43.754 |
| kaynak2 | 809 |
| kaynakdusuk1 | 946 |
| Başbuğ (bsg2, bsg3) | 482 + 130 |
| Web/Bing pilot | 82 |
| web2 | 261 |
| web3 | 326 |
| webdusuk4 | 588 |

Triger kayışları:
- Toplam 137 kayıtta set fotoğrafı düzeltildi.
- 50 üründe kullanıcının verdiği temsili tek kayış fotoğrafı kullanıldı.

## Devam eden iş (bu sohbette sürüyor)
- **Bing taraması:** Kategorili 11.354 ürünlük `web_q.json` listesi taranıyor; yaklaşık 4.030. sıradaydı.
- **webdusuk5:** 558 ürün / 1.438 aday, işleniyor. Sırada inceleme ve yükleme var.
- Bing bittikten sonra bulunamayan ya da reddedilen ürünler için Yandex/Google denenecek.

## Yeni sohbet (kategorisiz ürünler) için öneriler
- Çakışmayı önlemek için ayrı adlar kullan:
  - parti adı `katsizdusukN`
  - işlenen listesi `durum/katsiz_islenen.json` (liste.py'deki `hp` değişkenini değiştir)
  - BroadcastChannel adı `'katsizx'`
  - indirilen dosya adı `katsiz_bN.json`
- Aynı Chrome'da iki Bing taraması aynı anda çalışırsa istek hızı ikiye katlanır. Yeni taramada bekleme süresini **5–7 saniye** yap. Bing captcha ya da engel gösterirse dur ve kullanıcıya haber ver; aşmaya çalışma.
- Push etmeden önce her zaman `git pull --rebase -X theirs` yap; iki sohbet aynı repoya yazıyor.
- İşlenip yüklenen listeleri hemen `foto-v2/_arsiv/` klasörüne taşı.
- Kategorisiz ürünlerin listesi ikas dışa aktarımından çıkarılır: Kategoriler sütunu boş olanlar. Filtre ve bakım setlerini atla. Fotoğrafı zaten olanları da atla (ikas'ta görseli olan ürünler).
