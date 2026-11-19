# Kategorili ürün foto taraması – devir notu (2026-11-19 09:30 TR)

## Durum
- Bing kuyruğu `durum/katli_q.json` (5112 arama) **bitti** (wi=5112). Tarayıcıda yeniden tarama gerekmiyor.
- ikas'a yüklenen: katli1–8 → toplam **220 ürün** (yalnız Görsel URL, fiyatsız 4 sütun xlsx).
- `foto-v2/katli9` işlendi (281 gid / 587 görsel), **inceleme + yükleme bekliyor**.
- `foto-v2/katli10_liste.json` (300 gid / 608 görsel, kuyruğun son kısmı) → foto-isle dispatch edildi, **işlenmesi bekleniyor**.

## Kalan adımlar (katli9, katli10)
1. `git sparse-checkout add foto-v2/katliN`
2. `python3 durum/webtools/hazirla_kt.py katliN /tmp/rvkkN` (gerekirse önce /tmp/katli.pkl'yi kullanıcının `ikas-urunler_10.xlsx` dosyasından yeniden üret)
3. `python3 durum/webtools/newsheets.py katliN /tmp/rvkkN` → n_*.jpg + isim.tsv ile sıkı inceleme
   (ikinci el / gerçek zemin / şema / araba foto / etiket-paket / başka mağaza filigranı / isimle uyuşmayan → RED; küçük parçalar atla)
4. `acc.txt` (kabul indeksleri), `red_A.json` = `{idx:'X'}` (kabul dışı hepsi)
5. `python3 durum/webtools/kabul_kt.py /tmp/rvkkN /home/claude/katliN.xlsx katliN`
6. red gid'leri `durum/katsiz_bing_red.json`'a ekle (anahtardan `katliN/` ve `_k` soyulur, yuklenen hariç)
7. `git mv --sparse foto-v2/katliN_liste.json foto-v2/_arsiv/` → commit/push `[skip ci]`
8. ikas: Ürünler → İçe Aktar → Ürünler → **yalnız Görsel URL** → "1 bilgi seçili" kontrol → dosya yükle.

## Notlar
- liste_k.py BLOCK listesine filigranlı mağazalar eklendi (otoerdem, renaultparca, renpaz, inceler, onuryedekparca …).
- Logo URL (ikas CDN, tercih): https://cdn.myikas.com/images/01c1b3f2-1539-4fce-869f-8ea15967b981/bf369a21-67ec-4af6-b5ff-ba087cde78cf/image_1080.webp
- Kategorisiz tarama notu: `durum/KATSIZ_NOT.md`.
