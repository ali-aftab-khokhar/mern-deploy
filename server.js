require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const userRoute = require('./routes/userRoutes')
const postRoute = require('./routes/postsRoutes')
const commentRoute = require('./routes/commentRoutes')

const PORT = process.env.PORT || 5000

// Connection established between MongoDB and Script.js using Mongoose
mongoose.connect(process.env.DB,
  () => { console.log('Connected to database') },
  (err) => { console.log(err) })

const options = {
  // For Deployment
  origin: 'https://mern-app-by-ak.herokuapp.com/',
  credentials: true
}

app.use(cors(options))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/api', userRoute)
app.use('/api', postRoute)
app.use('/api', commentRoute)

// Server production assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
