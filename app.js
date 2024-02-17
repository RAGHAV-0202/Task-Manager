const express = require('express');
const app = express()
const tasks = require('./routes/routes')
const connectDB = require("./db/connect")
require('dotenv').config()
const errorHandler = require("./Middleware/error")
const notFound = require("./Middleware/not-found")

// app creates routes , routes sends the data in the form of controller and controller has the main content
//middleware

app.use(express.json())
app.use(express.static('./public'))

app.get("/" ,(req,res)=>{
    res.send("<h1>Task Manager app</h1>")
})

app.use("/api/v1/tasks" , tasks)
app.use(notFound)
app.use(errorHandler)
const start = async () =>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(5000,()=>{console.log("Listening on the port 5000.")})
    }catch(error){
        console.log(error)
    }
}

start()
