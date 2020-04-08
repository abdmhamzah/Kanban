const router = require('express').Router()
const ControllerUser = require('../controllers/controllerUser')

router.post('/signup', ControllerUser.signup)
router.post('/signin', ControllerUser.signin)
router.post('/signin-google', ControllerUser.signinGoogle)

module.exports = router