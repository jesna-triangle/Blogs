const express = require('express')
const { postBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog,authorsblog } = require('../blogs/blogController')
const { authUser } = require('../../middleware/authmiddleware')

const router = express.Router()

router.route('/').post(authUser, postBlog).get(getAllBlogs)
router.route("/:id").get(getBlogById).put(authUser,updateBlog).delete(deleteBlog);
router.route("/author/:id").get(authorsblog)
module.exports = router