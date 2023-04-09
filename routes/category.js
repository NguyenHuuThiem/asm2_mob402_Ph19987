var express = require('express');
var router = express.Router();
var catCtrl= require('../controllers/categoryController');

router.get("/",catCtrl.getlistCat);
router.post("/",catCtrl.getlistCat);
router.get('/delete/:idcat', catCtrl.delete);



module.exports = router;