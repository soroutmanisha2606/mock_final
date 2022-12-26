const mongoose=require('mongoose');
// const { reset } = require('nodemon');
async function connect(){
    return new Promise((resolve,reject)=>{
        mongoose.connect('mongodb://127.0.0.1:27017',(err)=>{
            if(err){
                console.log('error in connection with database')
                reject(err)
            }
            else {
            console.log('connected with db')
            resolve()
            }
        })
       
    })
}
module.exports={
    connect
}