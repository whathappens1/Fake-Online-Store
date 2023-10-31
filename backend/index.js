const express = require("express");
const cors = require("cors");
const app = express();
const products = require("./products");
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("The API.");
});
app.get("/products", (req, res) => {
  res.send(products);
});

app.get("/products/:numberID", (req, res) => {
  const oneProduct = products.find((item) => {
    return item.numberID === req.params.numberID
  })
  res.send(oneProduct);
});
const port = process.env.PORT || 5000;
app.listen(port, console.log(`http://localhost:${port}`));
