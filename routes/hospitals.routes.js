const router = require('express').Router()

const validation = require('../middlewares/segment-validation');
const jwtValidation = require('../middlewares/jwt-validation');

const hospitalCtrl = require('../controllers/hospital.controller');
const { check } = require('express-validator');

router.get('/', hospitalCtrl.getHospitals);

router.post('/create',
    [
        jwtValidation,
        check('name', 'Name of the hospital is necessary').not().isEmpty(),
        validation
    ],
    hospitalCtrl.createHospital
);

router.put('/:id',
    [
        jwtValidation,
        check('name', 'Name of the hospital is necessary').not().isEmpty(),
        validation
    ],
    hospitalCtrl.updateHospital
);

router.delete('/:id',
    [
        jwtValidation
    ],
    hospitalCtrl.deleteHospital
);

module.exports = router;
