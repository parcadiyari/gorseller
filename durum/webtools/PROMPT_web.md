You are reviewing processed auto-part product photos for an online store (Parçadiyarı). Contact sheets /tmp/rv10/s_<START>.jpg each show up to 48 numbered tiles (red number top-left = global index). Every tile has our PARCADIYARI logo bottom-right and a faint PARCADIYARI center watermark — that is expected and fine.

Index → brand/name: /tmp/rv10/isim.tsv (index, brand, name). Read the relevant lines with sed -n via Bash (e.g. sed -n '1921,1968p' for indices 1920..1967 since line = index+1).
Original full-size file for zooming: /home/claude/gorseller/foto-v2/<path>.jpg where path = element IDX of /tmp/rv10/order.json (python3 -c "import json;print(json.load(open('/tmp/rv10/order.json'))[IDX])").

REJECT a tile with a reason code:
- kirik: broken/garbled, mostly empty, cut-off, unrecognizable
- baska_marka: visible logo/watermark/text of a DIFFERENT brand than the product's brand column (e.g. HERTH+BUSS, PERFECT, FAG, OPTIMAL, febi, Elring, Sachs, BSG on a non-BSG product, store/website watermarks like OTOMAR.com.tr, sprzedajemy). Such marks are often small grey text — when a tile shows any text/logo that isn't the product's own brand, open the original to read it. For brands OE-PSA / IOE-PSA / OPAR / IOE-OPEL / OE-OPEL, original car-maker logos (Peugeot, Citroën, PSA, Opel, GM, Fiat, Mopar, Stellantis) are FINE. Product's own brand logo is fine.
- yanlis_urun: clearly a different part type than the name
- arka_plan: leftover non-white background, frames/borders, screenshot, collage, car photo
- kutu: only packaging without the part
- kullanilmis: used/dirty/scrapyard part photo
- bulanik: very blurry/pixelated
Technical drawings ARE ALLOWED now (do not reject drawings), unless the drawing carries another brand's logo.
Do NOT reject for small size, mild shadows, left/right ambiguity.

Final answer: ONLY a JSON object {global_index: reason}. Also write it to the output file given in your task.

Extra notes for THIS batch: photos come from a web image search (Bing) by the product's part number, from many shops. Be STRICT:
- ANY shop / website watermark or text (e.g. eurofrance24, idealparts, proxyparts, n11, ebay, allegro, phone numbers, URLs) → baska_marka. Product's own brand logo is fine (for OE-PSA/IOE-PSA/OPAR/IOE-OPEL: Peugeot/Citroën/PSA/Opel/GM/Fiat/Mopar/Stellantis logos fine; for BSG: BSG logo fine).
- Used / dirty / scrapyard / on-car parts, hands, workshop tables → add reason kullanilmis.
- Collages of several different photos, screenshots, people → arka_plan.
- Wrong part type vs the name → yanlis_urun (main risk!). Several tiles may belong to the same product (suffix _0/_1/_2 are alternative candidates); judge each independently.
- Small or slightly soft photos are OK (upscaled); reject bulanik only if clearly bad.
Keep ALL your temporary files in your own new folder /tmp/rv10/work_<your part letter>/.
