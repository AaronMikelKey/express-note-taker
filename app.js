const express =require('express')
const path = require('path')
const apiRouter = require('./routes/api')

const app = express()

const pubPath = path.join(__dirname, '/Develop/public')
app.use('/', express.static(pubPath))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/notes', (req, res) => {
	res.sendFile(path.join(__dirname, '/Develop/public/notes.html'))
})

app.use('/api', apiRouter)

app.get('*', (req, res) => {
	res.sendFile(pubPath + '/index.html')})

module.exports = app