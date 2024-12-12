const fs = require('fs');
const path = require('path');

// Paths to the JSON files
const exchangePath = path.join(__dirname, 'backend', 'data', 'exchange.json');
const metadataPath = path.join(__dirname, 'backend', 'data', 'metadata.json');
const candlePath = path.join(__dirname, 'backend', 'data', 'candle.json');


// Function to parse JSON
function parseJSON(filePath) {
    try {
        const rawData = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(rawData);
    } catch (error) {
        console.error(`Error parsing ${filePath}:`, error.message);
        return null;
    }
}

// Parse each JSON file
const exchangeData = parseJSON(exchangePath);
const metadataData = parseJSON(metadataPath);
const candleData = parseJSON(candlePath);

// Log the data to understand its structure
console.log('Exchange Data:', exchangeData);
console.log('Metadata Data:', metadataData);
console.log('Candle Data:', candleData);
