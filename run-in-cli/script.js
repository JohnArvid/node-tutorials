const fs = require('fs');
const output = fs.readFileSync('data.txt', 'utf-8');


console.log('hello', output);