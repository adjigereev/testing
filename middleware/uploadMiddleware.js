const  moment = require('moment')
const  multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) =>{
        const date = moment().format('DDMMYYYY-HHmmss_SSS')
        cb(null, `${date}-${file.originalname}`);
    }
});

module.exports = multer({
    storage
})