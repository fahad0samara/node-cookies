import mongoose, { Schema, Document } from "mongoose";

// Define the product schema
interface IProduct extends Document {
  name: string;
  image: string;
  description: string;
  price: string;
  rating: string;
}

const productSchema: Schema<IProduct> = new mongoose.Schema({
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
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
});

// Create the Product model
const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
