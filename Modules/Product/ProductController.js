const Product = require("../../DBContext/Models/productModel.js");
const product = require("../../DBContext/Models/productModel.js")

const GetAllProduct = async(req, res) => {
  const getProduct =  await product.find();
  if(getProduct){
    res.status(200).json({Message:getProduct.length ? "Products found" : "No products available",
    count: getProduct.length , data: getProduct })
  }
  res.status(404).json({Message:"Product Is not Found" })
};

const addProduct = async (req, res) => {
    try {
        const { productName, productPrice, productCategory, description } = req.body;

        // Validate required fields
        if (!productName || !productPrice || !productCategory) {
            return res.status(400).json({
                success: false,
                message: "Please provide product name, price, and category"
            });
        }

        // Check if product already exists
        const existingProduct = await product.findOne({ productName });
        if (existingProduct) {
            return res.status(409).json({
                success: false,
                message: "Product with this name already exists"
            });
        }

        // Create new product
        const newProduct = new Product({
            productName,
            productPrice,
            productCategory,
            description: description || "",
            inStock: req.body.inStock || true
        });

        // Save to database
        const savedProduct = await newProduct.save();

        // Return response without sensitive data
        res.status(201).json({
            success: true,
            message: "Product added successfully",
            product: {
                id: savedProduct._id,
                name: savedProduct.productName,
                price: savedProduct.productPrice,
                category: savedProduct.productCategory,
                inStock: savedProduct.inStock,
                description: savedProduct.description,
                createdAt: savedProduct.createdAt
            }
        });

    } catch (error) {
        console.error("Add Product Error:", error);
        
        // Handle validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: "Validation Error",
                error: error.message
            });
        }

        // Handle other errors
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

module.exports = {GetAllProduct , addProduct};
