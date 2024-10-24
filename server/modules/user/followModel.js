const mongoose = require('mongoose')
const followingSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
})
const follow = mongoose.model('Following', followingSchema)
module.exports = follow