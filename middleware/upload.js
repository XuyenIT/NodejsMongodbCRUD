const multer = require("multer");

const uploadImage = () => {
  //image upload
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/upload");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    },
  });
  const upload = multer({
    storage: storage,
  });
  return upload.single("image");
};
module.exports = uploadImage;
