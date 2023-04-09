var express = require('express');
var router = express.Router();
var userController= require('../controllers/userController');
var checkLogin= require('../middleware/checklogin');

/* GET home page. */
router.get("/login",checkLogin.khongycLogin,userController.doLogin);
router.get("/signup",userController.dangky);
router.get("/",checkLogin.ycLogin,userController.getListAcc);
router.get("/changePass",checkLogin.ycLogin,userController.changePass);
router.post("/changePass",checkLogin.ycLogin,userController.changePass);



router.get("/logout",checkLogin.logout,userController.logout);
router.post("/login",checkLogin.khongycLogin,userController.doLogin);
router.post('/',userController.addUser);
router.post('/signup',userController.dangky);
router.get('/edit/:iduser',checkLogin.ycLogin, userController.editUser);
router.post('/edit/:iduser', userController.editUser);
router.get('/delete/:iduser', userController.delete);












module.exports = router;