const express = require("express");
const router = express.Router();

// DEMO "DB" (поки без реальної БД — для практичної 5 достатньо)
// Далі можна замінити на MSSQL/ORM.
let products = [
  { id: 1, name: "Свічка", price: 450 },
  { id: 2, name: "Плед", price: 980 }
];

// GET /api/products
router.get("/", (req, res) => {
  res.json(products);
});

// GET /api/products/:id
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = products.find((p) => p.id === id);
  if (!item) return res.status(404).json({ message: "Product not found" });
  res.json(item);
});

// POST /api/products
router.post("/", (req, res) => {
  const { name, price } = req.body;
  if (!name || price === undefined) {
    return res.status(400).json({ message: "name and price are required" });
  }
  const newProduct = {
    id: products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1,
    name,
    price: Number(price),
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT /api/products/:id
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name, price } = req.body;

  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) return res.status(404).json({ message: "Product not found" });

  products[idx] = {
    ...products[idx],
    ...(name !== undefined ? { name } : {}),
    ...(price !== undefined ? { price: Number(price) } : {}),
  };

  res.json(products[idx]);
});

// DELETE /api/products/:id
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const before = products.length;
  products = products.filter((p) => p.id !== id);
  if (products.length === before) return res.status(404).json({ message: "Product not found" });
  res.status(204).send();
});

module.exports = router;
