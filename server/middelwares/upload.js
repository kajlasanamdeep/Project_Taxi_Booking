const multer = require('multer');
const Storage = multer.diskStorage({
    destination:'uploads',
    filename:(req,file,callback)=>{
        callback(null,file.fieldname+'-'+file.originalname)
    }
});
const upload = multer({storage:Storage});

module.exports = upload;