const router = require('express').Router()

const jwtValidation = require('../middlewares/jwt-validation');

const searchCtrl = require('../controllers/search.controller');

router.get('/:search', jwtValidation, searchCtrl.getAll);

router.get('/collection/:table/:search', jwtValidation, searchCtrl.getCollection);

module.exports = router;
