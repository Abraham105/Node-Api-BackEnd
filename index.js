const express = require('express')
const cors = require('cors')
const app = express()

const logger = require('./loggerMiddleware')

app.use(cors())

app.use(express.json())

app.use(logger)

let notes = [
	
{
	"id": 1,
	"content" : "TEngo que estudiar mas",
	"date" : "2021-05-12",
	"important": false
},
{
	"id": 2,
	"content" : "TEngo que estudiar mas mucho",
	"date" : "2021-05-12",
	"important": false
},
{
	"id": 3,
	"content" : "TEngo que estudiar mas geografia",
	"date" : "2021-05-12",
	"important": false
},
{
	"id": 4,
	"content" : "TEngo que estudiar mas la concha de la lora",
	"date" : "2021-05-12",
	"important": false
}
]


// const app = http.createServer((request, response) =>{
// 	response.writeHead(200, {'Content-Type' : 'application/json' })
// 	response.end(JSON.stringify(notes))
// })

app.get('/',(request, response) =>{

	response.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (request,response) => {

	response.json(notes)
})

app.get('/api/notes/:id', (request,response) => {

	const id = Number(request.params.id)
	const note = notes.find(note => note.id === id)
	
	if (note) {
		response.json(note)
	}
	else{
		response.status(404).end()
	}

})

app.delete('/api/notes/:id',(request,response) =>{

	const id = Number(request.params.id)
	notes = notes.filter(note => note.id !== id)
	response.status(204).end()
})

app.post('/api/notes', (request,response) => {

	const note =request.body

	if (!note || !note.content) {

		return response.status(400).json({

			error: 'note.content is missing'
		})
	}
	
	const ids = notes.map(note => note.id)
	const maxId = Math.max(...ids)

	const newNote = {

		id: maxId + 1,
		content: note.content,
		important: note.important !== 'undefined' ? note.important : false,
		date: new Date().toISOString()

	}

	notes = [...notes, newNote]



	response.status(201).json(newNote)

})

app.use((request,response)=>{
	

	response.status(404).json({
		error:"NOT FOUND"
	})
	console.log("HE ENTRADO AQUI")
})


const PORT = 3001
app.listen(PORT, () =>{
	console.log('Server is runnig on port ${PORT}');
})


/// para correr el servidor npm run dev 