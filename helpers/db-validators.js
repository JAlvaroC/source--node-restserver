const Role = require("../models/role");
const User = require("../models/user");

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
module.exports = {
  isRoleValid,
  emailExiste,
  userExistsById,
};
