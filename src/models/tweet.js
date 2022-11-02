const mongoose = require('mongoose')

const tweetSchema = mongoose.Schema({
    author: {
        type: mongoose.Types.ObjectId, ref: 'user', required: true
    },
    body: {
        type: String, required: true
    },
    date: {
        type: Date, required: false
    },
})

module.exports = mongoose.model('tweet', tweetSchema)