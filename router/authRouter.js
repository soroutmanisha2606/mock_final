//import { Router } from "expr
const Router=require('express');
//const { loginuser, register } = require('../usercontroler');
const { loginuser, register } = require('../controller/user');
// const { loginuser, register } = require('../controller/user');
const authRouter=Router();
authRouter.post('/login',loginuser);
authRouter.post('/register',register);
module.exports={
    authRouter
}