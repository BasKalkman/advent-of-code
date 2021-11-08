const target = 'CRnCaSiRnBSiRnFArTiBPTiTiBFArPBCaSiThSiRnTiBPBPMgArCaSiRnTiMgArCaSiThCaSiRnFArRnSiRnFArTiTiBFArCaCaSiRnSiThCaCaSiRnMgArFYSiRnFYCaFArSiThCaSiThPBPTiMgArCaPRnSiAlArPBCaCaSiRnFYSiThCaRnFArArCaCaSiRnPBSiRnFArMgYCaCaCaCaSiThCaCaSiAlArCaCaSiRnPBSiAlArBCaCaCaCaSiThCaPBSiThPBPBCaSiRnFYFArSiThCaSiRnFArBCaCaSiRnFYFArSiThCaPBSiThCaSiRnPMgArRnFArPTiBCaPRnFArCaCaCaCaSiRnCaCaSiRnFYFArFArBCaSiThFArThSiThSiRnTiRnPMgArFArCaSiThCaPBCaSiRnBFArCaCaPRnCaCaPMgArSiRnFYFArCaSiThRnPBPMgAr';
const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf8').split('\n');

let part1 = new Set();

for (const line of data) {
    const [input, replacement] = line.split(' => ');

    for (let i = 0; i < target.length; i++) {
        let check = target.substr(i, input.length);
        if (check === input) {
            let newstr = target.substr(0, i) + replacement + target.substr(i + input.length);
            part1.add(newstr);
        }
    }
}
console.log(part1.size);