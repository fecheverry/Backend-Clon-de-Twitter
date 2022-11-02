const { response } = require('express');
const express = require('express')
const followerSchema = require('../models/follower');
const user = require('../models/user')

const router = express.Router();

//create follower
router.post('/followers', async (req, res) => {
    const relation = followerSchema(req.body)

    const idfr = relation.follower
    const idfd = relation.followed

    const fr = await user.findById(idfr)
    const fd = await user.findById(idfd)

    if (fr != undefined && fd != undefined) {
        if (!(idfr.toString() === idfd.toString())) {
            if (!fr.followeds.includes(fd.username)) {

                fr.followeds = fr.followeds.concat(fd.username)
                fd.followers = fd.followers.concat(fr.username)
                
                const followeds = fr.followeds
                const followers = fd.followers

                await user.updateOne({ _id: idfr }, { $addToSet: { followeds: followeds } })
                await user.updateOne({ _id: idfd }, { $addToSet: { followers: followers } })

                await relation
                    .save()
                    .then((data) => res.json(data))
                    .catch((error) => res.json({ message: error }))
            } else {
                res.status(400).json({
                    error: 'the user is already follow'
                })
            }
        } else {
            res.status(400).json({
                error: 'invalid operation'
            })
        }
    } else {
        res.status(400).json({
            error: 'CANOT FIND ID'
        })
    }
})

//get followers ID
router.get('/followers/:id', (req, res) => {
    const { id } = req.params
    followerSchema
        .find({ followed: id }, { _id: 0, follower: 1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
})

//get followers USERNAME
router.get('/followersu/:id', async (req, res) => {
    const { id } = req.params

    try {
        const u = await user.findById(id)
        res.json(u.followers)
    } catch (error) {
        res.json(error)
    }

})

//get followeds ID
router.get('/followers/:id', (req, res) => {
    const { id } = req.params
    followerSchema
        .find({ follower: id }, { _id: 0, followed: 1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
})

//get followeds USERNAME
router.get('/followersu/:id', async (req, res) => {
    const { id } = req.params

    try {
        const u = await user.findById(id)
        res.json(u.followeds)
    } catch (error) {
        res.json(error)
    }

})



router.delete('/followers/:follower/:followed', async (req, res) => {
    const follower1 = req.params.follower
    const followed1 = req.params.followed

    idfr = follower1
    idfd = followed1
    if (idfr.length === 24 && idfd.length === 24) {
        const fr = await user.findById(idfr)
        const fd = await user.findById(idfd)
        if (fr != undefined && fd != undefined) {
            if (idfr != idfd) {
                if (fr.followeds.includes(fd.username)) {

                    const followed = fd.username
                    const follower = fr.username

                    await user.updateOne({ _id: idfd }, { $pullAll: { followers: [follower] } })
                    await user.updateOne({ _id: idfr }, { $pullAll: { followeds: [followed] } })

                    followerSchema
                        .remove({ follower: follower1, followed: followed1 })
                        .then((data) => res.json(data))
                        .catch((error) => res.json({ message: error }))
                } else {
                    res.status(400).json({
                        error: 'the user is not follow'
                    })
                }
            } else {
                res.status(400).json({
                    error: 'invalid operation'
                })
            }
        } else {
            res.status(400).json({
                error: 'CANOT FIND ID'
            })
        }
    } else {
        res.status(400).json({
            error: 'invalid ID'
        })
    }
})
module.exports = router;

