const { Schema, model } = require("mongoose");
const ProductSchema=Schema({
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
        required:true,
    },
    price:{
        type:Number,
        default:0
    },
    categorie:{
        type:Schema.Types.ObjectId,
        ref:'Categorie',
        required:true

    },
    description:{
        type:String
    },
    available:{
        type:Boolean,
        default:true
    }
    }

)
ProductSchema.method('toJSON',function(){
    const {_v,state,...data}=this.toObject();
    // categorie.id=_id;
 
    return data;
})

module.exports = model("Product", ProductSchema);