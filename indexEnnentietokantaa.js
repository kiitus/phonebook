
  let persons=  [
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Teemu Tapani",
      "number": "050376878",
      "id": 5
    },
    {
      "name": "Janne Lammi",
      "number": "testi",
      "id": 6
    },
    {
      "name": "Toni Wirtanen",
      "number": "314124",
      "id": 7
    },
    {
      "name": "Elina Tapani",
      "number": "034214",
      "id": 9
    },
    {
      "name": "Jaakko Salo",
      "number": "2142412",
      "id": 10
    },
    {
      "name": "Jarkko Martikainen",
      "number": "214",
      "id": 11
    },
    {
      "name": "Saku Koivu",
      "number": "01412",
      "id": 12
    },
    {
      "name": "Marjo Latvalainen",
      "number": "31441",
      "id": 13
    }
  ]


const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose');

app.use(express.json()) 
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('build'))

app.get('/api/persons', (request, response) => {

  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(note => note.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id',(req,res)=>
{
  const id = Number(req.params.id)
  persons = persons.filter((person)=>{
    return person.id !== id;
  })
  res.status(204).end()
})


const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}


app.post('/api/persons', (request, response) => {
 
  const body = request.body
  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  }

  if (!body.number) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  }
    

    const index = persons.findIndex((i)=>{ 
      return i.name.toLowerCase() === body.name.toLowerCase()
    })
    if(index !==-1)
    {
      return response.status(400).json({ 
        error: 'name was already included' 
      })
    }
  

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
})

app.get('/info', (req, res)=>
{
res.send("Phonebook has "+persons.length + " numbers <br/> Now is " +Date(Date.now()).toString())
})


const port = process.env.PORT || 3001
const database_url = 'mongodb+srv://kiitus:m2f69JomE4CdMcSP@cluster0-ppj5g.mongodb.net/Persons?retryWrites=true&w=majority'

mongoose.connect(database_url,{
  useCreateIndex: true,
  useUnifiedTopology:true,
  useNewUrlParser:true,
  useFindAndModify:false
  }).then(()=>{
      console.log("database connected");
   app.listen(port);
   console.log(`Server running on port ${port}`)
  }).catch((err)=>{
  console.log(err);
  });



