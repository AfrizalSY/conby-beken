const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/photos');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
        cb(new Error('Invalid photo type! Use jpg/jpeg/png'), false);
    } else {
        cb(null, true);
    }
};

const photoSize = 1024 * 1024 * 5; // 5MB

const upload = multer({
    storage: storage,
    limits: { fileSize: photoSize },
    fileFilter: fileFilter
});

module.exports = upload;