const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(cors());              // дозволяє запити з фронтенду (CORS)
app.use(express.json());      // щоб читати JSON body

// 1) REST маршрути
const productRoutes = require("./routes/products");
app.use("/api/products", productRoutes);

// 2) Просте підключення фронтенду (статичні файли)
// Відкривати: http://localhost:3000
app.use(express.static(path.join(__dirname, "public")));

// Якщо хочеш завжди повертати index.html для "/"
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server started on http://localhost:${PORT}`);
  console.log(`📦 API: http://localhost:${PORT}/api/products`);
});
