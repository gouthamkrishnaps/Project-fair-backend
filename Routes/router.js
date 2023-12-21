//path to resolve the client request

// 1) import express
const express = require('express')

//import controller
const userController = require('../Controllers/userController')

//import project controller
const projectController = require('../Controllers/projectController')

//import jwt middleware
const jwtMiddleware = require('../Middleware/jwtMiddleware')

//import multermiddleware
const multerConfig = require('../Middleware/multterMiddleware')

// 2) create an object for the class Router in express
const router = new express.Router()



// 3) path for resolving the request 
    // syntax - router.httprequest('path to resolve request',()=>{how to resolve the request \\(inside controller)// })
    // a) Register
    router.post('/user/register',userController.register)

    // b) Login
    router.post('/user/login',userController.login)

    // c) add project
    router.post('/project/add',jwtMiddleware,multerConfig.single('projectImage'),projectController.addProject)

    // d) get home project
    router.get('/project/home-project',projectController.getHomeProject)

    // e) get all project
    router.get('/project/all-project',jwtMiddleware,projectController.getAllProject)

    // f) get all user project
    router.get('/user/all-project',jwtMiddleware,projectController.getUserProject)

// 4) Export router
module.exports = router