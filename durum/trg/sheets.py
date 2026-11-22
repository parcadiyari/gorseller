# kullanim: python3 sheets.py trgN /tmp/rvtrgN
import json,sys,os,collections
from PIL import Image,ImageDraw
n,out=sys.argv[1],sys.argv[2];os.makedirs(out,exist_ok=True)
R='/home/claude/gorseller/'
L=json.load(open(R+f'foto-v2/{n}_liste.json'))
rows={p['id']:p for p in json.load(open(R+'durum/trg/rows.json'))}
i2p=json.load(open(R+'durum/trg/img2prod.json'))
K={'triger_kayis':'TK','triger_set':'TS','triger_set_devirdaim':'TSD','triger_rulman':'TR','triger_diger':'TD','triger_zincir':'TZ','v_kayis':'VK','v_set':'VS','v_rulman':'VR'}
tsv=open(out+'/isim.tsv','w');order=[]
for idx,(k,u) in enumerate(L):
    ps=[rows[x] for x in i2p[k]]
    tips=collections.Counter(K[p['tip']] for p in ps); br=collections.Counter(p['brand'] for p in ps)
    tsv.write(f"{idx}\t{k}\t{len(ps)}\t{dict(tips)}\t{dict(br)}\t{ps[0]['name']}\n"); order.append(k)
for st in range(0,len(order),48):
    fs=order[st:st+48];C=8;S=200;Rr=(len(fs)+7)//8
    W=Image.new('RGB',(C*S,Rr*S),'white');d=ImageDraw.Draw(W)
    for i,f in enumerate(fs):
        x,y=(i%C)*S,(i//C)*S
        p=R+f'foto-v2/{n}/{f}.jpg'
        if os.path.exists(p):
            W.paste(Image.open(p).convert('RGB').resize((196,196)),(x+2,y+2))
        else: d.text((x+60,y+90),'YOK',fill='red')
        d.rectangle([x,y,x+S-1,y+S-1],outline='#bbb');d.rectangle([x,y,x+44,y+18],fill='red');d.text((x+3,y+3),str(st+i),fill='white')
        ps=i2p[f];t='/'.join(sorted({K[rows[q]['tip']] for q in ps}))
        d.rectangle([x+46,y,x+S-1,y+18],fill='#003');d.text((x+49,y+3),f"{t} x{len(ps)}",fill='yellow')
    W.save(f'{out}/n_{st//48}.jpg',quality=80)
print(len(order))
