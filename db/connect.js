const mongoose=require('mongoose');
// const { reset } = require('nodemon');
async function connect(){
    return new Promise((resolve,reject)=>{
        mongoose.connect('mongodb+srv://manisha123:manisha123@cluster0.tfr1v5n.mongodb.net/?retryWrites=true&w=majority',(err)=>{
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