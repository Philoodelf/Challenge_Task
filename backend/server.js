

const express = require('express');
const path = require('path');
const app = express();

const cors = require('cors');

// Allow requests from localhost:3000 (frontend)
app.use(cors({
  origin: 'http://localhost:3000', // Specify frontend origin
}));


// Serve categorizedExchange.json
app.get('/api/exchange', (req, res) => {
    const filePath = path.join(__dirname, './data-analysis/categorizedExchange.json');
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Error serving exchange file:', err);
            res.status(500).send('Error reading exchange file');
        }
    });
});

// Serve categorizedMetadata.json
app.get('/api/metadata', (req, res) => {
    const filePath = path.join(__dirname, './data-analysis/categorizedMetadata.json');
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Error serving metadata file:', err);
            res.status(500).send('Error reading metadata file');
        }
    });
});

// Serve categorizedCandle.json
app.get('/api/candle', (req, res) => {
    const filePath = path.join(__dirname, './data-analysis/categorizedCandle.json');
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Error serving candle file:', err);
            res.status(500).send('Error reading candle file');
        }
    });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
