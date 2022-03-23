const todo = require('../models/todo')

const router=require('express').Router()

router.post('/add',async(req,res)=>{
    const newtodo=new todo({
    Task:req.body.Task,
    Complete:req.body.Complete 
    });

    try{
       var newtask=await newtodo.save(); 
       res.status(200).send(newtask)
    }
    catch(err){
        res.status(500).json(err)
    }
})


router.get('/getall',async(req,res)=>{
    try{
        var tododata=await todo.find({}); 
    res.status(200).json(tododata)
    }
    catch(err){
        res.status(500).send(err)
    }
    
})


router.delete('/delete:id',async (req,res)=>{
    var id =req.params.id;
    try{
        var tododata=await todo.findByIdAndDelete(id)
        res.status(200).send("delete success")
    }
    catch(err){
        res.status(500).send(err)
    }
})


router.put('/put:id',async (req,res)=>{
    var id=req.params.id;
    try{
        var updatedtodo=await todo.findByIdAndUpdate(id,{$set:req.body},{new:true})
        res.status(200).send(updatedtodo)
    }
    catch(err){
        res.status(500).send(err)
    }
})




module.exports=router