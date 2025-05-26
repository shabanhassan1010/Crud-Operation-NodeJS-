const express = require("express");
const router = express.Router();
const {GetAllProduct , addProduct} = require("./ProductController");

router.get("/GetAllProduct" , GetAllProduct)
router.post("/addProduct" , addProduct)



module.exports = router;