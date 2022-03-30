const { request } = require('express');
const { response } = require('express')
const jwt=require('jsonwebtoken')
const User=require('../models/user')
const validateJWT=async(req=request,res=response,next)=>{
    const token=req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg:'There is no token in the request.'
        });
    }
    try {
        const {uid}=jwt.verify(token,process.env.SECRETORPRIVATEKEY)
        // console.log(payload)
        const user=await User.findById(uid);
        if (!user) {
            return res.status(401).json({
                msg:'token is not valide -user is not exists in DB '
            })
        }
        //verificar 
            if (!user.state) {
                return res.status(401).json({
                    msg:'token is not valide -user state false'
                })
                
            }
        req.user=user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg:'The token is not valide'
        });
    }
  
}
module.exports={
    validateJWT
}