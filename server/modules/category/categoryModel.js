const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    createdAt:{
        type:Date,
        default:Date.now 
    },
    updatedAt:{
        type:Date,
        default:Date.now 
    }

})
const blogCategory = mongoose.model('Categories', categorySchema)
module.exports = blogCategory
