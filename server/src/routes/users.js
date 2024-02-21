const express = require("express");
const {
  registerNewUser,
  loginUser,
  changePassword,
  getUserAvatar,
} = require("../controllers/users");

const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/avatar");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/register", upload.single("avatar"), registerNewUser);
router.post("/login", loginUser);
router.patch("/user", changePassword);
router.get("/avatar/:id", getUserAvatar);
module.exports = router;
