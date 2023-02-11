const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    subcategories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subcategory"
    }]
});


const Product = mongoose.model("Product", ProductSchema);


module.exports = Product;