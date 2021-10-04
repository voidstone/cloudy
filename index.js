const { readFileSync, writeFileSync } = require('fs')


const INPUT_FILE = './test.html'
const OUTPUT_FILE = './output.html'


const file = readFileSync(INPUT_FILE, 'utf8')

writeFileSync(OUTPUT_FILE, file);

console.log(file);