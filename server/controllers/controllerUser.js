

class ControllerUser {

    static signup(req, res){
        res.status(200).json({
            msg: 'Halaman Signup'
        })
    }

    static signin(req, res){
        res.status(200).json({
            msg: 'Halaman Signin'
        })
    }

    static signinGoogle(req, res){
        res.status(200).json({
            msg: 'Halaman Signin Google'
        })
    }
}

module.exports = ControllerUser