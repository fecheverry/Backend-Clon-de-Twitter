const express = require('express')
const followerSchema = require('../models/follower')

const router = express.Router();

//create follower
router.post('/followers', (req, res) => {
    const follower = followerSchema(req.body)
    follower
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
})

//get followers
router.get('/followers/:id', (req, res) => {
    const { id } = req.params
    followerSchema
        .find({ followed: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
})

//get followeds
router.get('/followeds/:id', (req, res) => {
    const { id } = req.params
    followerSchema
        .find({ follower: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
})


//delete followed
router.delete('/followers/:follower/:followed', (req, res) => {
    const { follower } = req.params
    const { followed } = req.params
    followerSchema
        .remove({ follower: follower, followed: followed })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
})

module.exports = router;

