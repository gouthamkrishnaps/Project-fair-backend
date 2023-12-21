// import mongoose
const mongoose = require("mongoose")

// import validator
const validate =  require("validator")

//create schema - need to use schema class in mongoose
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:[6,'Must be atleast 3 character , got only {value}']
    },
    email:{
        type:String,
        require:true,
        unique:true,
        validate(value){
           if(!validate.isEmail(value)){
            throw new Error('Invalid Email')
           }
        }
    },
    password:{
        type:String,
        require:true
    },
    github:{
        type:String
    },
    linkedin:{
        type:String
    },
    profile:{
        type:String
    }
})

//create model
const users = mongoose.model("users",userSchema)

//export the model
module.exports = users