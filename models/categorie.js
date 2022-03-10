const { Schema,model } = require("mongoose");

const CategorieSchema=Schema({

    name:{
        type:String,
        required:[true,'the name is required'],
        unique:true
    },
    state:{
        type:Boolean,
        default:true,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        require:true
    }

})

CategorieSchema.method('toJSON',function(){
    const {_v,state,...data}=this.toObject();
    // categorie.id=_id;
 
    return data;
})
module.exports=model("Categorie",CategorieSchema)