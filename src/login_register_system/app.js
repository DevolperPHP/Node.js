const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");

const port = 3000;
const MONGO_URI = "mongodb://localhost:27017/newDataBase";

mongoose.connect(
  MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Data base connected");
    }
  }
);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },

  name: {
    type: String,
  },

  age: {
    type: Number,
  },

  email: {
    type: String,
  },

  password: {
    type: String,
  },

  isAdmin: {
    type: Number,
    default: 0,
  },

  isLogin: {
    type: Number,
    default: 0,
  },

  Date: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", userSchema, "Users");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  try {
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = [
      new User({
        username: req.body.username,
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        password: hashedPassword,
      }),
    ];

    newUser.forEach((data) => {
      data.save((err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(data);
          res.redirect("/login");
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const check = await bcrypt.compare(password, user.password);
    if (check) {
      user.isLogin = 1;
      await user.save();
      res.cookie("id", user.id);
      res.redirect("/login");
    } else {
      res.status(404).send("user not found")
    }
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
