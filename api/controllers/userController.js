const express = require('express')
const bcrypt = require('bcrypt')

const User = require('../models/usersModel')

const userRouter = express.Router()

// Registration route
userRouter.post('/signup', async (req, res) => {
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync()
  )

  try {
    const user = await User.create(req.body)
    req.sesion.currentUser = user
    res.status(200).json({
      msg: 'You have succesfully signed up.',
      authorised: true,
      user: {
        id: user._id,
        username: user.username
      }
    })
  } catch (error) {
    console.log('Error!');
    // In case the username already exists
    res.status(400).json({
      msg: 'Username already exists.'
    })
  }
})

// Login route
userRouter.post('/login', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username: username }).exec()

  // If username is not found
  if (!user) {
    return res.status(400).json({
      msg: 'Username or password is incorrect.'
    })
  }

  const passwordIsCorrect = bcrypt.compareSync(password, user.password)

  // If password is incorrect
  if (!passwordIsCorrect) {
    return res.status(400).json({
      msg: 'Username or password is incorrect.'
    })
  } 

  // Login credentials are all correct
  else {
    req.session.currentUser = user
    res.status(200).json({
      msg: 'You have successfully logged in.',
      authorised: true
    })
  }
})

// Logout route
userRouter.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.status(200).json({
      msg: 'You have successfully logged out.'
    })
  })
})

// Everytime app.js mounts, check to see if user is authorised.
userRouter.get('/isauthorised', async (req, res) => {
  if (req.session.currentUser) {
    return res.status(200).json({
      msg: 'User is logged in',
      authorised: true
    })
  } else {
    return res.status(200).json({
      msg: 'User is logged out',
      authorised: false
    })
  }
})

module.exports = userRouter