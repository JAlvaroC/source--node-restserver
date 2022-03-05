const jwt = require('jsonwebtoken');

const generateJWT=(uid='')=>{
    return new Promise((resolve,reject)=>{
        const payload={uid};
        jwt.sign(payload,process.env.SECRETORPRIIVATEKEY,{
            expiresIn:'4h'
        },(err,token)=>{
            if (err) {
                console.log(err)
                reject('Can not is generate the token')
            }else{
                resolve(token);
            }
            
        })
        // resolve()
    })
}
module.exports={
    generateJWT
}