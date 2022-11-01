const mongoose = require('mongoose')

const followerSchema = mongoose.Schema({
    follower: { type: mongoose.Types.ObjectId, ref: 'user', required: true },
    followed: { type: mongoose.Types.ObjectId, ref: 'user', required: true },

})

module.exports = mongoose.model('follower', followerSchema)