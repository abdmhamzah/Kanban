const router = require('express').Router()
const routerUser = require('./routerUser')
const routerTask = require('./routerTask')

router.use('/user', routerUser)
router.use('/tasks', routerTask)

module.exports = router