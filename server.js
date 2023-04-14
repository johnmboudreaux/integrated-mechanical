const express = require('express')
const nodemailer = require('nodemailer')
const cors = require('cors')
require('dotenv').config()

const app = express()

const path = require('path')
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
)

app.use(express.static('src'))
app.use(express.static('build'))

const requireHTTPS = (request, response, next) => {
  if (request.header('x-forwarded-proto') !== 'https') {
    return response.redirect(`https://${request.header('host')}${request.url}`)
  }
  next()
}
if (process.env.NODE_ENV === 'production') {
  app.use(requireHTTPS)
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'))
})

app.post('/api/v1/messageReceived', (req, res) => {
  const { to, email, subject, text, city} = req.body

  if (to && email && subject && text && !city) {
    // const transporter = nodemailer.createTransport({
    //   host: 'smtp.gmail.com',
    //   port: 587,
    //   secure: false,
    //   auth: {
    //     user: 'jhnbdrx@gmail.com',
    //     pass: process.env.JHNBDRX_PASS,
    //   },
    // })

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'jhnbdrx@gmail.com',
          pass: process.env.JHNBDRX_PASS,
        },
      })

    const mailOptions = {
        from: 'jhnbdrx@gmail.com',
        to, 
        subject,
        text
      }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(500).json({
            success: false,
            error,
            message: 'Internal server error',
        })
      } else {
        res.status(201).json({
          success: true,
        })
      }
    })
  } else if (city) {
    res.status(406).json({
      success: false,
      error: 'Bot Detected',
    })
  } else {
    res.status(406).json({
      success: false,
      error: 'Missing Required Field',
    })
  }
})

app.listen(3000, () => console.log('IM listening on port 3000!'))

module.exports = app