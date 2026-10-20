import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
const root=path.resolve(process.argv[2]);
const context={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root,'assets/catalog.js'),'utf8'),context);
const catalog=context.window.siteCatalog;
if(catalog.length!==9||new Set(catalog.map(x=>x.id)).size!==9) throw Error('Catalog IDs/count invalid');
for(const item of catalog){
  for(const target of ['apps/'+item.target,...(item.download?[item.download]:[])]){
    if(!fs.existsSync(path.join(root,target))) throw Error('Missing resource '+target);
  }
}
const pages=['index.html','intro.html','work.html','work/archivelens.html','work/biosmartsense.html','work/chemcompute.html','work/quant-agent.html'];
for(const filename of pages){
  const fullPath=path.join(root,filename);
  const pageDir=path.dirname(fullPath);
  const html=fs.readFileSync(fullPath,'utf8');
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);
  if(new Set(ids).size!==ids.length) throw Error('Duplicate IDs in '+filename);
  for(const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)){
    const target=match[1];
    if(/^(?:#|https?:|data:|mailto:)/.test(target)) continue;
    const local=target.split(/[?#]/)[0];
    if(!local) continue;
    if(!fs.existsSync(path.resolve(pageDir,local))) throw Error('Missing link '+target+' in '+filename);
  }
}
console.log('PASS: 9 unique catalog entries, 7 HTML pages (home, intro, work, 4 case studies), all report/download targets and static links exist, no duplicate page IDs.');
