const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors');
const router = require('./Routes/todoRoute');
const app=express();


const connection_string="mongodb://localhost:27017/Todo"

app.use(express.json())

app.use(cors())

mongoose.connect(connection_string);

app.use('/api/todo',router);


app.listen(5000,()=>{
    console.log("server connection success")
})


