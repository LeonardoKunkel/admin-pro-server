const router = require('express').Router()

const validation = require('../middlewares/segment-validation');
const jwtValidation = require('../middlewares/jwt-validation');

const medicCtrl = require('../controllers/medic.controller');
const { check } = require('express-validator');

router.get('/', medicCtrl.getMedics);

router.post('/create',
    [
        jwtValidation,
        check('name', 'Name of the medic is necessary').not().isEmpty(),
        check('hospital', 'Invalid hospital ID').isMongoId(),
        validation
    ],
    medicCtrl.createMedic
);

router.put('/:id',
    [
        jwtValidation,
        check('name', 'Name of the medic is necessary').not().isEmpty(),
        check('hospital', 'Invalid hospital ID').isMongoId(),
        validation
    ],
    medicCtrl.updateMedic
);

router.delete('/:id',
    [
        jwtValidation
    ],
    medicCtrl.deleteMedic
);

module.exports = router;