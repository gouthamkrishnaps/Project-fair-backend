//import model
const users = require('../Models/userSchema')

//import jwt
const jwt =require('jsonwebtoken')

// logic for register
exports.register = async(req,res)=>{
    //logic
    console.log('inside user controller register logic');
    //destruecturing data from client request body(since json format in converted to javascript object by the .json() method used in index.js file)
    
        const {username,email,password} = req.body
    try{
        //since email is the unique value we are checking that email is already parent in the databse 
        //for that we are using findone method which return entire document when the condition is true else it returns null
        const existingUser = await users.findOne({email})
        if(existingUser){

            //if the findone returns documnets it means that user is already exist
            //so we are sending a response in 400 series (client request error)
            res.status(406).json('Account already exist.....please login')
        }
        else{

            //if findone returns null it means the email o user doesnt exist in the databse
            //we register the user
            const newUser = new users({
                username, //only use one word if both key and value name is same
                email,
                password,
                github:"",
                linkedin:"",
                profile:""
            })
            //inorder to add above object use save method in mongoose
            await newUser.save()

            //response
            res.status(200).json(newUser)
        }
    }
    catch(err){
        res.status(401).json('Resgiter request failed due to',err)
    }
    
}

// logic for login
exports.login = async(req,res)=>{
    console.log('inside user controller login logic');
    //console.log(req.body);
    const {email,password} =req.body
    //console.log(req.body);
   try{ 
    const existingUser = await users.findOne({email,password})
    if(existingUser){
        //sign is the function used to create token 
        //first argument is payload, payload is the information that is sexcretly transmitted
        //second arguemnt - secret key - based on which the token is generated 
        const token = jwt.sign({userId: existingUser._id},"secretkey123")
        res.status(200).json({
            existingUser , token
        })
    }
    else{
        res.status(404).json('Invalid email id or password')
    }
    }
    catch(err){
        res.status(401).json('login failed due to ',err)
    }
}

//edit profile
exports.editUser = async(req,res)=>{
    const userId = req.payload
    const {username,email,password,github,linkedin,profile} = req.body

    const profileImage = req.file?req.file.filename:profile

    try{
        const updateUser = await users.findByIdAndUpdate({_id:userId},{username,email,password,github,linkedin,profile:profileImage},{new:true})

        await updateUser.save()
        res.status(200).json(updateUser)
    } catch(err){
        res.status(401).json(err)
    }
}