const express = require("express");
const router = express.Router();
const CategoryController = require("../controller/Category");

// Create a category
router.post("/", CategoryController.createCategory);

// Get all categories
router.get("/", CategoryController.getCategories);

// Get a single category by id
// router.get("/:id", CategoryController.getCategory);

// Update a category
router.put("/:categoryId", CategoryController.updateCategory);

// Delete a category
router.delete("/:categoryId", CategoryController.deleteCategory);

module.exports = router;