require("dotenv").config()
const userModel = require("../model/user.model")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const generatorToken = (id) => {
    return jwt.sign(
        { id },
        process.env.SEKRET_KEY,
        { expiresIn: "600h" }
    )
}
class UserController {
    async createUser(req, res) {
        const token = generatorToken(req.body.id)
        const hashpassword = await bcrypt.hash(req.body.password, 6)
        await userModel.create({
            id: req.body.id,
            password: hashpassword,
            refresh: token
        })
        try {
            res.status(201).json({ accessToken: token, refreshToken: token })
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
    async authUser(req, res) {
        const { id, password } = req.body
        const userSelect = await userModel.findOne({ where: { id } })
        if (!userSelect) return res.status(401).json('Пользователь не найден')
        const hashPassword = bcrypt.compareSync(password, userSelect.password)
        if (!hashPassword) return res.status(401).json('Пароль не верный')
        const token = await generatorToken(userSelect.id)
        await userModel.update({ refresh: token }, { where: { id: userSelect.id } })
        res.json({ accessToken: token, refreshToken: token }).status(300)
    }
    async updateToken(req, res) {
        const user = await userModel.findOne({ where: { refresh: req.body.refreshToken } })
        if (!user) {
            return res.status(500).json("Токен не найден")
        }
        const token = await generatorToken(user.id)
        await user.update({ refresh: token })

        res.status(200).json({ accessToken: token, refreshToken: token })
    }
    async getIdUser(req, res) {
        res.status(200).json(req.user.id)
    }
    async logoutUser(req, res) {
        await userModel.update({ refresh: '' }, { where: { id: req.user.id } })
        jwt.destroy(req.token)
    }
}
module.exports = new UserController()