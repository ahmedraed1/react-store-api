const express = require("express");
const cors = require("cors");
const products = require("./data");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  const calculateOrderAmount = (cartItems) => {
    let total = 0;
    cartItems.forEach((cartItem) => {
      const product = products.find((p) => p.id === cartItem.id);
      if (product) {
        total += product.price * cartItem.quantity;
      }
    });

    return Math.round(total * 100);
  };

  try {
    const amount = calculateOrderAmount(items);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",

      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ error: { message: error.message } });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend server is running on http://localhost:${PORT}`);
});
