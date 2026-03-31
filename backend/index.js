const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { type } = require("os");

app.use(express.json());
app.use(cors());

//Database Connection With Mongodb
mongoose.connect("");

//Create API
app.get("/", (req, res) => {
  res.send("The express app is running");
});

//Store image
const storage = multer.diskStorage({
  destination: "./upload/image",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`,
    );
  },
});

const upload = multer({ storage: storage });

//Create upload endpoint for image
app.use("/image", express.static("upload/image"));

app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/image/${req.file.filename}`,
  });
});

//Schema for creating product
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

app.post("/add_product", async (req, res) => {
  let products = await Product.find({});
  let id;

  if (products.length > 0) {
    let lastProductArray = products.slice(-1);
    let lastProduct = lastProductArray[0];
    id = lastProduct.id + 1;
  } else {
    id = 1;
  }

  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log(product);
  await product.save();
  console.log("Saved");
  res.json({
    success: true,
    name: req.body.name,
  });
});

//Create API for deleting products
app.post("/remove_product", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Product Removed.");
  res.json({
    success: true,
    name: req.body.name,
  });
});

//Create API for getting all products
app.get("/all_products", async (req, res) => {
  let products = await Product.find({});
  console.log("All Products Get.");
  res.send(products);
});

//Create schema for user
const User = mongoose.model("User", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//Create endpoint for user registration
app.post("/register", async (req, res) => {
  let check = await User.findOne({ email: req.body.email });
  if (check) {
    return res
      .status(400)
      .json({ success: false, errors: "Email already exist" });
  }

  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });
  await user.save();

  const data = {
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(data, "secretKey");
  res.json({ success: true, token });
});

//Create endpoint for user login
app.post("/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    const passwordCompare = req.body.password === user.password;
    if (passwordCompare) {
      const data = {
        user: { id: user.id },
      };
      const token = jwt.sign(data, "secretKey");
      res.json({ success: true, token });
    } else {
      res.json({ success: false, errors: "Wrong Password" });
    }
  } else {
    res.json({ success: false, errors: "User Not Found" });
  }
});

//Create endpoint for new collection data
app.get("/new_collection", async (req, res) => {
  let products = await Product.find({});
  let newCollection = products.slice(1).slice(-8);
  console.log("New Collection Get");
  res.send(newCollection);
});

//Create endpoint for getting popular in women section
app.get("/popular_in_women", async (req, res) => {
  let products = await Product.find({ category: "women" });
  let popularInWomen = products.slice(0, 4);
  console.log("Popular In Women Get");
  res.send(popularInWomen);
});

//Create middle ware to fetch user
const fetchUser = async (req, res, next) => {
  const token = req.header("authToken");
  if (!token) {
    res.status(401).send({ errors: "Please authenticate using a valid token" });
  } else {
    try {
      const data = jwt.verify(token, "secretKey");
      req.user = data.user;
      next();
    } catch (e) {
      res
        .status(401)
        .send({ errors: "Please authenticate using a valid token" });
    }
  }
};

//Create endpoint for getting cart data
app.post("/add_to_cart", fetchUser, async (req, res) => {
  console.log("Added item | ID: ", req.body.itemId);
  let userData = await User.findOne({ _id: req.user.id });

  userData.cartData[req.body.itemId] += 1;
  await User.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData },
  );
  res.send("Item Added");
});

//Create endpoint for removing from cart
app.post("/remove_from_cart", fetchUser, async (req, res) => {
  console.log("Removed item | ID: ", req.body.itemId);
  let userData = await User.findOne({ _id: req.user.id });

  if (userData.cartData[req.body.itemId] > 0) {
    userData.cartData[req.body.itemId] -= 1;
  }

  await User.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData },
  );
  res.send("Item Removed");
});

//Create endpoint for getting cart data
app.post("/get_cart", fetchUser, async (req, res) => {
  console.log("Get Cart");
  let userData = await User.findOne({ _id: req.user.id });
  res.json(userData.cartData);
});

app.listen(port, (error) => {
  if (!error) {
    console.log("Server running on Port " + port);
  } else {
    console.log("Error:" + error);
  }
});
