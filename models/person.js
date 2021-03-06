const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: {
       type: String,
       required: true,
       minlength:5,
       unique:true
    },
    number:{
        type:String,
        required:true,
        minlength:5
    } 
  })

  personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
  
  //const Persons = mongoose.model('Person', personSchema)

  module.exports = mongoose.model('Person', personSchema)
  


