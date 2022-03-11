const { response } = require("express");
const  fs = require("fs");
var cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)
const  path = require("path");
const { uploadFile } = require("../helpers");
const { User,Product } = require("../models");

const fileLoad = async(req, res = response) => {

  try {

    
    //   const name=await uploadFile(req.files,['txt','md'],'textos');
      const name=await uploadFile(req.files,undefined,'imgs');
    
     res.json({
         name 
         })

  } catch (msg) {
      res.status(400).json({
          msg
      })
      
  }
};

const UpdateImage=async(req,res=response)=>{
  

  const {id,collection}=req.params;
  let model;

  switch (collection) {
    case 'users':
        model=await User.findById(id)
        if(!model){
          return res.status(400).json({
            msg:`No exists a User with the id ${id}`
          })
        }
      break;
    
    case 'products':
        model=await Product.findById(id)
        if(!model){
          return res.status(400).json({
            msg:`No exists a Product with the id ${id}`
          })
        }
      break;
    
  
    default:
      return res.status(500).json({
        msg:'Se me olvido validar esto'
      });
  }

  //Clean image  prev

  if (model.img) {
    const pathImage=path.join(__dirname,'../uploads',collection,model.img)
    if (fs.existsSync(pathImage) ) {
      fs.unlinkSync(pathImage)
    }
  }
  const name = await uploadFile(req.files,undefined,collection);

  model.img  = name;

  await model.save();

  res.json({
    model
  })
}

const UpdateImageCloudinary=async(req,res=response)=>{
  

  const {id,collection}=req.params;
  let model;

  switch (collection) {
    case 'users':
        model=await User.findById(id)
        if(!model){
          return res.status(400).json({
            msg:`No exists a User with the id ${id}`
          })
        }
      break;
    
    case 'products':
        model=await Product.findById(id)
        if(!model){
          return res.status(400).json({
            msg:`No exists a Product with the id ${id}`
          })
        }
      break;
    
  
    default:
      return res.status(500).json({
        msg:'Se me olvido validar esto'
      });
  }

  //Clean image  prev

  if (model.img) {
    const nameArr=model.img.split('/');
    const name=nameArr[nameArr.length-1];
    const [public_id]=name.split('.')
    console.log(public_id)
    await cloudinary.uploader.destroy(public_id)
  }
  const {tempFilePath}=req.files.file;
  const {secure_url}= await cloudinary.uploader.upload(tempFilePath)
  model.img=secure_url;

  await model.save();

  res.json(model)

}




const showImage=async(req,res=response)=>{
  const {id,collection}=req.params;

  let model;

  switch (collection) {
    case 'users':
        model=await User.findById(id)
        if(!model){
          return res.status(400).json({
            msg:`No exists a User with the id ${id}`
          })
        }
      break;
    
    case 'products':
        model=await Product.findById(id)
        if(!model){
          return res.status(400).json({
            msg:`No exists a Product with the id ${id}`
          })
        }
      break;
    
  
    default:
      return res.status(500).json({
        msg:'Se me olvido validar esto'
      });
  }

  //Clean image  prev

  if (model.img) {
    const pathImage=path.join(__dirname,'../uploads',collection,model.img)
    if (fs.existsSync(pathImage) ) {
     return res.sendFile(pathImage)
    }
  }

  const pathImage=path.join(__dirname,'../assets/no-image.jpg')


      res.sendFile(pathImage)
  

}
module.exports = {
  fileLoad,
  UpdateImage,
  showImage,
  UpdateImageCloudinary
};
