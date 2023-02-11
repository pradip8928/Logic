const Product = require("../model/product");
const Subcategory = require("../model/subCategory");
const Category = require("../model/Category");

exports.createProduct = async(req, res) => {
    const { name, subcategories } = req.body;

    try {
        let product = await Product.findOne({ name });
        if (product) {
            return res.status(400).json({ errors: [{ msg: "Product already exists" }] });
        }

        product = new Product({ name });

        if (subcategories && subcategories.length > 0) {
            // get subcategory objects from the database
            const subcategoryObjects = await Subcategory.find({
                _id: { $in: subcategories }
            });
            console.log(subcategoryObjects);

            // check if all subcategories exists
            if (subcategoryObjects.length !== subcategories.length) {
                return res.status(400).json({ errors: [{ msg: "Invalid subcategory" }] });
            }

            // update product subcategories field with subcategory objects
            product.subcategories = subcategoryObjects;

            // update subcategory products field with product object
            subcategoryObjects.forEach(subcategory => {
                subcategory.products.push(product);
                subcategory.save();
            });
        }

        await product.save();

        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

exports.getProducts = async(req, res) => {
    try {
        const products = await Product.find().populate("subcategories", ["name", "category"]);
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};
exports.updateProduct = async(req, res) => {
    const { name, subcategories } = req.body;

    const productFields = {};
    if (name) productFields.name = name;
    if (subcategories && subcategories.length > 0) productFields.subcategories = subcategories;

    try {
        let product = await Product.findById(req.params.id).populate("subcategories");
        if (!product) {
            return res.status(404).json({ errors: [{ msg: "Product not found" }] });
        }

        if (subcategories) {
            // get subcategory objects from the database
            const subcategoryObjects = await Subcategory.find({
                _id: { $in: subcategories }
            });

            // check if all subcategories exists
            if (subcategoryObjects.length !== subcategories.length) {
                return res.status(400).json({ errors: [{ msg: "Invalid subcategory" }] });
            }

            // remove the product from previous subcategories
            product.subcategories.forEach(subcategory => {
                subcategory.products = subcategory.products.filter(p => p._id.toString() !== product._id.toString());
                subcategory.save();
            });

            // add the product to the new subcategories
            subcategories.forEach(subcategoryId => {
                Subcategory.findById(subcategoryId)
                    .then(subcategory => {
                        subcategory.products.unshift(product._id);
                        subcategory.save();
                    })
                    .catch(err => console.error(err.message));
            });

            product.subcategories = subcategories;
            await product.save();

            res.json(product);
        }


    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
}


exports.deleteProduct = async(req, res) => {
    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        }

        product.subcategories.forEach(subcategory => {
            subcategory.products = subcategory.products.filter(
                p => p._id.toString() !== product._id.toString()
            );
            subcategory.save();
        });

        await product.remove();

        res.json({ msg: "Product removed" });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};