const mongoose = require('mongoose')

const likeSchema = mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'user', required: true },
    tweet: { type: mongoose.Types.ObjectId, ref: 'user', required: true },

})

module.exports = mongoose.model('like', likeSchema)