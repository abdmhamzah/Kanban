const { checkPassword } = require('../helpers/bcrypt')
const { User } = require('../models')
const jwt = require('jsonwebtoken')
require('dotenv').config()

class ControllerUser {

    static signup(req, res){
        const { name, email, password } = req.body
        const newUserData = {
            name: name,
            email: email,
            password: password
        }
        
        User.create(newUserData)
            .then(newUser => {
                if(newUser){
                    res.status(200).json({
                        statusCode: 200,
                        message: 'Sign Up User Successfull',
                        payload: newUser
                    })
                } else {
                    res.status(400).json({
                        statusCode: 400,
                        message: 'Invalid Email / Password, Please try again'
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

    static signin(req, res){
        const { email, password } = req.body
        
        User.findOne({
            where: {
                email: email
            }
        })
            .then(user => {
                if (!user) {
                    res.status(404).json({
                        message: 'User not found, please register yourself'
                    })
                } else {
                    if (checkPassword(password, user.password)) {
                        const token = jwt.sign({
                            UserId: user.id,
                            email: email
                        }, process.env.JWT_SECRET)
                        res.status(200).json({
                            statusCode: 200,
                            message: 'Sign In User Successfull',
                            payload: {
                                token: token,
                                user: {
                                    name: user.name,
                                    email: user.email
                                }
                            }
                        })
                    } else {
                        res.status(400).json({
                            statusCode: 400,
                            message: 'Invalid Email / Password, Please try again'
                        })
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

    static signinGoogle(req, res){
        res.status(200).json({
            message: 'Halaman Signin Google'
        })
    }
}

module.exports = ControllerUser