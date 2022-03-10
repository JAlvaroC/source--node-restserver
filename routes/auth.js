
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { login, googleSignin } = require('../controllers/auth');


const router = Router();

router.post('/login',[
    check('email','The email is required').isEmail(),
    check('password','the password is required').not().isEmpty(),   
    validateFields
],
login);
router.post('/google',[
    check('id_token','The token  is necesary').not().isEmpty(),
    validateFields
],googleSignin);
router.post('/google',[
    check('id_token','The token  is necesary').not().isEmpty(),
    validateFields
],googleSignin);



module.exports = router;
