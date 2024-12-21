

const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, 'data', 'exchange.json');
const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

console.log(jsonData);
