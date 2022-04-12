const router = require('express').Router()
const { check } = require('express-validator');

const validation = require('../middlewares/segment-validation');
const jwtValidation = require('../middlewares/jwt-validation');

const authCtrl = require('../controllers/auth.controller');

router.post('/',
    [
        check('email', 'Email is necessary').isEmail(),
        check('password', 'Password is necessary').not().isEmpty(),
        validation
    ],
    authCtrl.login
)

router.get('/renew',
    jwtValidation,
    authCtrl.renewToken
)

module.exports = router;
