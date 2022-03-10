const { response } = require("express");
const { ObjectId } = require("mongoose").Types;
const { User ,Categorie,Product} = require("../models");



const colectionAllowed=[
    'users',
    'categories',
    'products',
    'roles'
];
const searchUser=async(term='',res=response)=>{
    const isMongoId=ObjectId.isValid(term);
    if (isMongoId) {
        const user=await User.findById(term);
        return res.json({
            results:(user)?[user]:[],
        });
    }
    const regex=new RegExp(term,'i')

    const user=await User.find({
        // $or:[ {name:regex,state:true},{email:regex,state:true}]
        $or:[ {name:regex},{email:regex}],
        $and:[ {state:true}]
       
    
    })
    res.json({
        results:user
    })
}
const searchCategories=async(term='',res=response)=>{
    const isMongoId=ObjectId.isValid(term);
    if (isMongoId) {
        const categorie=await Categorie.findById(term);
        return res.json({
            results:(categorie)?[categorie]:[],
        });
    }
    const regex=new RegExp(term,'i')

    const categories=await Categorie.find( {name:regex,state:true})
    res.json({
        results:categories
    })
}
const searchProducts=async(term='',res=response)=>{
    const isMongoId=ObjectId.isValid(term);
    if (isMongoId) {
        const product=await Product.findById(term)
                                    .populate('categorie','name');
        return res.json({
            results:(product)?[product]:[],
        });
    }
    const regex=new RegExp(term,'i')

    const products=await Product.find({name:regex,state:true})
                                .populate('categorie','name');
    res.json({
        results:products
    })
}

const search=(req,res=response)=>{
    const {colection,term}=req.params;

    if(!colectionAllowed.includes(colection)){
        return res.status(400).json({
            msg:`The colection allow are:  ${colectionAllowed}`
        })
    }
    switch (colection) {
    case 'users':
        searchUser(term,res)
        break;        
    case 'categories':
        searchCategories(term,res)
        break;
        case 'products':
        searchProducts(term,res)
            break;       
    default:
        res.status(500).json({
            msg:'Se le olvido hacer esta busqueda'
        })
        break;
    }

}
module.exports={
    search
}