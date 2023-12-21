//import mongoose
const mongoose = require('mongoose')

//connection string of mongoose
const connectionString = process.env.DATABASE

//connnect to mongodb using mongoose
mongoose.connect(connectionString).then(()=>{
    console.log("MongoDB Connected Succesfully");
}).catch((err)=>{
    console.log(`MongoDB Connection Failed Due to : ${err}`);
})