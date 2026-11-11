import json,sys,os
# Kategorisiz partiler icin: python3 hazirla_k.py <parti> <rvdir>
b,rv=sys.argv[1],sys.argv[2]
os.makedirs(rv,exist_ok=True)
import pandas as pd
R='/home/claude/gorseller/'
W=R+'durum/webtools/'
a=pd.read_pickle('/tmp/ana/ana.pkl').drop_duplicates('Ürün Grup ID').set_index('Ürün Grup ID')
o=[];L=[]
lf=R+f'foto-v2/{b}_liste.json'
if not os.path.exists(lf): lf=R+f'foto-v2/_arsiv/{b}_liste.json'
for k in [x[0] for x in json.load(open(lf))]:
    if not os.path.exists(R+f'foto-v2/{b}/{k}.jpg'): continue
    g=k.rsplit('_',1)[0]
    L.append(f'{len(o)}\t{a.at[g,"Marka"]}\t{a.at[g,"İsim"]}\t{a.at[g,"SKU"]}'); o.append(b+'/'+k)
json.dump(o,open(rv+'/order.json','w'));open(rv+'/isim.tsv','w').write('\n'.join(L)+'\n')
open(rv+'/grid.py','w').write(open(W+'grid.py').read().replace('/tmp/rv10',rv))
p=open(W+'PROMPT_web.md').read().replace('/tmp/rv10',rv)
p+='''
Extra notes for KATSIZ batches: isim.tsv columns are index, brand, name, SKU. Many names (esp. OE-PSA) are squashed Turkish abbreviations
without spaces (e.g. NAMORTSR = amortisor, AYDINLKUMAN, ARSIZDIRPLAK). Use yanlis_urun only when the photo is CLEARLY a different part type;
if the name is unreadable, do not reject for yanlis_urun. The owner insists on CLEAN photo + CORRECT part: when the name is readable
and the photo does not plausibly show that part type, reject yanlis_urun. Watermark / other-shop rules stay STRICT.
'''
open(rv+'/PROMPT.md','w').write(p)
os.system(f'cd {rv} && python3 grid.py 0 100000')
print(len(o), len([f for f in os.listdir(rv) if f.startswith('s_')]),'sayfa')
