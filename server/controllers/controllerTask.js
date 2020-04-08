

class ControllerTask {

    static showTasks(req, res){
        res.status(200).json({
            msg: 'Halaman Show Task'
        })
    }

    static createTask(req, res){
        res.status(200).json({
            msg: 'Halaman Create Task'
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