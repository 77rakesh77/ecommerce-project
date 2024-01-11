const express = require("express")
const app = express()
require('dotenv').config()
require("./src/config/db.config");
const port = process.env.PORT


app.use(express.json())

const userRrouter = require("./src/routes/user.router");
app.use("/", userRrouter);

const adminRouter = require("./src/routes/admin.router")
app.use("/", adminRouter)

const sallerRouter = require("./src/routes/saller.router");
app.use("/", sallerRouter)

const productRouter = require("./src/routes/product.router");
app.use("/", productRouter)

const cartRouter = require("./src/routes/cart.router");
app.use("/", cartRouter)

const searchRouter = require("./src/routes/search.router");
app.use("/", searchRouter)

const orderRouter = require("./src/routes/order.router");
app.use("/", orderRouter);

const discountRouter = require("./src/routes/discount.router");
app.use("/", discountRouter)

const offerRouter = require("./src/routes/offer.router");
app.use("/", offerRouter)


app.listen(port, () => {
    console.log(`server runing in port no ${port}`)
});