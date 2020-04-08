const router = require('express').Router()
const ControllerUser = require('../controllers/controllerUser')

router.get('/signup', ControllerUser.signup)
router.get('/signin', ControllerUser.signin)
router.get('/signin-google', ControllerUser.signinGoogle)

module.exports = router