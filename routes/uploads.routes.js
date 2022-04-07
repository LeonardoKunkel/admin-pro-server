const router = require('express').Router()

const fileUpload = require('express-fileupload');

const jwtValidation = require('../middlewares/jwt-validation');

const uploadCtrl = require('../controllers/upload.controller');

router.use( fileUpload() );

router.put('/:type/:id', jwtValidation, uploadCtrl.fileUpload);

router.get('/:type/:photo', uploadCtrl.returnFile);

module.exports = router;