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
// API: Get single product with its reviews
// app.get('/api/products/:id', async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id).lean();
//     const reviews = await Review.find({ productId: req.params.id });
//     res.json({ ...product, productReviews: reviews });
//   } catch (err) {
//     res.status(404).json({ message: "Product not found" });
//   }
// });


// app.get('/api/products/:id', async (req, res) => {
//   try {
//     // 1. Fetch product by ID
//     const product = await Product.findById(req.params.id).lean();
    
//     // 2. Fetch reviews linked to this productId
//     const reviews = await Review.find({ productId: req.params.id });
    
//     // 3. Return a single object containing both
//     res.json({ ...product, productReviews: reviews });
//   } catch (err) {
//     res.status(404).json({ message: "Product not found" });
//   }
// });

// // app.get('/api/products/:id', async (req, res) => {
// //   const product = await Product.findById(req.params.id).lean();
// //   // Find reviews where the productId field matches
// //   const reviews = await Review.find({ productId: req.params.id });
// //   // Send combined data so product.productReviews exists
// //   res.json({ ...product, productReviews: reviews });
// // });


// // app.get('/api/products/:id', async (req, res) => {
// //   try {
// //     const product = await Product.findById(req.params.id).lean();
// //     // Fetching related reviews using the Product ID
// //     const reviews = await Review.find({ productId: req.params.id });
    
// //     // Combining them so the frontend receives everything
// //     res.json({ ...product, productReviews: reviews });
// //   } catch (err) {
// //     res.status(404).json({ message: "Not found" });
// //   }
// // });

// // API: Add a review
// app.post('/api/reviews', async (req, res) => {
//   const newReview = new Review(req.body);
//   await newReview.save();
//   res.json({ message: "Review saved" });
// });

// app.listen(5000, () => console.log("Server running on port 5000"));