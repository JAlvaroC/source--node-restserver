const {Router}=require('express');
const { search } = require('../controllers/search');

const router=Router();
router.get('/:colection/:term',search)
console.log('hola ')

module.exports=router;
