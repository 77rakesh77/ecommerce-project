const multer = require("multer")
const path = require("path")


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/upload'); // Save files to the "uploads" directory
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Append a timestamp to the filename
    },
});

const upload = multer({ storage: storage }).array("productImage");



module.exports =  upload