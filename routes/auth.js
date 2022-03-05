
const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');


const router = Router();
// router.get('/', );

router.post('/login',[
    check('email','The email is required').isEmail(),
    check('password','the password is required').not().isEmpty(),
    
    validateFields
],
login);


module.exports = router;
