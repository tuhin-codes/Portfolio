// ── CURSOR ──
const cur=document.getElementById('cur'),cur2=document.getElementById('cur2');
let mx=window.innerWidth/2,my=window.innerHeight/2,rx=mx,ry=my;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px';});
(function animC(){rx+=(mx-rx)*0.1;ry+=(my-ry)*0.1;cur2.style.left=rx+'px';cur2.style.top=ry+'px';requestAnimationFrame(animC);})();
document.querySelectorAll('a,button').forEach(el=>{el.addEventListener('mouseenter',()=>document.body.classList.add('hovering'));el.addEventListener('mouseleave',()=>document.body.classList.remove('hovering'));});
 
// ── SCROLL PROGRESS ──
const prog=document.getElementById('prog');
window.addEventListener('scroll',()=>{const p=window.scrollY/(document.body.scrollHeight-window.innerHeight)*100;prog.style.width=p+'%';});
 
// ── CANVAS PARTICLES ──
const canvas=document.getElementById('canvas');
const ctx=canvas.getContext('2d');
let W=canvas.width=window.innerWidth,H=canvas.height=window.innerHeight;
window.addEventListener('resize',()=>{W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight;});
const PCOUNT=90;
const particles=Array.from({length:PCOUNT},()=>({
  x:Math.random()*W,y:Math.random()*H,
  vx:(Math.random()-0.5)*0.4,vy:(Math.random()-0.5)*0.4,
  r:Math.random()*1.5+0.5,
  life:Math.random()
}));
let pmx=W/2,pmy=H/2;
document.addEventListener('mousemove',e=>{pmx=e.clientX;pmy=e.clientY;});
function drawParticles(){
  ctx.clearRect(0,0,W,H);
  particles.forEach(p=>{
    p.x+=p.vx+(pmx-W/2)*0.00015;
    p.y+=p.vy+(pmy-H/2)*0.00015;
    if(p.x<0)p.x=W;if(p.x>W)p.x=0;
    if(p.y<0)p.y=H;if(p.y>H)p.y=0;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle='rgba(255,85,0,0.35)';
    ctx.fill();
  });
  // connections
  for(let i=0;i<PCOUNT;i++){
    for(let j=i+1;j<PCOUNT;j++){
      const dx=particles[i].x-particles[j].x,dy=particles[i].y-particles[j].y;
      const d=Math.sqrt(dx*dx+dy*dy);
      if(d<120){
        ctx.beginPath();
        ctx.moveTo(particles[i].x,particles[i].y);
        ctx.lineTo(particles[j].x,particles[j].y);
        ctx.strokeStyle=`rgba(139,92,246,${0.12*(1-d/120)})`;
        ctx.lineWidth=0.6;
        ctx.stroke();
      }
    }
  }
  // mouse attractor
  particles.forEach(p=>{
    const dx=pmx-p.x,dy=pmy-p.y,d=Math.sqrt(dx*dx+dy*dy);
    if(d<180){
      ctx.beginPath();
      ctx.moveTo(p.x,p.y);
      ctx.lineTo(pmx,pmy);
      ctx.strokeStyle=`rgba(255,85,0,${0.06*(1-d/180)})`;
      ctx.lineWidth=0.5;
      ctx.stroke();
    }
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();
 
// ── TYPED ──
const roles=['Building Things That Matter','Frontend Developer','Full‑Stack Engineer','Accessibility Advocate'];
let ri=0,ci=0,del=false;
const typedEl=document.getElementById('typed-role');
function type(){
  const cur=roles[ri];
  if(!del){typedEl.textContent=cur.slice(0,++ci);if(ci===cur.length){del=true;setTimeout(type,2200);return;}}
  else{typedEl.textContent=cur.slice(0,--ci);if(ci===0){del=false;ri=(ri+1)%roles.length;}}
  setTimeout(type,del?45:85);
}
setTimeout(type,1800);
 
// ── NAV ACTIVE ──
const sections=document.querySelectorAll('section[id]');
const navAs=document.querySelectorAll('.nav-links a');
const navObs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){navAs.forEach(a=>{a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id);});}});},{threshold:0.4});
sections.forEach(s=>navObs.observe(s));
 
// ── SCROLL REVEAL ──
const revObs=new IntersectionObserver(entries=>{entries.forEach((e,i)=>{if(e.isIntersecting){e.target.classList.add('on');}});},{threshold:0.1});
document.querySelectorAll('.rv').forEach(el=>revObs.observe(el));
 
// ── COUNTER ANIMATION ──
const counterObs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting&&!e.target.dataset.done){e.target.dataset.done=1;const target=+e.target.dataset.count;let n=0;const step=()=>{n++;e.target.textContent=n;if(n<target)setTimeout(step,120);}; step();}});},{threshold:0.5});
document.querySelectorAll('[data-count]').forEach(el=>counterObs.observe(el));
 
// ── 3D CARD TILT ──
document.querySelectorAll('.proj-card').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const r=card.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-0.5;
    const y=(e.clientY-r.top)/r.height-0.5;
    card.style.transform=`perspective(800px) rotateY(${x*10}deg) rotateX(${-y*10}deg) translateY(-6px)`;
    const g=card.querySelector('.card-glow');
    if(g){g.style.left=(e.clientX-r.left-150)+'px';g.style.top=(e.clientY-r.top-150)+'px';}
  });
  card.addEventListener('mouseleave',()=>{card.style.transform='perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0)';});
});
 
// ── MAGNETIC BUTTONS ──
document.querySelectorAll('.mag-btn').forEach(btn=>{
  btn.addEventListener('mousemove',e=>{
    const r=btn.getBoundingClientRect();
    const x=(e.clientX-r.left-r.width/2)*0.25;
    const y=(e.clientY-r.top-r.height/2)*0.25;
    btn.style.transform=`translate(${x}px,${y}px)`;
  });
  btn.addEventListener('mouseleave',()=>{btn.style.transform='translate(0,0)';});
});
 
// ── STACK ICON GLOW FOLLOW ──
document.querySelectorAll('.stack-icon').forEach(icon=>{
  icon.addEventListener('mousemove',e=>{
    const r=icon.getBoundingClientRect();
    const x=e.clientX-r.left,y=e.clientY-r.top;
    const g=icon.querySelector('.si-glow');
    if(g)g.style.background=`radial-gradient(circle at ${x}px ${y}px,rgba(255,85,0,0.15),transparent 70%)`;
  });
});
document.querySelectorAll(".stack-icon").forEach(item => {

const fill = item.querySelector(".sp-fill");
const text = item.querySelector(".sp-text");

const level = item.dataset.level;
const skill = item.dataset.skill;

if (!fill || !text) return;

item.addEventListener("mouseenter", () => {
const safeLevel = level ? level : 0;
const safeSkill = skill ? skill : "Unknown";

fill.style.width = safeLevel + "%";
text.textContent = safeSkill + " • " + safeLevel + "%";
});


item.addEventListener("mouseleave", () => {
fill.style.width = "0%";
});

});

