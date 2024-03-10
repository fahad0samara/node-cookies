const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
import mongoose from "mongoose";
import productRoutes from './routes/productRoutes';


import productRouter from "./routes/product";
// MongoDB connection string with useNewUrlParser option included
const MONGODB_URI =
  "mongodb+srv://fahad0nodejs:fahad@cluster0.d6hnl2v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });



// Create Express server
const app = express(); 
const port = 3000; 


// Express configuration
app.use(cors()); 
app.use(helmet()); 
app.use(morgan("dev")); 
app.use(express.json());

// Start Express server
app.listen(port, () => {
  // Callback function when server is successfully started
  console.log(`Server started at http://localhost:${port}`);
});

app.get('/get-user-ip', (req: { ip: any; }, res: { json: (arg0: { userIP: any; }) => void; }) => {
  const userIP = req.ip

  console.log('User IP:', userIP);
  


  res.json({ userIP });
});

app.use('/products', productRoutes);


// Export Express app
module.exports = app;
