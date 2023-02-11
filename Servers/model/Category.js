const mongoose = require('mongoose')
const Schema = mongoose.Schema
const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        // unique: true
    },
    subcategories: [{
        type: Schema.Types.ObjectId,
        ref: "Subcategory"
    }]
});


const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;




/*

Concept

relationships between the "Category", "Subcategory", and "Product" collections in your MongoDB database. A Category can have multiple Subcategories, a Subcategory can have multiple Products, and a Product can belong to multiple Subcategories.
*/