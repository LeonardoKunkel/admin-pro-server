const router = require('express').Router()
const { check } = require('express-validator');

const validation = require('../middlewares/segment-validation');
const { jwtValidation, adminValidation, adminOrSameUserValidation } = require('../middlewares/jwt-validation');

const userCtrl = require('../controllers/users.controller');

router.get('/', jwtValidation, userCtrl.getUsers);

router.post('/create',
    [
        check('name', 'Name is necessary').not().isEmpty(),
        check('password', 'Password is necessary').not().isEmpty(),
        check('email', 'Email is necessary').isEmail(),
        validation
    ],
    userCtrl.createUser
)

router.put('/:id',
    [
        jwtValidation,
        adminOrSameUserValidation,
        check('name', 'Name is necessary').not().isEmpty(),
        check('email', 'Email is necessary').isEmail(),
        check('role', 'Role is necessary').not().isEmpty(),
        validation
    ],
    userCtrl.updateUser
)

router.delete('/delete/:id',[jwtValidation, adminValidation], userCtrl.deleteUser)

module.exports = router;
