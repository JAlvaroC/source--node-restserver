const path=require('path');
const { v4: uuidv4 } = require('uuid');
const { response } = require("express");

const uploadFile=(files,extensionValid=['png','jpg','jpeg','gif'],folder='')=>{

    return new Promise((resolve,reject)=>{
        const {file} = files;
        const cutName=file.name.split('.');
        const extension=cutName[cutName.length-1];
      
        //validate the extension
        if (!extensionValid.includes(extension)) {
            return reject(`the extension ${extension}  is not  allowed ${extensionValid}`)
        }
      
      
      //   console.log(cutName)
        console.log(extension)
        const nameTemp=uuidv4()+'.'+extension; 
        const uploadPath = path.join(__dirname , "../uploads/" ,folder ,nameTemp);
      
        file.mv(uploadPath, function (err) {
          if (err) {

             return  reject(err)
         
          }
        resolve(nameTemp);
       
        });
    })

}
module.exports={
    uploadFile
}