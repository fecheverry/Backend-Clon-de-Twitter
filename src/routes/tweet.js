const express = require('express')
const tweetSchema = require('../models/tweet')
const user = require('../models/user')

const router = express.Router();

//create tweet
router.post('/tweets', async (req, res) => {
    const tweet = tweetSchema(req.body)

    const id_author = tweet.author

    const author = await user.findById(id_author)

    if (author !== null && author != undefined) {

        tweet.date = new Date()

        author.tweets = author.tweets.concat(tweet._id)

        const tweets1 = author.tweets

        await user.updateOne({ _id: id_author }, { $addToSet: { tweets: tweets1 } })

        tweet
            .save()
            .then((data) => res.json(data))
            .catch((error) => res.json({ message: error }))
    } else {
        res.status(400).json({
            error: 'CANOT FIND ID'
        })
    }

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

//delete tweet
router.delete('/tweets/:id', async (req, res) => {
    const { id } = req.params
    if (id.length === 24) {
        const tweet = await tweetSchema.findById(id)
        if (tweet != null && tweet != undefined) {
            const id_author = tweet.author

            await user.updateOne({ _id: id_author }, { $pullAll: { tweets: [id] } })
            tweetSchema
                .remove({ _id: id })
                .then((data) => res.json(data))
                .catch((error) => res.json({ message: error }))
        }

    }
})

module.exports = router;

