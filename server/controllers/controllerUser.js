const { checkPassword } = require('../helpers/bcrypt')
const { User } = require('../models')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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
        const token = req.body.token
        const user = {}
        client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
            .then(data => {
                const payload = data.getPayload()
                // console.log(payload);
                user.name = payload.name
                user.email = payload.email
                user.password = process.env.DEF_PASS

                return User.findOne({
                    where: {
                        email: email
                    }
                })
            })
            .then(userData => {
                if (!userData) {
                    return User.create(user)
                } else {
                    return userData
                }
            })
            .then(userLogin => {
                const userObj = {
                    UserId: userLogin.id,
                    email: userLogin.email
                }
                const token = jwt.sign(userObj, process.env.JWT_SECRET)
                res.status(200).json({
                    statusCode: 200,
                    message: 'Sign In User Successfull',
                    payload: {
                        token: token,
                        user: {
                            name: userLogin.name,
                            email: userLogin.email
                        }
                    }
                })
            })
            .catch(err => {
                res.status(500).json({
                    statusCode: 500,
                    message: 'Server Error'
                })
            })
    }
}

module.exports = ControllerUser