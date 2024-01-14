const express = require("express");
const userRoute = require("./routes/users");

const app = express();

app.use(express.json());
app.use(userRoute);

require("dotenv").config();

const connection = require("./db/connection");
connection();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


