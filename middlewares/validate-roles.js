const { response } = require("express")

const isAdminRole=(req,res=response,next)=>{
    if (!req.user) {
        return res.status(500).json({
            msg:'Se quiere verificar el role sin validar el toke primero'
        })
    }
    const {role,name}=req.user;
    if (role!=='ADMIN_ROLE') {
        return res.status(401).json({
            msgname:`${name} is not admin -Can not do it`
        });
        
        next();
    }


    
    next();
}
const tieneRole=(...roles)=>{
    return (req,res=response,next)=>{
        // console.log(roles,req.user.role)
        if (!req.user) {
            return res.status(500).json({
                msg:'Se quiere verificar el role sin validar el toke primero'
            })
            
        }
        
        
        if (roles.includes(req.user.role)) {
            
            return res.status(401).json({
                msg:` The service required a of this roles ${roles}`
            });
            
        }
        next();
    }

}
module.exports={
    isAdminRole,
    tieneRole
}