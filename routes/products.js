var express = require('express');
var router = express.Router();
var proControl= require('../controllers/productsController');

/* GET home page. */
router.get('/',proControl.getListProduct);
router.get('/listProduct',proControl.getListProduct);
router.get('/addProduct',proControl.add);



const multer  = require('multer')
const objUpload = multer({ dest: 'uploads/' });
router.post('/addProduct',objUpload.single('file_anh'), proControl.add);


module.exports = router;