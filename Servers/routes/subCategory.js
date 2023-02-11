const express = require("express");
const router = express.Router();
const SubcategoryController = require("../controller/subCategory");

// Create a subcategory
router.post("/", SubcategoryController.createSubcategory);

// Get all subcategories
router.get("/", SubcategoryController.getSubcategories);

// Get a single subcategory by id
router.get("/:subcategoryId", SubcategoryController.getSubcategoryById);

// Update a subcategory
router.put("/:subcategoryId", SubcategoryController.updateSubcategory);

// Delete a subcategory
router.delete("/:subcategoryId", SubcategoryController.deleteSubcategory);

module.exports = router;