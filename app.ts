const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

// Create Express server
const app = express(); 
const port = 3000; 

// Express configuration
app.use(cors()); 
app.use(helmet()); 
app.use(morgan("dev")); 

// Start Express server
app.listen(port, () => {
  // Callback function when server is successfully started
  console.log(`Server started at http://localhost:${port}`);
});

// Export Express app
module.exports = app;
