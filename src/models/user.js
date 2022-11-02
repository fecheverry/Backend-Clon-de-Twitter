const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    name: {
        type: String, required: true
    },
    username: {
        type: String,
        unique: true,
        required: true,

    },
    bio: {
        type: String, required: false
    },
    age: {
        type: Number, required: true
    },
    email: {
        type: String, unique: true, required: true
    },
    joined: {
        type: Date, required: false
    },
    followeds: [
        { type: String, required: false }],
    followers: [
        { type: String, required: false }
    ],
    tweets: [{ type: mongoose.Types.ObjectId, ref: 'tweet', required: true }]
})

module.exports = mongoose.model('user', userSchema)