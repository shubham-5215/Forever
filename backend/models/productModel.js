import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    date: { type: Date, required: true }, // Updated to Date type
    sizes: { type: [String], required: true }, // Changed to an array of strings (sizes)
    image: { type: [String], required: true }, // Array of image URLs/paths
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    bestseller: { type: Boolean, default: false }, // Default value for bestseller
});

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
