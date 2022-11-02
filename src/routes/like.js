const express = require('express')
const likeSchema = require('../models/like')

const router = express.Router();

//create like
router.post('/likes', (req, res) => {
    const like = likeSchema(req.body)
    like
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
})

//get likes
router.get('/likes/:id', (req, res) => {
    const { id } = req.params
    likeSchema
        .find({ user: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
})

//get followeds
router.get('/likes/:id', (req, res) => {
    const { id } = req.params
    followerSchema
        .find({ follower: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
})


//delete followed
router.delete('/likes/:follower/:followed', (req, res) => {
    const { follower } = req.params
    const { followed } = req.params
    followerSchema
        .remove({ follower: follower, followed: followed })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
})

module.exports = router;