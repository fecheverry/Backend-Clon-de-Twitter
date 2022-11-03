const express = require('express')
const likeSchema = require('../models/like')
const user = require('../models/user')
const tweet = require('../models/tweet');
const { findById } = require('../models/user');

const router = express.Router();

//create like
router.post('/likes', async (req, res) => {

    const like = likeSchema(req.body)

    const id_user = like.user
    const id_tweet = like.tweet

    const u = await user.findById(id_user)
    const t = await tweet.findById(id_tweet)

    if (u !== undefined && t !== undefined) {
        if (!t.likes.includes(id_user)) {
            t.likes = t.likes.concat(id_user)

            const likes = t.likes

            await tweet.updateOne({ _id: like.tweet }, { $addToSet: { likes: likes } })

            like
                .save()
                .then((data) => res.json(data))
                .catch((error) => res.json({ message: error }))

        } else {
            res.status(400).json({
                error: 'the tweet is already liked'
            })
        }

    } else {
        res.status(400).json({
            error: 'CANOT FIND ID'
        })
    }



})


//get likes
router.get('/likes/:id', (req, res) => {
    const { id } = req.params
    likeSchema
        .find({ tweet: id }, { _id: 0, tweet: 0, __v: 0 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
})


//delete followed
router.delete('/likes/:user/:tweet', async (req, res) => {
    const id_user = req.params.user
    const id_tweet = req.params.tweet

    if (id_user.length === 24 && id_tweet.length === 24) {
        const u = await user.findById(id_user)
        const t = await tweet.findById(id_tweet)

        if (u != undefined && t != undefined) {

            if (t.likes.includes(id_user)) {
                await tweet.updateOne({ _id: id_tweet }, { $pullAll: { likes: [id_user] } })


                likeSchema
                    .remove({ user: id_user, tweet: id_tweet })
                    .then((data) => res.json(data))
                    .catch((error) => res.json({ message: error }))


            } else {
                res.status(400).json({
                    error: 'the tweet is not liked by this user'
                })
            }
        } else {
            res.status(400).json({
                error: 'CANOT FIND ID'
            })
        }

    } else {
        res.status(400).json({
            error: 'INVALID ID'
        })
    }
})

module.exports = router;