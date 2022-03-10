
const { Router } = require('express');
const { check } = require('express-validator');
const res = require('express/lib/response');
const { createCategories, getCategories, getCategorie, actualizarCategories, deleteCategorie } = require('../controllers/categories');
const { getProduct, actualizarProduct, deleteProduct, getProducts } = require('../controllers/products');
const { categorieExistsById, productExistsById } = require('../helpers/db-validators');
const { validateJWT, validateFields, isAdminRole } = require('../middlewares');


const router = Router();


//obtener todas las categorias -public
router.get('/',getCategories)
//obtener una categorias por id
router.get('/:id',[
    check('id','No es un id de Mongo valid').isMongoId(),
    check('id').custom(productExistsById),
    validateFields
],  getCategorie
)
//Crear categoria-privado -cualquier persona
router.post('/',[
    validateJWT,
    check('name','The name is required').not().isEmpty(),

validateFields],
createCategories)
//Actualizar - primado-cuaqluier con token valiudo
router.put('/:id',[
    validateJWT,
    check('categorie','No es un id de mongo').isMongoId(), 
    check('id').custom(productExistsById),
    validateFields
],actualizarCategories)

//Delete a categories - 
router.delete('/:id',[
    validateJWT,
    isAdminRole,
    check('id','No es un id de Mongo valid').isMongoId(),
    check('id').custom(productExistsById),
    validateFields


],

deleteProduct
)

module.exports = router;

