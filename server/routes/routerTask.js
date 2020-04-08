const router = require('express').Router()
const ControllerTask = require('../controllers/controllerTask')

router.get('/', ControllerTask.showTasks)
router.post('/', ControllerTask.createTask)
router.put('/', ControllerTask.updateTask)
router.delete('/', ControllerTask.deleteTask)

module.exports = router