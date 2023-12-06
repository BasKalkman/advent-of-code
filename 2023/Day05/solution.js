const fs = require('fs');
// const data = fs.readFileSync('./input.txt', 'utf-8');
const data = fs.readFileSync('./test.txt', 'utf-8').split('\n\n');
const [seeds, soil, fertilizer, water, light, temperature, humidity, location] = data;

const makeMap = (input) => {
    const map = input.split('\n').reduce((a, c) => {
        const match = c.match(/\d+/g);
        if (match) {
            const nums = match.map(Number);
            const [source, dest, range] = nums;
            for (let i = 0; i < range; i++) {
                a[source + i] = dest + i;
            }
        }
        return a;
    }, {});
    return map;
};

const soilmap = makeMap(soil);
const fertmap = makeMap(fertilizer);
const watermap = makeMap(water);
const lightmap = makeMap(light);
const tempmap = makeMap(temperature);
const humidmap = makeMap(humidity);
const locmap = makeMap(location);
console.log(soilmap);

const lowestLocNumber = seeds.match(/\d+/g).map((e) => {
    const a = soilmap[e] || e;
    const b = fertmap[a] || a;
    const c = watermap[b] || b;
    const d = lightmap[c] || c;
    const f = tempmap[d] || d;
    const g = humidmap[f] || f;
    const h = locmap[g] || g;
    console.log(e, a, b, c, d, f, g, h);
    return parseInt(h);
});
console.log('Part 1: ', Math.min(...lowestLocNumber));
