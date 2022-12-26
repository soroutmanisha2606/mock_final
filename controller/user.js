const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const {usermodel} =require('../db/usermodel')
function gettoken(user){
    return jwt.sign(
        {
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
        },
        "manisha_secret_key"
    );
}
//const token1=token()
//console.log(token)
async function loginuser(req,res){
    const inuser=req.body;
    const {email,password}=inuser;
    const isAlreadyuser=await usermodel.findOne({
        email
    });
    if (isAlreadyuser){
        const isMatched=bcrypt.compareSync(password,isAlreadyuser.password);
        if (isMatched){
            const token=gettoken(isAlreadyuser);
            return res.send({
                status:"sucess",
                data:{token},
            });
        }else{
            return res.status(400).send({
                status: "error",
                message: "Invalid Credentials",
              });  
        }
    } else {
        return res.status(400).send({
          status: "error400",
          message: "Invalid Credentials",
        });
      }
}
async function register(req, res) {
    const user = req.body;
  
    let { name, email, password } = user;
  
    const isExistingUser = await usermodel.findOne({ email });
  
    if (isExistingUser) {
      return res.status(400).send({
        status: "error",
        message: "Email already linked with diffrent account.",
      });
    } else {
      console.log(password);
  
      password = bcrypt.hashSync(password);
      let isAdmin = email.includes("@");
      let user = await usermodel.create({
        name,
        email,
        password,
        isAdmin,
      });
      user = user.toJSON();
      delete user.password;
      let token = genToken(user);
      user.token = token;
      return res.send({
        status: "success",
        data: user,
      });
    }
  }

  module.exports={
    gettoken,
    register,
    loginuser
  }