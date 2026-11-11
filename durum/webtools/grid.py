import sys,json
from PIL import Image,ImageDraw
o=json.load(open('/tmp/rv10/order.json'))
for st in range(int(sys.argv[1]),int(sys.argv[2]),48):
    fs=o[st:st+48];C=8;S=200;R=(len(fs)+7)//8
    if not fs: break
    W=Image.new('RGB',(C*S,R*S),'white');d=ImageDraw.Draw(W)
    for i,f in enumerate(fs):
        try: im=Image.open(f'/home/claude/gorseller/foto-v2/{f}.jpg').convert('RGB').resize((196,196))
        except Exception: continue
        x,y=(i%C)*S,(i//C)*S;W.paste(im,(x+2,y+2));d.rectangle([x,y,x+S-1,y+S-1],outline='#bbb');d.rectangle([x,y,x+44,y+18],fill='red');d.text((x+3,y+3),str(st+i),fill='white')
    W.save(f'/tmp/rv10/s_{st}.jpg',quality=80)
