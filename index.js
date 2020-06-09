
const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose');
require('dotenv').config()

const Person = require('./models/person')

app.use(express.json()) 
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('build'))

app.get('/api/persons', (request, response) => {

  Person.find({}).then(persons => {
    response.json(persons)
})})

app.get('/api/persons/:id', (request, response,next) => {
  //const id = Number();
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  }) .catch(error => next(error))
})

app.delete('/api/persons/:id',(req,res,next)=>
{
  
  //const id = Number(req.params.id)

  Person.findByIdAndDelete({_id:req.params.id}).then(()=>{
    res.status(204).end()
  }).catch(error => next(error))
 
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})


app.post('/api/persons', (request, response,next) => {
 
  const body = request.body

  if (body.name === undefined || body.number ===undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  }).catch(error => next(error))
})



app.get('/info', (req, res)=>
{
  Person.find({}).then(persons => {
res.send("Phonebook has "+persons.length + " numbers <br/> Now is " +Date(Date.now()).toString())
  })
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// olemattomien osoitteiden käsittely
app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }else if(error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const port = process.env.PORT || 3001
//const database_url = 'mongodb+srv://kiitus:m2f69JomE4CdMcSP@cluster0-ppj5g.mongodb.net/Persons?retryWrites=true&w=majority'

const database_url = process.env.MONGODB_URI

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
