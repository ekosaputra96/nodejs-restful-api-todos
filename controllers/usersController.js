const bcrypt = require("bcryptjs");
const passport = require("passport");

const { success, error } = require("../utils/wrapper");
const User = require("../models/usersModel");

// @desc    register a user
// @route   POST /register
const registerUser = async (req, res, next) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return error(res, "Missing Credentials");
  }
  if (req.body.password.length < 5) {
    return error(res, "Password must at least 5 characters");
  }
  try {
    const foundUser = await User.findOne({ email: req.body.email });
    if (foundUser) {
      return error(res, "Email already exists");
    }
    const password = await bcrypt.hash(
      req.body.password,
      await bcrypt.genSalt(10)
    );
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password,
    });
    return success(
      res,
      { name: newUser.name, email: newUser.email },
      "Account has been created"
    );
  } catch (err) {
    return next(err);
  }
};

// desc     login user
// route    POST /login
const loginHandler = passport.authenticate("local", {
  failureRedirect: "/login/fail",
  successRedirect: "/login/success",
  failureMessage: true,
  successMessage: true,
});

// @desc failure login
// @route   GET /login/fail
const failLogin = (req, res) => {
  return error(res, req.session.messages[req.session.messages.length - 1]);
};

// @desc success login
// @route   GET /login/success
const successLogin = (req, res) => {
  return success(res, req.user, "Login successfully");
};

// @desc logout user
// @route   POST /logout
const logoutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    return success(res, null, "Logout successfully");
  });
};

// @desc success login
// @route   GET /login/success
const whoisme = (req, res) => {
  if (typeof req.user === "undefined") {
    return error(res, "Not Login");
  }
  return success(res, req.user, "Login");
};

// @des upload photoprofile
// @route   POST /uploud
const uploadHandler = async (req, res, next) => {
  // upload
  if (typeof req.file === "undefined") {
    return error(res, "No image selected");
  }
  try {
    const updPhotoProfile = await User.findByIdAndUpdate(
      req.user.id,
      {
        photoProfile: req.file.filename,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    return success(res, updPhotoProfile, "Photo profile has been updated");
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  registerUser,
  loginHandler,
  failLogin,
  successLogin,
  logoutUser,
  whoisme,
  uploadHandler,
};
