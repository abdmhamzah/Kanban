const { User, Task } = require('../models')

class ControllerTask {

    static showTasks(req, res){
        Task.findAll({
            include: User,
            order: [['id', 'asc']]
        })
            .then(tasks => {
                res.status(200).json({
                    statusCode: 200,
                    message: 'Succesfully show all tasks',
                    payload: tasks
                })
            })
            .catch(err => {
                res.status(500).json({
                    statusCode: 500,
                    message: 'Server Error'
                })
            })
    }

    static createTask(req, res){
        const { title, description, category } = req.body

        Task.create({
            title: title,
            description: description,
            category: category,
            UserId: req.UserId
        })
            .then(newTask => {
                if (newTask) {
                    res.status(200).json({
                        statusCode: 200,
                        message: 'New Task Succesfully Created',
                        payload: newTask
                    })
                } else {
                    res.status(400).json({
                        statusCode: 400,
                        message: 'Please Insert Task & Description',
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    statusCode: 500,
                    message: 'Server Error'
                })
            })
    }

    static updateTask(req, res){
        const { id } = req.params
        const { title, description, category } = req.body

        Task.findOne({
            where: {
                id: id,
                UserId: req.UserId
            }
        })
            .then(task => {
                if (!task) {
                    res.status(404).json({
                        statusCode: 404,
                        message: 'Task not Found'
                    })
                } else {
                    return task.update({
                        title: title,
                        description: description,
                        category: category,
                        UserId: req.UserId
                    })
                }
            })
            .then(updatedTask => {
                res.status(200).json({
                    statusCode: 200,
                    message: 'Task Succesfully Updated',
                    payload: updatedTask
                })
            })
            .catch(err => {
                res.status(500).json({
                    statusCode: 500,
                    message: 'Server Error'
                })
            })

    }

    static deleteTask(req, res){
        const { id } = req.params
        let deletedData 

        Task.findOne({
            where: {
                id: id,
                UserId: req.UserId
            }
        })
            .then(task => {
                if (!task) {
                    res.status(404).json({
                        statusCode: 404,
                        message: 'Task not Found'
                    })
                } else {
                    deletedData = task
                    return task.destroy()
                }
            })
            .then(() => {
                res.status(200).json({
                    statusCode: 200,
                    message: 'Task Succesfully Deleted',
                    payload: deletedData
                })
            })
            .catch(err => {
                console.log(err);
                
                res.status(500).json({
                    statusCode: 500,
                    message: 'Server Error'
                })
            })
    }
}

module.exports = ControllerTask