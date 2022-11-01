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
        type: String, required: true
    },
})

module.exports = mongoose.model('user', userSchema)