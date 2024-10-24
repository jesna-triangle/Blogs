const express = require('express');
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
// const crypto=require('crypto')
// console.log(crypto.randomBytes(32).toString('hex'));
const userRoutes = require('./modules/user/userRoute')
const categoryRoutes = require('./modules/category/categoryRoute')
const blogRoutes = require('./modules/blogs/blogRoute')
const app = express()

app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use(express.json())
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/Blogs')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection failed', err));

app.use("/api/users", userRoutes)
app.use("/api/category", categoryRoutes)
app.use("/api/blog", blogRoutes)

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
