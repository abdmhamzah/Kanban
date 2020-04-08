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
                        message: 'New Task Created Succesfully',
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
        res.status(200).json({
            msg: 'Halaman Update Task'
        })
    }

    static deleteTask(req, res){
        res.status(200).json({
            msg: 'Halaman Delete Task'
        })
    }
}

module.exports = ControllerTask