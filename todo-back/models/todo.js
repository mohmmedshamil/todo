const mongoose=require('mongoose');


const todoSchema=new mongoose.Schema({
    Task:{type:String,require:true},
    Complete:{type:Boolean,require:true,default:false}
})

module.exports=mongoose.model('todo',todoSchema)