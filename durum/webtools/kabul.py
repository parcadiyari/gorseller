import json,sys,glob
import pandas as pd
rv,out,b=sys.argv[1],sys.argv[2],sys.argv[3]
o=json.load(open(rv+'/order.json'));red={}
for f in glob.glob(rv+'/red_*.json'): red.update({int(k):v for k,v in json.load(open(f)).items()})
acc={}
for i,p in enumerate(o):
    if i not in red: acc.setdefault(p.split('/')[1].rsplit('_',1)[0],p)
a=pd.read_pickle('/tmp/ana/ana.pkl');a=a[a['Ürün Grup ID'].isin(acc)].copy()
cols=['Ürün Grup ID','Varyant ID','İsim','Açıklama','Satış Fiyatı','Marka','Kategoriler','Resim URL','Stok:Ana Depo']
a['Resim URL']=a['Ürün Grup ID'].map(lambda g:'https://raw.githubusercontent.com/parcadiyari/gorseller/main/foto-v2/'+acc[g]+'.jpg');a['Kategoriler']=None
a[cols].to_excel(out,index=False)
json.dump({o[k]:v for k,v in red.items()},open(f'/home/claude/gorseller/durum/{b}_red.json','w'))
json.dump(list(acc),open(f'/home/claude/gorseller/durum/{b}_yuklenen.json','w'))
print(len(red),len(acc))
