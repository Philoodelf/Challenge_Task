const express = require('express');
const router = express.Router();
const path = require('path');

// Utility to read JSON files
const readJsonFile = (fileName) => {
  const filePath = path.join(__dirname, '../data', fileName);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

// Endpoints
router.get('/:type', (req, res) => {
  const { type } = req.params;
  try {
    const fileName = type === 'exchange' ? 'exchange.json' :
                     type === 'metadata' ? 'metadata.json' :
                     type === 'candle' ? 'candle.json' : null;

    if (!fileName) {
      return res.status(400).json({ message: 'Invalid type' });
    }

    const data = readJsonFile(fileName);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error reading file', error });
  }
});

module.exports = router;
