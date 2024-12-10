const fs = require('fs');

// Load the exchange JSON file
const exchangeData = JSON.parse(fs.readFileSync('./exchange.json', 'utf-8'));

// Check if hits exist and is an array
const instruments = exchangeData.hits || [];

// Function to filter data by instrument type
function filterByType(data, type) {
    return data.filter(item => item._source && item._source.type === type);
}

// Example: Filter for different types
const stocks = filterByType(instruments, 'common stock');
const etfs = filterByType(instruments, 'exchange traded fund');
const cryptos = filterByType(instruments, 'cryptocurrency');
const commodities = filterByType(instruments, 'commodity');
const mutualFunds = filterByType(instruments, 'mutual fund');

// Save filtered data to new files
fs.writeFileSync('./stocks.json', JSON.stringify(stocks, null, 2));
fs.writeFileSync('./etfs.json', JSON.stringify(etfs, null, 2));
fs.writeFileSync('./cryptos.json', JSON.stringify(cryptos, null, 2));
fs.writeFileSync('./commodities.json', JSON.stringify(commodities, null, 2));
fs.writeFileSync('./mutualFunds.json', JSON.stringify(mutualFunds, null, 2));

console.log('Data filtered and saved into separate files!');
