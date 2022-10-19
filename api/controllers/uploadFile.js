import multer from "multer";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const { path = "upload" } = req.query;
    cb(null, "../client/public/" + path);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
export const upload = multer({ storage });

export const fileHandle = (req, res) => {
  const file = req.file;
  res.send({
    status: 200,
    data: file?.filename,
  });
};
