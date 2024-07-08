const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jsonWebToken = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://salman333699:islamabad@cluster0.xrecpeq.mongodb.net/Sk-Commerce",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.get("/", (req, resp) => {
  resp.send("Express App is Working");
});

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

app.use("/images", express.static("upload/images"));

app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    imageUrl: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

const { Product, User } = require("./Schema");

app.post("/addProduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product = products[products.length - 1];
    id = last_product.id + 1;
  } else {
    id = 1;
  }

  const product = new Product({
    id: id,
    name: req.body.name,
    category: req.body.category,
    image: req.body.image,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });

  await product.save();
  console.log("MY Data is Saved in MongoDB");
  res.json({
    success: true,
    name: req.body.name,
  });
});

app.post("/removeProduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  res.json({
    success: true,
    name: req.body.name,
  });
});

app.get('/allProduct', async (req, res) => {
  let product = await Product.find({});
  res.send(product);
});

app.post("/signup", async (req, resp) => {
  let checks = await User.findOne({ email: req.body.email });
  
  if (checks) {
    return resp.status(400).json({ success: false, error: "Existing user found with same email address" });
  }

  let cart = {};

  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }

  const user = new User({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart
  });

  await user.save();

  const data = {
    user: {
      id: user.id
    }
  };

  const token = jsonWebToken.sign(data, 'secret_ecom');
  resp.json({ success: true, token });
});

app.post('/login', async (req, resp) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id
        }
      };
      const token = jsonWebToken.sign(data, 'secret_ecom');
      resp.json({
        success: true,
        token
      });
    } else {
      resp.json({ success: false, error: "User does not exist. Wrong Password" });
    }
  } else {
    resp.json({ success: false, error: "Wrong Email" });
  }
});

app.listen(port, (err) => {
  if (!err) {
    console.log("OUR APP IS WORKING!!!");
  } else {
    console.log("Error:", err);
  }
});
