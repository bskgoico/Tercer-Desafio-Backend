import express from "express";
import ProductManager from "./ProductManager.js";

const app = express();
const PORT = 4000;
app.use(express.urlencoded({ extended: true }));

const manager = new ProductManager("./src/products.json");

app.get("/", (req, res) => {
  res.send("Hola desde la página de inicio");
});

app.get("/products", async (req, res) => {
  const { limit } = req.query;
  const products = await manager.readProducts();
  limit ? res.send(products.slice(0, limit)) : res.send(products);
});

app.get("/products/:pid", async (req, res) => {
  const { pid } = req.params;
  const products = await manager.readProducts();
  const productById = products.find((product) => product.id === parseInt(pid));
  productById ? res.send(productById) : res.send("Producto no encontrado");
});

app.get("*", (req, res) => {
  res.send("Error 404");
});

app.listen(PORT, () => {
  console.log(`Server on PORT: ${PORT}
    http://localhost:${PORT}`);
});
