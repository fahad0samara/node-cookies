import { Request, Response } from "express";
import Product from "../models/productModel";
import { commonUploadOptions, handleCloudinaryUpload } from "./cloudinaryController";
// GET paginated products
// GET paginated products
export const getAllProducts = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;

  try {
    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / pageSize);

    const products = await Product.find()
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    // Remove userIP field from each product
    const sanitizedProducts = products.map(product => {
      const { userIP, ...sanitizedProduct } = product.toObject();
      return sanitizedProduct;
    });

    res.json({
      products: sanitizedProducts,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error('Error fetching products:', error);

    // Include error details in the response
    res.status(500).json({
      error,
      message: 'Internal server error',
    });
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
    res.status(500).json({
      error,
      message: "Internal server error",
    });
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
    const result = await handleCloudinaryUpload(commonUploadOptions, req.file.buffer, res);
    if (!result) {
      return;
    }

    // Extract product data from request body
    const { name, description, price, originalPrice, discountPercentage, flavor, isNewProduct } = req.body;

    // Identify the user based on IP address
  const userIP = req.ip;




    // Create a new Product document with image URL from Cloudinary and user IP address
    const product = new Product({
      name,
      description,
      price,
      image: result,
      originalPrice,
      discountPercentage,
      flavor,
      isNewProduct,
      userIP,
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

// GET products for a specific user
export const getProductsByUser = async (req: Request, res: Response) => {
  try {
    const userIP = req.ip;
    console.log('User IP:', userIP)

    // Find products associated with the user's IP address
    const products = await Product.find({ userIP });

    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      error,
      message: 'Internal server error',
    });
  }
};





// PUT update a product by ID
export const updateProductById = async (req: Request, res: Response) => {
  try {
    const { name, description, price, originalPrice, discountPercentage, isNewProduct, flavor } = req.body;
    let updatedProduct: any;

    if (req.file) {
      // If a new image is provided, upload the image to Cloudinary
      const imageUri = await handleCloudinaryUpload(commonUploadOptions, req.file.buffer, res);
      if (!imageUri) {
        return;
      

      };



      // If image upload is successful, update the product with the new image URL
      updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          name,
          description,
          price,
          image: imageUri,
          originalPrice,
          discountPercentage,
          flavor,
          isNewProduct,
        },
        { new: true }
      );
    } else {
      // If no new image is provided, update the product without changing the existing image
      updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          name,
          description,
          price,
          originalPrice,
          discountPercentage,
          flavor,
          isNewProduct,
        },
        { new: true }
      );
    }

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({
      error,
      message: 'Internal server error',
    });
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
    res.status(500).json({
      error,
      message: "Internal server error",
    });
  }
};
function generateUploadOptions(arg0: string) {
  throw new Error("Function not implemented.");
}

