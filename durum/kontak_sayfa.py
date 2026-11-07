import json,sys,os
from PIL import Image,ImageDraw
src,out=sys.argv[1],sys.argv[2]
fs=sorted(f for f in os.listdir(src) if f.endswith('.jpg'))
json.dump(fs,open(out+'/order.json','w'))
C,R,S=12,8,160
for p in range(0,len(fs),C*R):
  im=Image.new('RGB',(C*S,R*S),'white');d=ImageDraw.Draw(im)
  for k,f in enumerate(fs[p:p+C*R]):
    t=Image.open(os.path.join(src,f)).convert('RGB');t.thumbnail((S-4,S-4))
    x,y=(k%C)*S,(k//C)*S;im.paste(t,(x+2,y+2));d.rectangle([x,y,x+S-1,y+S-1],outline='#aaa');d.text((x+4,y+4),str(p+k),fill='red')
  im.save(f'{out}/s{p//(C*R):03d}.jpg',quality=80)
print(len(fs))
