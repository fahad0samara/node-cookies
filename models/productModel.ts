import mongoose, { Schema, Document } from "mongoose";

// Define the product schema
interface IProduct extends Document {
  name: string;
  image: string;
  description: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  flavor?: string; 
  isNewProduct?: boolean;
  userIP: string;
  userAgent?: string;  
  acceptLanguage?: string;
}

const productSchema: Schema<IProduct> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    originalPrice: {
      type: Number,
    },
    discountPercentage: {
      type: Number,
    },
    flavor: {
      type: String,
    },
    isNewProduct: {
      type: Boolean,
      default: false,
    },
    userIP: {
      type: String,
      required: true,
    },
    userAgent: {
      type: String,
    },
    acceptLanguage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Create the Product model
const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
