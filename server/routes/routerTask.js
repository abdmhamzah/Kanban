const router = require('express').Router()
const ControllerTask = require('../controllers/controllerTask')
const authentication = require('../middlewares/authentication')

router.get('/', authentication, ControllerTask.showTasks)
router.post('/', authentication, ControllerTask.createTask)
router.put('/', ControllerTask.updateTask)
router.delete('/', ControllerTask.deleteTask)

module.exports = router