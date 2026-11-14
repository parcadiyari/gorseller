import json,sys,subprocess
from PIL import Image,ImageDraw
b,rv=sys.argv[1],sys.argv[2]
R='/home/claude/gorseller/'
seen=set()
for f in subprocess.run(['git','-C',R,'ls-tree','--name-only','HEAD','foto-v2/_arsiv/'],capture_output=True,text=True).stdout.split():
    if 'katsiz' in f:
        seen|={u for k,u in json.loads(subprocess.run(['git','-C',R,'show','HEAD:'+f],capture_output=True,text=True).stdout)}
L=dict(json.load(open(R+f'foto-v2/{b}_liste.json')))
o=json.load(open(rv+'/order.json'))
new=[i for i,p in enumerate(o) if L[p.split('/')[1]] not in seen]
json.dump(new,open(rv+'/new.json','w'));print('eski',len(o)-len(new),'yeni',len(new))
for s in range(0,len(new),48):
    ch=new[s:s+48];im=Image.new('RGB',(1600,1200),'white');d=ImageDraw.Draw(im)
    for j,i in enumerate(ch):
        t=Image.open(R+'foto-v2/'+o[i]+'.jpg').convert('RGB');t.thumbnail((198,198))
        x,y=(j%8)*200,(j//8)*200;im.paste(t,(x+1,y+1));d.rectangle([x,y,x+44,y+16],fill='red');d.text((x+3,y+3),str(i),fill='white');d.rectangle([x,y,x+199,y+199],outline='#aaa')
    im.save(f'{rv}/n_{s//48}.jpg',quality=85)
N=[]
for l in open(rv+'/isim.tsv'):
    x=l.rstrip('\n').split('\t')
    if N and (len(x)<3 or not x[0].isdigit()): N[-1][2]+=' '+' '.join(x).strip()
    else: N.append(x)
with open(rv+'/n_isim.txt','w') as f:
    for s in range(0,len(new),48):
        f.write(f'## n_{s//48}\n'+' | '.join(f'{i} {N[i][1]} {N[i][2][:28]}' for i in new[s:s+48])+'\n')
