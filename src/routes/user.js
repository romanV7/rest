const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mysqlConnection = require('../connection')
const User = require('../services/user')
const RefreshToken = require('../services/token')
const { generateAccessToken, generateRefreshToken, checkToken } = require('../shared/token')

const Router = express.Router()

Router.post('/signup', (req, res) => {
  User.findByEmail(req.body.email, (err, userByEmail) => {
    if (err) {
      res.status(500).json(err)
    } else if (userByEmail.length >= 1) {
      return res.status(409).json({ message: 'Mail exists' })
    }
    bcrypt.hash(req.body.password, +process.env.IV, (err, hash) => {
      if (err) return res.status(500).json({ error: err })
      User.createUser({name: req.body.name, email: req.body.email, password: hash}, (err, result) => {
        if (err) return res.status(500).json({ error: err })
        return res.status(200).json(result)
      })
    })
  })
})

Router.post('/signin', (req, res) => {
  User.findByUsername(req.body.name, (err, userByName) => {
    const { password, email, id } = userByName[0]
    bcrypt.compare(req.body.password, password, (err, result) => {
      if (err) return res.status(401).json({ message: 'Auth failed' })
      if (result) {
        const userData = { email, userId: id }
        generateAccessToken(userData, (err, accessToken) => {
          if (err) return res.status(500).json({ error: err })
          generateRefreshToken(userData, (err, refreshTokenPayload) => {
            if (err) return res.status(500).json({ error: err })
            RefreshToken.findTokenByUserId(id, (err, refreshTokenCached) => {
              if (refreshTokenCached) console.log('RefreshToken still exists')
              RefreshToken.createToken({refresh: id, payload: refreshTokenPayload}, (err, token) => {
                return res.status(200).json({ message: 'Auth successfull', accessToken, refreshTokenPayload, userId: id })
              })
            })
          })
        })
      } else {
        return res.status(401).json({ message: 'Auth failed' })
      }
    })
  })
})

Router.post('/logout', (req, res) => {
  RefreshToken.deleteToken(req.body.token, (err, result) => {
    if (err) {
      res.status(500).json(err)
    } else if (!result) {
      res.status(404).json()
    }
    res.status(204).json(result)
  })
})

Router.post('/signin/token', (req, res) => {
  const refreshTokenPayload = req.body.token
  RefreshToken.findTokenByPayload(refreshTokenPayload, (err, refreshToken) => {
    if (!refreshTokenPayload) return res.sendStatus(401)
    if (!refreshToken) return res.sendStatus(403)
    checkToken(refreshTokenPayload, (err, user) => {
      if (err) return res.sendStatus(403)
      generateAccessToken({ name: user.name }, (err, accessToken) => {
        if (err) return res.status(500).json({ error: err })
        res.json({ accessToken })
      })
    })
  })
})

Router.get('/info/:name',  (req, res) => {
  User.findByUsername(req.params.name, (err, result) => {
    if (err) return res.status(500).json({ error: err })
    res.send(result)
  })
})

Router.get('/info/:id',  (req, res) => {
  User.findUserById(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err })
    res.send(result)
  })
})

module.exports = Router
