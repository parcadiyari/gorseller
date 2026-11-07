import json,sys,pandas as pd,openpyxl
batch,picked_file,ayri_json,out_ok,out_ayri=sys.argv[1:6]
cols0=['Ürün Grup ID','Varyant ID','İsim','Açıklama','Satış Fiyatı','Marka','Kategoriler','Resim URL','Stok:Ana Depo']
_a=pd.read_excel('/root/.claude/uploads/2eacbbcb-dd5d-554a-8d93-ac73ba6b3755/24b0bd78-foto_i_i.xlsx',dtype=str)[cols0]
_b=pd.read_excel('/mnt/user-data/uploads/FOTOSUZLAR.xlsx',dtype=str)[cols0]
src=pd.concat([_a,_b]).drop_duplicates('Varyant ID')
cols=['Ürün Grup ID','Varyant ID','İsim','Açıklama','Satış Fiyatı','Marka','Kategoriler','Resim URL','Stok:Ana Depo']
ok=json.load(open(picked_file)); ayri=json.load(open(ayri_json))  # ok: list gid; ayri: {gid:reason}
U='https://parcadiyari.github.io/gorseller/foto-v2/%s/%%s.jpg'%batch
s=src[src['Ürün Grup ID'].isin(set(ok))].copy()
s['Resim URL']=s['Ürün Grup ID'].map(lambda g:U%g); s['Kategoriler']=None
wb=openpyxl.Workbook();ws=wb.active;ws.append(cols)
for r in s[cols].itertuples(index=False): ws.append([None if (isinstance(v,float)) else v for v in r])
wb.save(out_ok)
nm=dict(zip(src['Ürün Grup ID'],src['İsim']))
wb=openpyxl.Workbook();ws=wb.active;ws.append(['Ürün Grup ID','İsim','Neden','İşlenmiş görsel'])
for g,why in ayri.items(): ws.append([g,nm.get(g),why[0],why[1]])
wb.save(out_ayri)
print('ok rows',ws.max_row-1, len(s), 'missing', len(set(ok)-set(src['Ürün Grup ID'])))
