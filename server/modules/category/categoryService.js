const Category = require('../category/categoryModel')
exports.createCategory = async (categoryData) => {
    try {
        const newCategory = new Category(categoryData)
        return await newCategory.save();
    } catch (error) {
        console.error("Error creating category:", error);
        throw new Error("Category creation failed");
    }
}
exports.readCategory = async () => {
    return await Category.find()
}
