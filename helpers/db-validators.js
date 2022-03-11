
const Role = require("../models/role");
const {User,Categorie, Product} = require("../models");

const isRoleValid = async (role = "") => {
  const existeRol = await Role.findOne({ role });
  if (!existeRol) {
    throw new Error(`El rol ${role} no está registrado en la BD`);
  }
};
const emailExiste = async (email = "") => {
  //Verificar  si el correo existe
  const existeEmail = await User.findOne({ email });
  if (existeEmail) {
    throw new Error(`The email: ${email}, is already registered`);
  }
};
const userExistsById = async (id) => {
  // Verificar si el correo existe
  const existsUser = await User.findById(id);
  if (!existsUser) {
    throw new Error(`The id no exists ${id}`);
  }
};
const categorieExistsById=async(id)=>{
  const exitsCategorie=await Categorie.findById(id);
  if(!exitsCategorie){
    throw new Error(`The id no exixts ${id}`)
  }
  // console.log('LLega')
}
const productExistsById=async(id)=>{
  const exitsProduct=await Product.findById(id);
  if(!exitsProduct){
    throw new Error(`The id no exixts ${id}`)
  }
  // console.log('LLega')
}

const colectionAllowed=(collection='',collections=[])=>{
  const included=collections.includes(collection)
  if (!included) {
    throw new Error(`The colection ${collection} is not allowed,${collections}`)
  }
  return true
}
module.exports = {
  isRoleValid,
  emailExiste,
  userExistsById,
  categorieExistsById,
  productExistsById,
  colectionAllowed
};
