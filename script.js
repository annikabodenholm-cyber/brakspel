(()=>{"use strict";const TOTAL=30,$=id=>document.getElementById(id);let level=1,i=0,score=0,locked=false,tasks=[];
function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b)[a,b]=[b,a%b];return a||1}function red(n,d){let g=gcd(n,d);return{n:n/g,d:d/g}}function key(r){r=red(r.n,r.d);return r.n+"/"+r.d}
function F(n,d){return `<span class="frac"><span class="num">${n}</span><span class="den">${d}</span></span>`}function V(r){r=red(r.n,r.d);if(r.d===1)return""+r.n;if(r.n>r.d){let w=Math.floor(r.n/r.d),m=r.n%r.d;return m?w+" "+F(m,r.d):""+w}return F(r.n,r.d)}
function T(r){r=red(r.n,r.d);if(r.d===1)return""+r.n;if(r.n>r.d){let w=Math.floor(r.n/r.d),m=r.n%r.d;return m?w+" "+m+"/"+r.d:""+w}return r.n+"/"+r.d}
function pick(a){return a[Math.floor(Math.random()*a.length)]}function ri(a,b){return a+Math.floor(Math.random()*(b-a+1))}
function parse(s){s=s.trim().replace(/\s+/g," ");let m=s.match(/^(\d+)\s+(\d+)\s*\/\s*(\d+)$/);if(m&&+m[3])return red((+m[1])*(+m[3])+(+m[2]),+m[3]);m=s.match(/^(\d+)\s*\/\s*(\d+)$/);if(m&&+m[2])return red(+m[1],+m[2]);if(/^\d+$/.test(s))return{n:+s,d:1};return null}
function proper(){let d=pick([3,4,5,6,7,8,9,10,12]);return red(ri(1,d-1),d)}
function make(){
 let q={story:"",expr:"",solution:"",right:null};
 if(level===1){let w=ri(2,8),a=proper(),first=Math.random()<.5;q.right=red(w*a.n,a.d);q.expr=first?`${w} × ${V(a)}`:`${V(a)} × ${w}`;q.solution=`${w} × ${F(a.n,a.d)} = ${V(q.right)}.`}
 if(level===2){let w=ri(2,8),a=proper();q.right=red(w*a.n,a.d);q.story=pick([
 `En flaska innehåller ${V(a)} liter saft. Du har ${w} lika stora flaskor. Hur många liter saft har du sammanlagt?`,
 `Ett band är ${V(a)} meter långt. Du har ${w} lika långa band. Hur många meter band har du sammanlagt?`,
 `Till en sats behövs ${V(a)} dl mjölk. Du gör ${w} satser. Hur många dl mjölk behövs sammanlagt?`,
 `En låda väger ${V(a)} kg. Hur mycket väger ${w} sådana lådor tillsammans?`,
 `Mira går ${V(a)} kilometer varje varv. Hon går ${w} varv. Hur långt går hon sammanlagt?`
 ]);q.solution=`Beräkningen är ${w} × ${F(a.n,a.d)} = ${V(q.right)}.`}
 if(level===3){let a=proper(),b=proper();q.right=red(a.n*b.n,a.d*b.d);q.expr=`${V(a)} × ${V(b)}`;q.solution=`Multiplicera täljarna och nämnarna: ${F(a.n,a.d)} × ${F(b.n,b.d)} = ${F(a.n*b.n,a.d*b.d)} = ${V(q.right)}.`}
 if(level===4){let a=proper(),b=proper();q.right=red(a.n*b.n,a.d*b.d);q.story=pick([
 `En kanna är fylld till ${V(a)} av sin volym. Av innehållet används ${V(b)}. Hur stor del av hela kannans volym används?`,
 `En sträcka är ${V(a)} kilometer lång. Leo går ${V(b)} av sträckan. Hur många kilometer går han?`,
 `Du har ${V(a)} liter saft. Du använder ${V(b)} av saften. Hur många liter använder du?`,
 `Ett band är ${V(a)} meter långt. Du använder ${V(b)} av bandet. Hur många meter använder du?`,
 `En påse innehåller ${V(a)} kilogram nötter. ${V(b)} av innehållet används. Hur många kilogram nötter används?`
 ]);q.solution=`Du behöver multiplicera: ${F(a.n,a.d)} × ${F(b.n,b.d)} = ${F(a.n*b.n,a.d*b.d)} = ${V(q.right)}.`}
 return q}
function build(){tasks=[];let seen=new Set(),tries=0;while(tasks.length<TOTAL&&tries<1000){tries++;let q=make(),k=q.story+"|"+q.expr;if(!seen.has(k)){seen.add(k);tasks.push(q)}}while(tasks.length<TOTAL)tasks.push(make())}
function start(l){level=+l;i=0;score=0;build();$("menu").classList.add("hidden");$("result").classList.add("hidden");$("game").classList.remove("hidden");render()}
function render(){locked=false;let q=tasks[i];$("progress").textContent=`Uppgift ${i+1} av ${TOTAL} · ${score} rätt`;$("bar").style.width=(i/TOTAL*100)+"%";$("story").innerHTML=q.story;$("question").innerHTML=q.expr;$("instruction").textContent=level===1?"Multiplicera ett heltal och ett bråk.":level===2?"Läs textuppgiften och avgör vilken multiplikation som behövs.":level===3?"Multiplicera de två bråken.":"Läs textuppgiften och avgör vilka två bråk som ska multipliceras.";$("answer").value="";$("answer").disabled=false;$("submit").disabled=false;$("feedback").className="feedback hidden";$("feedback").textContent="";$("solution").innerHTML="";$("next").classList.add("hidden");$("form").classList.remove("hidden");$("answer").focus()}
function fb(c,t){$("feedback").className="feedback "+c;$("feedback").innerHTML=t}
$("form").addEventListener("submit",e=>{e.preventDefault();if(locked)return;let q=tasks[i],p=parse($("answer").value);if(!p){fb("info","Skriv ett heltal, ett bråk som 3/4 eller blandad form som 1 1/2.");return}locked=true;if(key(p)===key(q.right)){score++;fb("ok","✅ Rätt!")}else{fb("bad",`❌ Inte riktigt. Rätt svar är ${V(q.right)}.`);$("solution").innerHTML=q.solution}$("answer").disabled=true;$("submit").disabled=true;$("next").classList.remove("hidden")}
);
$("next").onclick=()=>{if(++i===TOTAL){$("game").classList.add("hidden");$("result").classList.remove("hidden");$("score").textContent=`Du fick ${score} av ${TOTAL} rätt på nivå ${level}.`}else render()};
function home(){$("game").classList.add("hidden");$("result").classList.add("hidden");$("menu").classList.remove("hidden")}
document.querySelectorAll("[data-l]").forEach(b=>b.onclick=()=>start(b.dataset.l));$("back").onclick=home;$("choose").onclick=home;$("retry").onclick=()=>start(level);
})();