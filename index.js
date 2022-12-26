const express=require('express');
const cors=require('cors')
const { connect } = require('./db/connect');
const {getallTodos,craeteTodo, gettodobyid, deletetodo}=require('./db/todomodel');
const { authRouter } = require('./router/authRouter');


const app=express();
app.use(cors());
app.use('/auth',authRouter)
app.use(express.json());
app.get('/todos',async(req,res)=>{
      const todo=await getallTodos();
      res.send({data:todo})
});
app.post('/todos',async(req,res)=>{
    const tododata=req.body;
    const todo=await craeteTodo(tododata);
    return res.send({
        todo
    })
})
app.get('/todos/:id',async(req,res)=>{
    const id=req.params.id;
    const todo=await gettodobyid(id);
    return res.send({todo});
})
app.delete('/todos/:id',async(req,res)=>{
    const id=req.params.id;
    const todo=await deletetodo(id);
    if(todo){
        return res.send({todo});
        //return res.status(404).send({message:"Todo with given id does not exists"})
    }
    else {
        return res.status(404).send({message:"Todo with given id does not exists"})

    }

})
connect().then(()=>{
    app.listen(3000,()=>{
        console.log('listning on port 5000')
    });

})

