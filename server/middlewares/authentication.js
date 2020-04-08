
require('dotenv').config()
const jwt = require('jsonwebtoken')

const authentication = (req, res, next) => {
    try {
        const token = req.headers.token
        if (token) {
            console.log(token);
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.UserId = decoded.UserId // NYIMPEN ID DI PARAMETER GLOBAL
            next()
        } else {
            res.status(404).json({
                statusCode: 404,
                message: 'Token not found'
            })
        }
    } catch (err) {
        res.status(400).json({
            statusCode: 400,
            message: 'Invalid Token'
        })
    }
}


module.exports = authentication