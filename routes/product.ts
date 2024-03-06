import express, { Request, Response } from "express";
import Product from "../models/productModel";
import multer from 'multer';
//@ts-ignore
const router = express.Router();
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dxeonqtqt",
  api_key: "951973593716222",
  api_secret: "jbw6V4Qlnw-dD153k_Ukz13cjN0",
});
cloudinary.config({
  secure: true,
});

// Configure multer to handle file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// GET all products
router.get("/d", async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET a single product by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
/////////////////////////
// Uploads an image file
/////////////////////////
const uploadImage = async (imagePath: string) => {
  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, options);
    console.log(result);
    return result.public_id;
  } catch (error) {
    console.error(error);
  }
};

// POST a new product

router.post("/", upload.single("file"), async (req, res) => {
  try {
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Upload the image to Cloudinary
    const result = await uploadImage(req.file.path);

    if (!result) {
      return res.status(500).json({ error: "Failed to upload image" });
    }

    // Extract product data from request body
    const { name, description, price, rating } = req.body;

    // Create a new Product document with image URL from Cloudinary
    const product = new Product({
      name,
      description,
      price,
      rating,
      image: result,
    });

    // Save the product to the database
    await product.save();

    // Return the created product in the response
    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      error,
      message: "Internal server error",
    });
  }
});


// PUT update a product by ID
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { name, description, price, rating, image } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, rating, image },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE a product by ID
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(deletedProduct);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/", (req, res) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Product Upload Form</title>
    </head>
    <body>

    <h2>Upload a New Product</h2>

    <form action="/products" method="post" enctype="multipart/form-data">
      <label for="image">Product Image:</label><br>
      <input type="file" id="image" name="image" accept="image/*" required><br>

      <label for="name">Product Name:</label><br>
      <input type="text" id="name" name="name" required><br>

      <label for="description">Product Description:</label><br>
      <textarea id="description" name="description" rows="4" required></textarea><br>

      <label for="price">Product Price:</label><br>
      <input type="number" id="price" name="price" min="0" step="0.01" required><br>

      <label for="rating">Product Rating:</label><br>
      <input type="number" id="rating" name="rating" min="0" max="5" step="0.1" required><br>

      <button type="submit">Upload Product</button>
    </form>

    </body>
    </html>
  `;
  
  res.send(htmlContent);
});

export default router;
