const fileModel = require('../model/file.model')
let fs = require("fs");
const path = require('path');
let http = require('http');
class FileController {
    async createFile(req, res) {
        const newFile = await fileModel.create({
            name: req.file.filename,
            extension: req.file.filename.split('.')[1],
            mimeType: req.file.mimetype,
            size: req.file.size
        })
        try {
            res.status(201).json(newFile)
        } catch (error) {
            res.status(500).json(error)
        }
    }
    async getFile(req, res) {
        const page = req.query.page || 1
        const list_size = req.query.list_size || 1
        const offset = page * list_size - list_size
        const getFiles = await fileModel.findAndCountAll({ limit: +list_size, offset: +offset })
        res.status(200).json(getFiles)
    }
    async deleteFile(req, res) {
        const id = req.params.id
        const getFile = await fileModel.findOne({ where: { id: id } })
        if (!getFile) {
            res.status(404).json({ message: 'Файл не найден' })
        }
        try {
            await fileModel.destroy({ where: { id: id } })
            res.status(200).json({ message: 'Успешно удален' })
            fs.unlink(`./public/uploads/${getFile.name}`, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Файл удалён");
                }
            });
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }
    async getOneFile(req, res) {
        const id = req.params.id
        const oneFile = await fileModel.findOne({ where: { id: id } })
        if (!oneFile) {
            return res.status(404).json({ message: "No such file" })
        }
        res.status(200).json(oneFile)
    }
    async downloadFile(req, res) {
        const id = req.params.id
        const file = await fileModel.findOne({ where: { id: id } })
        if (!file) {
            return res.status(404).json({ message: 'No such file' })
        }
        let fileLocation = path.join('./public/uploads', file.name);
        res.download(fileLocation, file.name);
    }
    async updateFile(req, res) {
        const id = req.params.id
        const file = await fileModel.findOne({ where: { id: id } })
        fs.unlink(`./public/uploads/${file.name}`, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Файл удалён");
            }
        });
        file.update({
            name: req.file.filename,
            extension: req.file.filename.split('.')[1],
            mimeType: req.file.mimetype,
            size: req.file.size
        })
        res.status(200).json("Файл успешно изменен")


    }
}

module.exports = new FileController()