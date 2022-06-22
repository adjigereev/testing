require('dotenv').config()
const jwt = require('jsonwebtoken')



let authCheck = async (req, res, next) => {
    if (req.method === "OPTIONS") {
        next()
    }
   
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) return res.status(401).json('Вы не авторизованны')
        const decode = jwt.verify(token, process.env.SEKRET_KEY)
        req.user = decode
        req.token = token
        next()
    } catch (e) {
        return res.status(401).json('Вы не авторизованны')
    }
}
module.exports = {
    authCheck
}