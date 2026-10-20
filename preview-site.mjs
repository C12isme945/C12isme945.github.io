import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve(process.argv[2]);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.pdf':'application/pdf'};
const server=http.createServer(async(req,res)=>{
  try{
    let route=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    if(route.endsWith('/')) route+='index.html';
    if(!path.extname(route)) route+='.html';
    const file=path.resolve(root,'.'+route);
    if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
    const data=await readFile(file);
    res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});
    res.end(req.method==='HEAD'?undefined:data);
  }catch{res.writeHead(404).end('Not found');}
});
server.listen(4173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4173/'));
