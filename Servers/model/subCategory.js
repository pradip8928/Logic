const mongoose = require('mongoose')
const Schema = mongoose.Schema
const SubcategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: "Product"
    }]



});


const Subcategory = mongoose.model("Subcategory", SubcategorySchema);

module.exports = Subcategory;