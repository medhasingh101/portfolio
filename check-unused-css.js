const fs = require('fs');
const css = fs.readFileSync('portfolio.css','utf-8') + '\n' + fs.readFileSync('hero-envelope.css','utf-8');
const classRe = /\.(-?[_a-zA-Z][_a-zA-Z0-9-]*)/g;
const classes = new Set();
let m;
while ((m = classRe.exec(css))) classes.add(m[1]);

const jsFiles = ['portfolio.js','portfolio-render.js','portfolio-stack.js','portfolio-data.js','hero-envelope.js','index.html','projects/netprep.js','projects/bluread.js','solution.html'];
let allJs = '';
for (const f of jsFiles) allJs += fs.readFileSync(f, 'utf-8');

const unused = [];
for (const c of classes) {
  if (!allJs.includes(c)) unused.push(c);
}
console.log('Total classes:', classes.size);
console.log('Possibly unused:', unused.length);
console.log(unused.join('\n'));
