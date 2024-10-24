const catService = require('../category/categoryService')

exports.createCategory = async (req, res) => {
    try {
        // console.log(req.user.role);=
        const categoryData = {
            name: req.body.name
        }
        const Category = await catService.createCategory(categoryData)
        res.status(201).json(Category)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
exports.readCategory=async(req,res)=>{
    try {
        const users = await catService.readCategory();
        return res.status(200).json({ message: 'category list', users });
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
}