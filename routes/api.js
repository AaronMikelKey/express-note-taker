const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')


router.get('/notes', (req, res) => {
	res.sendFile(path.join(__dirname, '../Develop/db/db.json'))
})

router.post('/notes', (req, res) => {
	const newNote = req.body
	const dbData = JSON.parse(fs.readFileSync(path.join(__dirname, '../Develop/db/db.json')))
	dbData.push(newNote)
	fs.writeFileSync(path.join(__dirname, '../Develop/db/db.json'), JSON.stringify(dbData, null, 2))
	res.end()
})

router.delete('/notes/:id', (req, res) => {
	const deletedNote = req.params.id
	const dbData = JSON.parse(fs.readFileSync(path.join(__dirname, '../Develop/db/db.json')))
	const index = dbData.map(e => e.id).indexOf(deletedNote)
	dbData.splice(index, 1)
	fs.writeFileSync(path.join(__dirname, '../Develop/db/db.json'), JSON.stringify(dbData, null, 2))
	res.end()
})

module.exports = router