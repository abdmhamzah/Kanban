const router = require('express').Router()
const ControllerTask = require('../controllers/controllerTask')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.get('/', authentication, ControllerTask.showTasks)
router.post('/', authentication, ControllerTask.createTask)
router.put('/:id', authentication, authorization, ControllerTask.updateTask)
router.delete('/:id', authentication, authorization, ControllerTask.deleteTask)

module.exports = router