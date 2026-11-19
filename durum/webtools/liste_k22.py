import json,sys,os
from urllib.parse import urlparse
src,name=sys.argv[1],sys.argv[2]
R='/home/claude/gorseller/'
BLOCK=['der-ersatzteile-profi','devosautodemontage','ovoko','webshopapp','proxyparts','shbdn','autoricambiusati','alicdn','drauto','verhoeven','recoautos','ahparts','izap24','boucherit','re-group','procaparts','autodily','dezmembrari','autotech24','drostonderdelen','mechantex','impergom','dtspare','avtonomiya','dgjauto','unluoto','fiatparcacim','gknotoyedekparca','athousakis','scricambiusati','fatoryedek','pejo.com','picclickimg','gpa26','opisto','ovoko','autoricambiservice','a.d-cd.net','avtopro','avto.pro','autoparts24','kupujemprodajem','vrakoviste','valorione','capnor','n7-autopieces','mlstatic','2407.pl','euroauto','dezmembr','bildelsbasen','autodoc.parts','ecooparts','drabalear','breakers','recycl-auto','desguace','idealparts','szrociarnia','deloovi','peugeotcikmacisi','just-car','autopublic','a1allcars','otoerdem','renaultparca','renpaz','inceler','onuryedekparca','renkay','d-stimmer','stimmer','autokey24','carlocksystems','car-lock','efeotomotiv','salimotomotiv','kiloto','teileman','shop4parts','parts77','avtomir','dily','hondenauto']
hp=R+'durum/katsiz_islenen.json'
done=set()
d=json.load(open(src))
L=[];new=[]
for g,us in d.items():
    if g in done: continue
    us=[u for u in us if not any(b in urlparse(u).netloc for b in BLOCK)]
    if not us: continue
    new.append(g)
    for k,u in enumerate(us[:3]): L.append([f'{g}_{k}',u])
json.dump(L,open(R+f'foto-v2/{name}_liste.json','w'))
json.dump(sorted(done|set(new)),open(hp,'w'))
print(len(new),len(L))
