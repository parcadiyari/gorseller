# Foto v2 – devam notları (7.11.2026)

## Bitenler (ikas'a henüz YÜKLENMEDİ – en sonda toplu yüklenecek)
- foto_v2_toplu1.xlsx (3.572), foto_v2_toplu2.xlsx (3.221), foto_v2_toplu3.xlsx (2.793), foto_v2_febi1.xlsx (1.853)
- Ayrı listeler: foto_v2_ayri_liste.xlsx, _ayri_liste2.xlsx, _ayri_liste3.xlsx, _ayri_liste_febi.xlsx
- Görseller: foto-v2/<toplu>/<gid>.jpg (GitHub Pages)

## Bekleyen
- tara_kalan2.json: RepXpert'te taranacak 17.985 ürün; repxpert_sonuc.json.gz = taranmış 9.410 sonuç.
- RepXpert arama API'si 503 veriyor (kota). Açılınca: RepXpert'e giriş yapılmış sekmede repxpert_kod.js yüklenir,
  kalan liste verilir, __start() ile tarama sürer. Sonra inceleme arayüzü (cdn.myikas.com sekmesi) ile seçim.
- Kullanıcı kararı: muadil marka fotosu (Febi/Oto İsmail) KULLANILMAYACAK, RepXpert beklenecek.
- urunler.csv.gz: ürün tablosu (gid, varyant, isim, marka).
- Excel üretimi: durum/excel_yap.py (kaynak: foto_i_i.xlsx + FOTOSUZLAR.xlsx – kullanıcıdan alınacak).
