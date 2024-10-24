const express = require('express')
const { postBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog, } = require('../blogs/blogController')
const { authUser } = require('../../middleware/authmiddleware')

const router = express.Router()

router.route('/').post(authUser, postBlog).get(getAllBlogs)
router.route("/:blogId").get(getBlogById).put(authUser,updateBlog).delete(deleteBlog);
module.exports = router