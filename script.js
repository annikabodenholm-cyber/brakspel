let level=1,score=0,current={n:1,d:2,w:2};

function gcd(a,b){while(b){[a,b]=[b,a%b]}return Math.abs(a);}
function simplify(n,d){const g=gcd(n,d);return {n:n/g,d:d/g};}

function makeQuestion(){
  const den=2+Math.floor(Math.random()*(level*3+3));
  const num=1+Math.floor(Math.random()*Math.min(den-1,8));
  const whole=1+Math.floor(Math.random()*(level+2));
  const ans=simplify(num*whole,den);
  current={n:ans.n,d:ans.d,w:whole,qn:num,qd:den};
  document.getElementById("question").textContent=
    `${whole} × ${num}/${den} = ?`;
  document.getElementById("answer").value="";
  document.getElementById("feedback").textContent="";
}

function startLevel(l){
  level=l; score=0;
  document.getElementById("score").textContent=score;
  document.getElementById("game").classList.remove("hidden");
  document.getElementById("levelTitle").textContent=`Nivå ${l}`;
  makeQuestion();
}

function normalize(s){return s.replace(/\s+/g," ").trim();}

function checkAnswer(){
  const input=normalize(document.getElementById("answer").value);
  let ok=false;
  const imp=Math.floor(current.n/current.d), rem=current.n%current.d;
  const frac=`${current.n}/${current.d}`;
  const mix= rem===0 ? String(imp) : (imp>0 ? `${imp} ${rem}/${current.d}` : `${rem}/${current.d}`);
  if(input===frac || input===mix) ok=true;
  const fb=document.getElementById("feedback");
  if(ok){
    score++;
    fb.textContent="Rätt!";
    fb.style.color="green";
    document.getElementById("score").textContent=score;
  }else{
    fb.textContent=`Fel. Rätt svar: ${mix}`;
    fb.style.color="crimson";
  }
  setTimeout(makeQuestion,900);
}
