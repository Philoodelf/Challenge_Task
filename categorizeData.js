// const fs = require('fs');
// const path = require('path');

// // File paths
// const exchangePath = path.join(__dirname, 'exchange.json');
// const metadataPath = path.join(__dirname, 'metadata.json');

// // Function to parse JSON
// function parseJSON(filePath) {
//     try {
//         const rawData = fs.readFileSync(filePath, 'utf-8');
//         return JSON.parse(rawData);
//     } catch (error) {
//         console.error(`Error reading file ${filePath}:`, error.message);
//         return null;
//     }
// }

// // Parse the JSON files
// const exchangeData = parseJSON(exchangePath)?.data || [];
// const metadataData = parseJSON(metadataPath)?.data || [];


// // Categorize by type
// function categorizeByType(data, key) {
//     if (!Array.isArray(data)) {
//         console.error('Data is not an array. Check JSON structure.');
//         return {};
//     }

//     const categories = {};
//     data.forEach((item) => {
//         const type = item[key];
//         if (!categories[type]) {
//             categories[type] = [];
//         }
//         categories[type].push(item);
//     });
//     return categories;
// }


// // Assuming 'type' is the key for financial instrument type
// const categorizedExchangeData = categorizeByType(exchangeData, 'type');
// const categorizedMetadataData = categorizeByType(metadataData, 'type');

// // Save categorized data for further analysis
// function saveDataToFile(data, fileName) {
//     const folderPath = path.join(__dirname, 'data-analysis'); // Ensure this path is relative to the `backend` folder
//     const filePath = path.join(folderPath, fileName);

//     console.log("Folder Path:", folderPath);
//     console.log("File Path:", filePath);

//     // Create the folder if it doesn't exist
//     if (!fs.existsSync(folderPath)) {
//         fs.mkdirSync(folderPath, { recursive: true });
//         console.log(`Created folder: ${folderPath}`);
//     }

   

//     // Write the file
//     fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
//     console.log(`Saved data to ${filePath}`);
// }

// const sampleData = {
//     exchange: {
//         stock: [
//             { id: 'AAPL', name: 'Apple Inc.' },
//             { id: 'GOOGL', name: 'Alphabet Inc.' }
//         ],
//         cryptocurrency: [
//             { id: 'BTC', name: 'Bitcoin' },
//             { id: 'ETH', name: 'Ethereum' }
//         ]
//     },
//     metadata: {
//         stock: {
//             AAPL: { marketCap: '2T', sector: 'Technology' },
//             GOOGL: { marketCap: '1.5T', sector: 'Technology' }
//         },
//         cryptocurrency: {
//             BTC: { marketCap: '500B', volume: '30B' },
//             ETH: { marketCap: '200B', volume: '10B' }
//         }
//     }
// };

// // Save categorized data
// saveDataToFile(categorizedExchangeData, 'categorizedExchange.json');
// saveDataToFile(categorizedMetadataData, 'categorizedMetadata.json');


const fs = require('fs');
const path = require('path');

const inputFilePath = path.join(__dirname, 'exchange.json');
const outputFolderPath = path.join(__dirname, 'data-analysis');
const outputFilePath = path.join(outputFolderPath, 'categorizedExchange.json');

function categorizeByType(data) {
    const categorizedData = {};

    data.forEach((item) => {
        const { type } = item;

        if (!categorizedData[type]) {
            categorizedData[type] = [];
        }
        categorizedData[type].push(item);
    });

    return categorizedData;
}

function saveDataToFile(data, filePath) {
    if (!fs.existsSync(outputFolderPath)) {
        fs.mkdirSync(outputFolderPath, { recursive: true });
        console.log(`Created folder: ${outputFolderPath}`);
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Saved data to ${filePath}`);
}

try {
    const rawData = fs.readFileSync(inputFilePath, 'utf8');
    const parsedData = JSON.parse(rawData);

    console.log("Loaded exchange data:", parsedData);

    // Access the array inside hits.hits
    const financialData = parsedData.hits.hits;

    if (!Array.isArray(financialData)) {
        throw new Error("Expected an array in 'hits.hits'");
    }

    const categorizedData = categorizeByType(financialData);

    console.log("Categorized Data:", categorizedData);

    saveDataToFile(categorizedData, outputFilePath);
} catch (error) {
    console.error("Error processing data:", error.message);
}

