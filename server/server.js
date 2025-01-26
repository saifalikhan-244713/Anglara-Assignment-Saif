const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const mongoURI = process.env.MONGO_URI;
const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET;

mongoose
  .connect(mongoURI)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [String],
  createdAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
const Post = mongoose.model("Post", postSchema);

// for the user data like email and password
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
});
const User = mongoose.model("User", userSchema);

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.json({ message: "user registered message from backend" });
  } catch (err) {
    res.json({ error: "error occurred" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const fetchedPass = user.password;

  const isValidPass = await bcrypt.compare(password, fetchedPass);

  if (!isValidPass) {
    return res.status(401).json({ message: "Password invalid" });
  }

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "2h" });
  res.json({ token, email });
});

//get all the posts
app.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.find().populate("userId", "email");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Error fetching posts" });
  }
});

//add post
app.post("/api/posts", async (req, res) => {
  const { title, content, tags } = req.body;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "No token provided" });

  if (!title || !content || !tags) {
    return res
      .status(400)
      .json({ error: "Title, content, and tags are required" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const newPost = new Post({
      title,
      content,
      tags,
      userId: decoded.id,
    });
    await newPost.save();
    res.json({ message: "Post created", post: newPost });
  } catch (err) {
    console.error("Error creating post:", err.message);
    res.status(500).json({ error: "Error creating post" });
  }
});

//get detailed post by id upo0n clicking on it
app.get("/api/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Error fetching post" });
  }
});

//edit the post
app.put("/api/posts/:id", async (req, res) => {
  const { title, content, tags } = req.body;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ error: "Post not found" });
    if (post.userId.toString() !== decoded.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    post.title = title;
    post.content = content;
    post.tags = tags;
    await post.save();
    res.json({ message: "Post updated", post });
  } catch (err) {
    res.status(500).json({ error: "Error updating post" });
  }
});

//loggedin users post
app.get("/api/my-posts", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;
    const myPosts = await Post.find({ userId });
    res.json(myPosts);
  } catch (error) {
    res.status(403).json({ error: "Invalid token" });
  }
});

//delete the post
app.delete("/api/posts/:id", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ error: "Post not found" });
    if (post.userId.toString() !== decoded.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await post.remove();
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting post" });
  }
});

app.get("/api/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Error fetching post" });
  }
});

app.listen(3000, () => {
  console.log("server running");
});
