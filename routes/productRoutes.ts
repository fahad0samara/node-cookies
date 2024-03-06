// productRoutes.ts

import express from 'express';
import * as productController from '../controllers/productController';
import multer from 'multer';

const router = express.Router();
const upload = multer();

// GET all products
router.get("/", productController.getAllProducts);

// GET a single product by ID
router.get("/:id", productController.getProductById);

// POST a new product
router.post("/", upload.single("image"), productController.createProduct);

// PUT update a product by ID
router.put("/:id", productController.updateProductById);

// DELETE a product by ID
router.delete("/:id", productController.deleteProductById);

export default router;
