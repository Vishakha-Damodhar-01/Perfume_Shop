require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

console.log("productRoutes:", productRoutes);
console.log("reviewRoutes:", reviewRoutes);

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.use("/api/products", productRoutes);
    app.use("/api/reviews", reviewRoutes);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("ERROR:", err);
  });
