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
