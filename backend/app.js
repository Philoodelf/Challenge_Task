// const express = require('express');
// const task = express();
// const instrumentsRoute = require('./routes/instruments');
// const metadataRoute = require('./routes/metadata');

// // Middleware to parse JSON requests
// task.use(express.json());

// // Routes for handling API requests
// task.use('/api/instruments', instrumentsRoute);
// task.use('/api/metadata', metadataRoute);

// task.listen(5000, () => {
//     console.log("Backend running on http://localhost:5000");
// });

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Routes
const financialRoutes = require('./routes/financialRoutes');
app.use('/api/financial', financialRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
