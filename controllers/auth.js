const bcryptjs = require("bcryptjs");

const { response } = require("express");
const { generateJWT } = require("../database/generate-JWT");
const User = require('../models/user');



const login=async(req,res=response)=>{

    const {email,password}=req.body;

    try {
        //check if the email exists
        const user=await User.findOne({email})
        
        if (!user) {
            return res.status(400).json({
                msg:'User/Password is not correct - email'
            })
        }
        //if the user is  active
        if (!user.state) {
            return res.status(400).json({
                msg:'User/Password is not corect -state:false'
            })
        }
        //check the password
        const validPassword=bcryptjs.compareSync(password,user.password)
        if (!validPassword) {
            return res.status(400).json({
                msg:'User/Password is not corect -pasword'
            })
        }
        //generate the JWT
        const token = await generateJWT(user.id);
        res.json({
          user,
          token
      
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:'Hable con el administrador',

        })
        
    }
}
module.exports={
    login
}