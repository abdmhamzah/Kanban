const { Task } = require('../models')

const authorization = (req, res, next) => {
    const id = req.params.id
    Task.findOne({
        where: {
            id: id
        }
    })
        .then(task => {
            if(!task){
                res.status(404).json({
                    statusCode: 404,
                    message: 'Task ID not found'
                })
            } else {
                if (task.UserId != req.UserId) {
                    console.log({task: task.UserId, global: req.UserId});
                    res.status(403).json({
                        statusCode: 403,
                        message: 'You have no permit'
                    })
                } else {
                    console.log({task: task.UserId, global: req.UserId});
                    next()
                }
            }
        })
        .catch(err => {
            res.status(500).json({
                statusCode: 500,
                message: 'Server Error'
            })
        })
}

module.exports = authorization