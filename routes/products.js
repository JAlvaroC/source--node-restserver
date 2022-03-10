
const { Router } = require('express');
const { check } = require('express-validator');
const { validateJWT, validateFields, isAdminRole } = require('../middlewares');

const { createProducts, getProducts, getProduct, actualizarProducts, deleteProduct } = require('../controllers/products');
const { categorieExistsById, productExistsById } = require('../helpers/db-validators');


const router = Router();


//obtener todas las categorias -public
router.get('/',getProducts)
//obtener una categorias por id
router.get('/:id',[
    check('id','No es un id de Mongo valid').isMongoId(),
    check('id').custom(categorieExistsById),
    validateFields
],  getProduct);

//Crear categoria-privado -cualquier persona
router.post('/',[
    validateJWT,
    check('name','The name is required').not().isEmpty(),
    check('categorie','No es un id de Mongo').isMongoId(),
    check('categorie').custom( categorieExistsById ),
    validateFields
],
createProducts
)
//Actualizar - primado-cuaqluier con token valiudo
router.put('/:id',[
    validateJWT,
    // check('categorie','No es un id de Mongo').isMongoId(),
    // check('name','the name  is required').not().isEmpty(),
    check('id').custom(productExistsById),
    validateFields
],actualizarProducts)

//Delete a categories - 
router.delete('/:id',[
    validateJWT,
    isAdminRole,
    check('id','No es un id de Mongo valid').isMongoId(),
    check('id').custom(productExistsById),
    validateFields


],

deleteProduct)

module.exports = router;

