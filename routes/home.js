var express = require('express');
var router = express.Router();
var homctrl= require('../controllers/homeController');

router.get("/",homctrl.index);
router.get("/index",homctrl.index);



module.exports = router;