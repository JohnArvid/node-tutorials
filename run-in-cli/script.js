// node script.js
// above in terminal to run 

const fs = require('fs');
const { stringify } = require('querystring');
const output = fs.readFileSync('data.txt', 'utf-8')
    .trim()
    .split('\n')
    .map(line => line.split('\t'))
    .reduce((acc, line)=>{
        acc[line[0]] = acc[line[0]]||[];
        acc[line[0]].push({
            name: line[1],
            price: line[2],
            quantity: line[3]
        });
        return acc;
    }, {});

console.log('output: ', JSON.stringify(output, null, 2));