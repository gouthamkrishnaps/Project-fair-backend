//import mangoose

const mongoose = require('mongoose')

//create schema - need to use schema class in mongoose
const projectSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    projectImage:{
        type:String,
        require:true
    },
    language:{
        type:String,
        require:true
    },
    github:{
        type:String,
        require:true
    },
    website:{
        type:String,
        require:true
    },
    overView:{
        type:String,
        require:true
    },
    userId:{
        type:String,
        require:true
    }
})

const projects = mongoose.model("projects",projectSchema)

module.exports = projects