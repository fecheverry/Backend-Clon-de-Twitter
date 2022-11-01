const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const userRoutes = require('./routes/user')
const tweetRoutes = require('./routes/tweet')
const followerRoutes = require('./routes/follower')
const likeRoutes = require('./routes/like')

const app = express()
const port = process.env.PORT || 9000

//middelware
app.use(express.json())
app.use('/api', userRoutes)
app.use('/api', tweetRoutes)
app.use('/api', followerRoutes)
app.use('/api', likeRoutes)

//routes
app.get('/', (req, res) => {
    res.send('Welcome to my API')
})

//mongodb connection
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MONGODB ATLAS"))
    .catch((error) => console.error(error))

app.listen(port, () => console.log('server listen on port', port))
