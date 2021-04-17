const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const { sequelize, Post } = require('./database.js')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

app.get('/', async (req, res) => {
	res.sendFile(path.join(__dirname + '/public/index.html'));
})

app.get('/post', async (req, res) => {
	await sequelize.sync()
	const allPosts = await Post.findAll()
	res.setHeader('Content-Type', 'application/json')
	res.send(JSON.stringify(allPosts))
})

app.post('/post', async (req, res) => {
	console.log(req.body)
	const req_title = req.body['title']
	const req_content = req.body['content']

	await sequelize.sync()
	const jane = await Post.create({
		title: req_title,
		content: req_content
	})

	res.send(jane.toJSON())
})

app.get('/post_delete', async (req, res) => {
	await sequelize.sync()
	await Post.destroy({
		where: {},
		truncate: true
	})
	res.setHeader('Content-Type', 'application/json')
	res.send(JSON.stringify({}))
})

app.get('*', async (req, res) => {
	res.status(404)
	res.send('404');
});

app.listen(8080)
