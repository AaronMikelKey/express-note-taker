const express =require('express')
const path = require('path')
const fs = require('fs')

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

app.post('/api/notes', (req, res) => {
	const newNote = req.body
	const dbData = JSON.parse(fs.readFileSync(path.join(__dirname, '/Develop/db/db.json')))
	dbData.push(newNote)
	fs.writeFileSync(path.join(__dirname, '/Develop/db/db.json'), JSON.stringify(dbData, null, 2))
	res.redirect('/notes')
})

app.delete('/api/notes/:id', (req, res) => {
	const deletedNote = req.params.id
	const dbData = JSON.parse(fs.readFileSync(path.join(__dirname, '/Develop/db/db.json')))
	dbData.splice(dbData.indexOf(deletedNote), 1)
	fs.writeFileSync(path.join(__dirname, '/Develop/db/db.json'), JSON.stringify(dbData, null, 2))
	res.redirect('/notes')
})

module.exports = app