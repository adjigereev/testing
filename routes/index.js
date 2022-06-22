let express = require('express');
const fileController = require('../controllers/file.controller');
const userController = require('../controllers/user.controller');
const { authCheck } = require('../middleware/authMiddleware');
let router = express.Router();
let upload = require('../middleware/uploadMiddleware')

router.post('/signup',userController.createUser)
router.post('/signin',userController.authUser)
router.get('/logout',authCheck,userController.logoutUser)
router.post('/signin/new_token',userController.updateToken)
router.get('/info',authCheck,userController.getIdUser)
router.post('/file/upload',authCheck,upload.single('file'),fileController.createFile)
router.get('/file/list',authCheck,fileController.getFile)
router.delete('/file/delete/:id',authCheck,fileController.deleteFile)
router.get('/file/:id',authCheck,fileController.getOneFile)
router.get('/file/download/:id',authCheck,fileController.downloadFile)
router.put('/file/update/:id',authCheck,upload.single('file'),fileController.updateFile)

module.exports = router;
