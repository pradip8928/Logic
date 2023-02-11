const express = require('express')
const app = express()
require("./config/db")

app.use(express.json());
const category = require("./routes/Category")
const subCategory = require("./routes/subCategory")
const product = require("./routes/product")




app.use("/category", category);
app.use("/subCategory", subCategory);
app.use("/product", product);

const Port = process.env.PORT || 3002

app.listen(Port, () => {
    console.log(`port is running on ${Port}`);
})