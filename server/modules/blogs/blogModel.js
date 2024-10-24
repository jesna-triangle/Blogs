const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 150
    },
    content: {
        type: String,
        required: true
    },
    category:{
        type:String,
        required: true
    },
    author:{
        type:String,
        required:true
    },
    datePublished:{
        type:Date,
        default:Date.now()
    }
})
const Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog