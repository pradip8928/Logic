const express = require("express");
const router = express.Router();
const ProductController = require("../controller/product");

// Create a product
router.post("/", ProductController.createProduct);

// Get all products
router.get("/", ProductController.getProducts);

// Get a single product by id
// router.get("/:id", ProductController.getProduct);

// Update a product
router.put("/:id", ProductController.updateProduct);

// Delete a product
router.delete("/:id", ProductController.deleteProduct);

module.exports = router;