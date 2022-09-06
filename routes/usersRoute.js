const express = require("express");
const upload = require("../middleware/multer");
const { ensureAuthentication } = require("../middleware/auth");

const router = express.Router();
const {
  registerUser,
  failLogin,
  loginHandler,
  successLogin,
  logoutUser,
  whoisme,
  uploadHandler,
} = require("../controllers/usersController");

// register user
router.post("/register", registerUser);

// user login
router.post("/login", loginHandler);

// faile login
router.get("/login/fail", failLogin);

// success login
router.get("/login/success", successLogin);

// logout user
router.post("/logout", logoutUser);

// me
router.get("/me", whoisme);

// add photo profile
router.post(
  "/upload",
  ensureAuthentication,
  upload.single("myProfile"),
  uploadHandler
);

module.exports = router;
