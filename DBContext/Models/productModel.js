const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, "Product name is required"],
        minlength: [3, "Product name must be at least 3 characters"],
        maxlength: [50, "Product name cannot exceed 50 characters"]
    },
    productPrice: {
        type: Number,
        required: [true, "Product price is required"],
        min: [0.01, "Price must be at least 0.01"],
    },
    productCategory: {
        type: String,
        required: [true, "Product category is required"],
        enum: {
            values: ["Electronics", "Clothing", "Home", "Books", "Other"],
            message: "Invalid product category"
        }
    },
    inStock: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        maxlength: [500, "Description cannot exceed 500 characters"]
    }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;