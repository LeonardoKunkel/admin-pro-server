const router = require('express').Router()

const userCtrl = require('../controllers/users.controller')

router.get('/', userCtrl.getUsers);

router.post('/create', userCtrl.createUser)

module.exports = router;
