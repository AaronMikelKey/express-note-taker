const express =require('express')
const path = require('path')

const app = express()

const pubPath = path.join(__dirname, '/Develop/public')
app.use('/', express.static(pubPath))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
	console.log( 'req = ',req)
	res.sendFile('/index.html')})

app.get('/notes', (req, res) => {
	res.sendFile(path.join(__dirname, '/Develop/public/notes.html'))
})

app.get('/api/notes', (req, res) => {
	res.sendFile(path.join(__dirname, '/Develop/db/db.json'))
})

module.exports = app