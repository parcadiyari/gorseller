import json,sys,os,shutil
b,rv=sys.argv[1],sys.argv[2]
os.makedirs(rv,exist_ok=True)
import pandas as pd
a=pd.read_pickle('/tmp/ana/ana.pkl').drop_duplicates('Ürün Grup ID').set_index('Ürün Grup ID')
o=[];L=[]
lst=[x[0] for x in json.load(open(f'/home/claude/gorseller/foto-v2/{b}_liste.json'))]
for k in lst:
    if not os.path.exists(f'/home/claude/gorseller/foto-v2/{b}/{k}.jpg'): continue
    x=[k];g=k.rsplit('_',1)[0]
    L.append(f'{len(o)}\t{a.at[g,"Marka"]}\t{a.at[g,"İsim"]}'); o.append(b+'/'+x[0])
json.dump(o,open(rv+'/order.json','w'));open(rv+'/isim.tsv','w').write('\n'.join(L)+'\n')
open(rv+'/grid.py','w').write(open('/tmp/rv3/grid.py').read().replace('/tmp/rv3',rv))
open(rv+'/PROMPT.md','w').write(open('/tmp/rv7/PROMPT.md').read().replace('/tmp/rv7',rv))
os.system(f'cd {rv} && python3 grid.py 0 100000')
print(len(o), sorted(int(f[2:-4]) for f in os.listdir(rv) if f.startswith('s_')))
