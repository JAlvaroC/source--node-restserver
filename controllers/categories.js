const { response } = require("express");
const {Categorie} = require("../models");

//obtener categoria-paginado-total-poopulate
const getCategories=async(req,res=response)=>{
    const { limit = 5, since = 0 } = req.query;
    const query = { state: true };
  
    const [overall, categories] = await Promise.all([
      Categorie.countDocuments(query),
      Categorie.find(query).populate('user','name').skip(Number(since)).limit(Number(limit)),
    ]);
  
    res.json(categories)
}
const getCategorie=async(req,res=response)=>{
    const {id} =req.params;
    const categories=await Categorie.findById(id).populate('user','name');
    res.json(categories
    )
}

const createCategories=async(req,res=response)=>{
    // console.log(req.body)
    const name=req.body.name.toUpperCase();

    const categorieDB=await Categorie.findOne({name});
    if (categorieDB) {
        return res.status(400).json({
            msg:`La categoria ${categorieDB.name} ,ya existe`
        })
    }
    //generar  la data a guardar
    const data={
        name,
        user:req.user._id

    }
    const categorie=new Categorie(data);
    //guardar DB
    await categorie.save();

    // const categorie=new Categorie(req.body)
    // console.log(categorie)
    res.status(201).json({
        categorie
    })
}
const actualizarCategories=async(req,res=response)=>{
    const {id}=req.params;
    const {state,user,...data}=req.body;
    data.name=data.name.toUpperCase();
    data.user=req.user._id;
    const categorie=await Categorie.findByIdAndUpdate(id,data,{new:true})
    res.json(categorie)

}
const deleteCategorie=async(req,res=response)=>{
    const {id}=req.params;
    const categorieDelete=await Categorie.findByIdAndUpdate(id,{state:false},{new:true})
    res.json(categorieDelete)
}

module.exports={
    createCategories,
    getCategories,
    actualizarCategories,
    getCategorie,
    deleteCategorie
}