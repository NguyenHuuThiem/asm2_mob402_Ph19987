var express = require('express');
var router = express.Router();
var userController= require('../controllers/userController');

/* GET home page. */
router.get("/login",userController.doLogin);
router.get("/signUp",userController.doSignUp);
router.get("/",userController.getListAcc);
router.get("/changePass",userController.changePass);





module.exports = router;