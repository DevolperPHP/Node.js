const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const flash = require("express-flash");
const expressSession = require("express-session");
var methodOverride = require("method-override");

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
app.use(flash());
app.use(methodOverride("_method"));
app.use(expressSession({ secret: "go wally" }));
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

  bio: {
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

  Posts: {
    type: Number,
    default: 0,
  },

  Date: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", userSchema, "Users");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
  },

  by: {
    type: String,
  },

  sub:{
    type: String,
  },

  date: {
    type: Date,
    default: Date.now(),
  },
});

const Post = mongoose.model("Posts", postSchema, "Posts");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/register", (req, res) => {
  const err = "";
  res.render("register", {
    err: err,
  });
});

app.post("/register", async (req, res) => {
  try {
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    const checkusername = await User.findOne({ username: req.body.username });

    if (checkusername) {
      req.flash("danger", "msg");
      res.redirect("/register");
    }

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
      res.redirect("/user/" + user.id);
    } else {
      req.flash("danger", "msg");
      res.redirect("/login");
    }
  } catch (err) {
    req.flash("danger", "msg");
    res.redirect("/login");
  }
});

app.get("/user/:id", async (req, res) => {
  try {
    const id = req.cookies.id;
    const data = await User.findOne({ _id: id });
    if (id == null || id == "") {
      res.redirect("/login");
    } else {
      Post.find({ by: data.username }, (err, post) => {
        if (!err) {
          res.render("profile", {
            data: data,
            post: post,
          });
        }
      }).sort({ date: -1 });
    }
  } catch (err) {
    console.log(err);
  }
});

app.get("/edit", async (req, res) => {
  try {
    const id = req.cookies.id;
    const data = await User.findOne({ _id: id });
    if (id == null || id == "") {
      res.redirect("/login");
    } else {
      res.render("edit", {
        data: data,
      });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/edit", async (req, res) => {
  try {
    const id = req.cookies.id;
    const data = await User.findOne({ _id: id });
    const { newName, newEmail, newAge, newBio, newPassword } = req.body;

    const hash = await bcrypt.hash(newPassword, 10);

    data.name = newName;
    data.age = newAge;
    data.bio = newBio;
    data.email = newEmail;
    if (newPassword !== "") {
      data.password = hash;
    }

    console.log(data);
    await data.save();

    res.redirect("/user/" + data.id);
  } catch (err) {
    console.log(err);
  }
});

app.delete("/user/:id/delete", async (req, res) => {
  try {
    const id = req.cookies.id
    await User.deleteOne({_id: id})
    res.redirect("/login")
  } catch (error) {
    console.log(error)
  }
});

app.get("/user/:id/logout", async (req, res) => {
  try {
    const id = req.cookies.id;

    const user = await User.findOne({ _id: id });
    user.isLogin = 0;
    user.save();
    res.clearCookie("id");
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.get("/post", (req, res) => {
  res.render("post");
});

app.post("/post", async (req, res) => {
  try {
    const id = req.cookies.id;
    const user = await User.findOne({ _id: id });
    const { title, sub } = req.body;

    const newPost = [
      new Post({
        title: title,
        sub: sub,
        by: user.username,
      }),
    ];

    newPost.forEach((data) => {
      data.save((err) => {
        if (!err) {
          console.log(data);
          user.Posts = user.Posts + 1;
          res.redirect("/user/" + id);
          user.save();
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/post/:id/delete", async (req, res) => {
  try {
    const postID = req.params.id;
    const userID = req.cookies.id
    const user = await User.findOne({_id: userID})
    user.Posts = user.Posts - 1;
    user.save()
    await Post.deleteOne({ _id: postID });
    res.redirect("/user/" + userID)
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
