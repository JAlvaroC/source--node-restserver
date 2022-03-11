
const { Router } = require('express');
const { check } = require('express-validator');
const { fileLoad, UpdateImage,showImage, UpdateImageCloudinary } = require('../controllers/uploads');
const { colectionAllowed } = require('../helpers');
const { validateFields ,validateFileUp} = require('../middlewares');


const router = Router();

router.post('/',validateFileUp,
    fileLoad
)
router.put('/:collection/:id',
    [
    validateFileUp,
    check('id','The id must mongoDB').isMongoId(),
    check('collection').custom(c=>colectionAllowed(c,['users','products'])),
    validateFields
    ],
    UpdateImageCloudinary
)
    // UpdateImage
router.get('/:collection/:id',[
    check('id','The id must be of mongo').isMongoId(),
    check('collection').custom(c=>colectionAllowed(c,['users','products'])),
    validateFields
],showImage)



module.exports = router;
