const { response } = require("express");
const bcryptjs = require("bcryptjs");

const User = require('../models/user');

const { generateJWT } = require("../helpers/generate-JWT");
const { googleVerify } = require("../helpers/google-verify");




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
const googleSignin=async(req,res=response)=>{

        const {id_token}=req.body;
  
        try {

            // const  google= await googleVerify(id_token);
            // console.log(google);
            const  {email,name,img} = await googleVerify(id_token);

    
            let user = await User.findOne({email});
            console.log(user);


            if(!user){
                const data = {
                    name,
                    email,
                    // role: DefaultTransporter,
                    password:':P',
                    img,
                    google:true

                };
                console.log(data);
                user = new User(data);
                await user.save();
                console.log('creado');
            }
            
            if(!user.state){
                return res.status(401).json({
                    msg:'hable con el administrador,usuario bloqueado'
                })
            }
            const token=await generateJWT(user.id)

            res.json({
                
                user,
                token
                
            })
        } catch (error) {
             res.status(400).json({
                    ok:false,
                    msg:'Token de Google no es válido'
            })
        }
}
module.exports={
    login,
    googleSignin
}