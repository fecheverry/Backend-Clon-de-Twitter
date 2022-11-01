const express = require('express')
const tweetSchema = require('../models/tweet')

const router = express.Router();

//create tweet
router.post('/tweets', (req, res) => {
    const tweet = tweetSchema(req.body)
    tweet
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
})

//get all tweets
router.get('/tweets', (req, res) => {
    tweetSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
})

//get by author
router.get('/tweets/:id', (req, res) => {
    const { id } = req.params
    tweetSchema
        .find({ author: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
})

//update tweet
router.put('/tweets/:id', (req, res) => {
    const { id } = req.params
    const { body } = req.body
    tweetSchema
        .updateOne({ _id: id }, { $set: { body } })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
})

//delete a users
router.delete('/tweets/:id', (req, res) => {
    const { id } = req.params
    tweetSchema
        .remove({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
})

module.exports = router;

