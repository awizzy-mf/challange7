const express = require("express");
const user = require("../controller/user");
const middleware = require("../utils/auth");
const multer = require('multer')();

const router = express.Router();

router.get('/activation', user.activationAcc);
router.post('/auth/register', user.register);
router.get('/auth/login/google', user.googleOauth2);
router.post('/auth/login', user.login);
router.put('/picture', middleware.auth, multer.single("media"), user.update);

module.exports = router;