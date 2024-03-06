// productController.ts

import { Request, Response } from "express";
import Product from "../models/productModel";
import { handleCloudinaryUpload } from "./cloudinaryController";

// GET all products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET a single product by ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// POST a new product
export const createProduct = async (req: Request, res: Response) => {
  try {
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Upload the image to Cloudinary
    const result = await handleCloudinaryUpload(req.file.buffer, res);
    if (!result) {
      return;
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
};

// PUT update a product by ID
export const updateProductById = async (req: Request, res: Response) => {
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
};

// DELETE a product by ID
export const deleteProductById = async (req: Request, res: Response) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(deletedProduct);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

