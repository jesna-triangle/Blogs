const blogService = require('../blogs/blogService')

exports.postBlog = async (req, res) => {
    try {
        const blogData = {
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            author: req.user.userId
        };

        const blog = await blogService.postBlog(blogData);

        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await blogService.getAllBlogs();
        return res.status(200).json({ message: 'Blogs', blogs });
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
}
exports.getBlogById = async (req, res) => {
    try {
        const id = req.params.id
        const blog = await blogService.getBlogById(id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        return res.status(200).json(blog);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};
exports.authorsblog = async (req, res)=>{
    const authorId  = req.params.id;
    try {
        const blogs = await blogService.getAuthorBlogs(authorId); // Finds blogs only by the authorId if provided

        res.status(200).json({ blogs });
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch blogs' });
      }
}
exports.updateBlog = async (req, res) => {
    console.log(req.body);
    // const { blogId } = req.params;
    // const blogData = req.body;
    const {blogId, title,content, category} = req.body
    const blogData={
        title:title,
        content:content,
        category:category
    }
    try {
        const updatedBlog = await blogService.updateBlog(blogId, blogData);
        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
exports.deleteBlog = async (req, res) => {
    try {
        const blogId = req.params.id
        const blog = await blogService.deleteBlog(blogId)
        if (!blog) {
            return res.status(400).json({ message: 'Blog not Found' })
        }
        res.json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
