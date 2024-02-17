const Task = require('../models/task')
const express = require("express")
const contoller = express()
const asyncWrapper = require("../Middleware/async")

const getAllTasks = asyncWrapper( async (req, res) => {
    const tasks = await Task.find({})
    res.status(200).json({amount : tasks.length , tasks})
});

const createTask = asyncWrapper( async (req,res)=>{
    const task = await Task.create(req.body)
    res.status(201).json({task})
})

const getTask = asyncWrapper( async (req,res)=>{
    const {id:taskID} = req.params
    const task = await Task.findOne({_id : taskID});
    if(!task){
        return res.status(404).json({msg : "No task with that id found"})
    }
    res.status(200).json({task})
})

const updateTask = async (req,res)=>{
    try{
        const TaskID = req.params.id ;
        const task = await Task.findOneAndUpdate(TaskID , req.body , {
            new : true ,
            runValidator : true
        })
        if(!task){
            res.status(200).json({error : "invalid id"})
        }
        res.status(400).json({Updated : task})
    }catch(error){
        res.status(200).json({error : "encountered an error"})
    }
}

const deleteTask = async (req, res) => {    
    try {
        const taskID = req.params.id
        const task = await Task.findOneAndDelete({_id : taskID})
        if(!task){
            return res.status(404).json({msg : "invalid id"})
        }
        res.status(400).json({Deleted : task})
    } catch (error) {
        res.status(200).json({error : error})
    }
};

module.exports = {
    getAllTasks , createTask , getTask , updateTask , deleteTask
}