const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    isAdmin:Boolean,
    password:{
        type:String,
        minLength:8
    }
});
const usermodel=mongoose.model('users',userSchema);
module.exports={
    usermodel
}