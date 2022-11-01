const mongoose = require('mongoose')

const tweetSchema = mongoose.Schema({
    author: {
        type: mongoose.Types.ObjectId, ref: 'user', required: true
    },
    body: {
        type: String, required: false
    },
    date: {
        type: Date, required: true
    },
})

module.exports = mongoose.model('tweet', tweetSchema)