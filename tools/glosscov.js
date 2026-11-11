// Lists which explainers each scene gets, and scenes with none. Usage: node tools/glosscov.js "$PWD"
global.window = {}; global.localStorage = { getItem(){return null}, setItem(){}, removeItem(){} };
const root=process.argv[2];
for (const f of ['js/engine.js','js/story.js','js/walk.js','js/places.js','data/camps.js','data/quiz.js','data/facts.js','data/glossary.js','data/bulldog/act1.js','data/bulldog/act1-everyday.js','data/bulldog/act1-routes.js','data/bulldog/act1-qt.js','data/bulldog/act1-lobby.js','data/bulldog/act1-walks.js','data/bulldog/act2.js','data/bulldog/act2-later.js','data/bulldog/act3.js','data/bulldog/act3-war.js','data/bulldog/act3-after.js','data/bulldog/fork-mamund.js','data/bulldog/forks.js','data/bulldog/forks2.js','data/bulldog/citizen.js']) require(root+'/'+f);
const TM=window.TM, T=[];
TM.QUIZ.forEach((q,i)=>T.push(['quiz'+i,q.q]));
for (const a of [1,2,3]) for (const sc of TM.ACTS.bulldog[a].scenes){ T.push([sc.id,sc.text||'']); (sc.courses||[]).forEach((c,i)=>T.push([sc.id+'.c'+i,c.text||''])); }
const hit={}; const scenesWith=new Set();
for (const [id,t] of T) for (const g of TM.GLOSS) if (g.re.test(t)) { (hit[g.id]=hit[g.id]||[]).push(id); scenesWith.add(id.split('.')[0]); }
console.log('UNUSED:', TM.GLOSS.filter(g=>!hit[g.id]).map(g=>g.id).join(' '));
console.log(Object.entries(hit).map(([k,v])=>k+':'+v.slice(0,4).join(',')+(v.length>4?'+'+(v.length-4):'')).join('\n'));
console.log('NO GLOSS:', T.filter(([id])=>!id.includes('.c')&&!scenesWith.has(id)).map(x=>x[0]).join(' '));
