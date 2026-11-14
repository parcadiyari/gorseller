# Kategorisiz ürünler – notlar (12.11.2026)
- KULLANICI TALİMATI: Fotoğraflı kategorisiz ürünlerin (≈5.900) mevcut fotoğrafı KULLANILMAZ; bunlar da baştan aranır.
  **Temiz foto (başka marka/dükkân filigranı yok) ve DOĞRU PARÇA olması şart.** Sitede filigransız (PARCADIYARI logosuz) foto kalmamalı.
- Sorgu listesi: durum/katsiz_q.json – sıra: stoklu fotosuz → stoklu fotolu → stoksuz fotosuz (OE-PSA en son) → stoksuz fotolu.
- Tarayıcı: durum/webtools/bing_tarayici_katsiz.js (5–7 sn bekleme, captcha/engel görünce durur). Uygulamadaki dahili tarayıcıda çalışır.
- Araçlar: liste_k.py (işlenen: durum/katsiz_islenen.json), hazirla_k.py, kabul.py. Parti adı: katsizdusukN.
- Fotoğraflı ürünlerde ikas'a "Görsel URL" içe aktarmanın eski fotoğrafı değiştirip değiştirmediği önce 2–3 üründe test edilecek.
- Partiler artık `tamkatsizdusukN` adıyla, `[skip ci]` commit + tek liste dispatch ile işlenir (push çalışması diğer listeleri de işleyip 100 dk sürüyor).
- katsizdusuk1 dersi: saf sayısal EUROREPAR kodları alakasız foto getiriyordu → tarayıcıya marka adı zorunluluğu eklendi, tarama 0'dan yeniden başladı.
  katsizdusuk1: 207 üründen 86'sı kabul (durum/katsizdusuk1_yuklenen.json), kalanlar katsiz_islenen'den çıkarıldı (yeniden aranacak).
- 12.11 09:55: katsizdusuk1 86 ürün ikas'a yüklendi (Chrome, yalnızca Görsel URL), ikas-admin ile 86/86 foto + fiyat aynı doğrulandı. Yükleme Chrome'dan yapılır (kullanıcı orada girişli).
- tamkatsizdusuk2: 457 üründen 175 kabul. Bing'de reddedilenler durum/katsiz_bing_red.json (işlenen sayılır; ileride Yandex/Google ile denenecek).

## PC değişimi devir notu (12.11.2026 19:05)
- Yüklenen partiler: katsizdusuk1 (86), tamkatsizdusuk2 (175), 3 (294), 4 (306), 5 (276) → toplam 1.137 ürün, ikas'ta doğrulandı.
- Bing taraması DURDURULDU: durum/katsiz_q.json listesinde **sıradaki indeks 5213** (0..5212 tarandı).
- Henüz partiye dönüşmemiş ~290 Bing sonucu: durum/katsiz_bekleyen_b6.json → yeni taramanın sonuçlarıyla birleştirip tamkatsizdusuk6 yap.
- Bing'de reddedilenler (Yandex/Google için): durum/katsiz_bing_red.json.
- Yeniden başlatma: dahili tarayıcıda bing.com/images/search sekmesi aç, katsiz_worker.js'i fetch edip Worker olarak başlat (__KSTART(5213, <sha>) fonksiyonu; worker kaynağı durum/webtools/katsiz_worker.js; Q = durum/katsiz_q.json).
- İnceleme: hazirla_k.py → newsheets.py (önceki partilerde görülen URL'leri ayıklar) → gözle inceleme → red_A.json → kabul.py.
- ikas yükleme: Chrome (kullanıcı orada girişli) → Ürünler → İçe Aktar → Ürünler → yalnızca Görsel URL ("1 bilgi seçili") → İçe Aktar → gizli dosya alanına file_upload (dosya /home/claude altında olmalı). Düğmeleri find ile ref üzerinden tıkla (koordinatla değil).

## PC DEĞİŞİMİ – 14.11.2026 17:35 (TR)
- Bing taraması DURDURULDU. Kaldığı yer: katsiz_q.json index **20605**. Yeni PC'de __KSTART(<wi>, sha) ile devam.
- Kaydedilmemiş tarama sonuçları: durum/katsiz_bekleyen_sonuc.json → bunu bir sonraki partiye (tamkatsizdusuk18) ekle (liste_k.py ile).
- Yüklenen toplam: 4904 ürün (parti 1–17 bitti, hepsi ikas'a yüklendi ve doğrulandı).
- Reddedilenler: durum/katsiz_bing_red.json (Yandex/Google denemesi için).
- Not: Kalan sorguların çoğu kodsuz OE-PSA; Bing kabul oranı %32'ye düştü. Kullanıcıya alternatif kaynak/atlamayı sordum.
- Ön eleme aktif (isle.py, kenar beyaz <0.2), işlemde 90 sn zaman aşımı var.
