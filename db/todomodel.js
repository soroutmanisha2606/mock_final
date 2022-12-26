// const { Schema } = require('mongoose');
const mongoose =require('mongoose');
const todoSchema=new mongoose.Schema({
    taskname:String,
    status:Boolean,
    tag:String
})
const Todomodel=mongoose.model('todos',todoSchema);
// module.exports={
//     Todomodel
// }
async function getallTodos(){
    const Todo=await Todomodel.find();
    return Todo;
}
async function craeteTodo(tododata){
    const Todo=Todomodel.create({
        ...tododata
    })
    return Todo;
}
async function gettodobyid(id){
    const todo=Todomodel.findById(id);
    return todo;
}
async function deletetodo(id){
    const todoid=await Todomodel.findById(id);
    if(todoid){
        await todoid.delete();
        return todoid;
    }else {
        return null;
    }
}
async function updatetodo(id,body){

}
module.exports={
    getallTodos,
    craeteTodo,
    gettodobyid,
    deletetodo,
    updatetodo
}