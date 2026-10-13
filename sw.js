// Limit Break: hält die App offline startbereit. Neue Versionen kommen, sobald das Gerät online ist.
const C='limit-break-v4';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','apple-touch-icon.png'])).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(self.clients.claim());});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const u=new URL(e.request.url);
  if(u.hostname==='fonts.googleapis.com'||u.hostname==='fonts.gstatic.com'){
    e.respondWith(caches.open(C).then(c=>c.match(e.request).then(r=>r||fetch(e.request).then(n=>{c.put(e.request,n.clone());return n;}))));
    return;
  }
  if(u.origin===location.origin){
    e.respondWith(fetch(e.request).then(n=>{const cp=n.clone();caches.open(C).then(c=>c.put(e.request,cp));return n;})
      .catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match('./'))));
  }
});
