const multer = require('multer');
const userImageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'server/uploads/users')
    },
    filename:(req,file,callback)=>{
        callback(null,file.fieldname+'-'+file.originalname)
    }
});
const cabImageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'server/uploads/cabs')
    },
    filename:(req,file,callback)=>{
        callback(null,file.fieldname+'-'+file.originalname)
    }
});
const uploadUserImage = multer({storage:userImageStorage});
const uploadCabImage = multer({storage:cabImageStorage});

module.exports = {uploadUserImage,uploadCabImage};