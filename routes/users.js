
const { Router } = require('express');
const { check } = require('express-validator');


// const { validateFields } = require('../middlewares/validate-fields');
// const { validateJWT } = require('../middlewares/validate-jwt');
// const { isAdminRole, tieneRole } = require('../middlewares/validate-roles');
const {validateFields,validateJWT,isAdminRole,tieneRole}=require('../middlewares')
const {  isRoleValid,  emailExiste,  userExistsById,} = require('../helpers/db-validators');
const { userGet,
        userPut,
        userPost,
        userDelete,
        userPatch} = require('../controllers/users');

const router = Router();
router.get('/', userGet);
router.put('/:id',[
    check('id', 'Is not a ID valid').isMongoId(),
    check('id').custom(userExistsById),
    check('role').custom(isRoleValid),
    validateFields,
  ],userPut);

router.post('/',[
    check('name', 'The name is not  required').not().isEmpty(),
    check('password', 'El password bust bemore of 6 leters').isLength({min: 6 }),
    check('email', 'The email is not  required ').isEmail(),
    check('email').custom(emailExiste),
    // check('rol', 'Is not a role valide').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('role').custom(isRoleValid),
    validateFields
  ], userPost);

router.delete('/:id',[
    validateJWT,
    // isAdminRole,
    tieneRole('ADMIN_ROLE' ,'SALES_ROLE','OTRO_ROLE'),
    check('id', 'Is not a ID valid').isMongoId(),
    check('id').custom(userExistsById),
    validateFields,
  ], userDelete);
// const { validate } = require('../models/user');
router.patch('/', userPatch);





module.exports = router;
