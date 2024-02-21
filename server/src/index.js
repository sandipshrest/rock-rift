const express = require("express");
const userRoute = require("./routes/users");
const categoryRoute = require("./routes/categories");
const productRoute = require("./routes/products");
const cartRoute = require("./routes/carts");
const wishlistRoute = require("./routes/wishlists");
const feedbackRoute = require("./routes/feedbacks");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(userRoute);
app.use(categoryRoute);
app.use(productRoute);
app.use(cartRoute);
app.use(wishlistRoute);
app.use(feedbackRoute);
require("dotenv").config();

const connection = require("./db/connection");
connection();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
