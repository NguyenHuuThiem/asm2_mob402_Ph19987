var express = require('express');
var router = express.Router();
var proControl= require('../controllers/productsController');

router.use((req, res, next)=>{
    if(req.session.userLogin){
        next();
    }
    else {
        return res.redirect('/users/login');
    }      
    })
/* GET home page. */
router.get('/',proControl.getListProduct);
router.get('/listProduct',proControl.getListProduct);
router.get('/addProduct',proControl.add);


router.get('/detail/:idsp', proControl.detail);
router.get('/delete/:idsp', proControl.delete);
router.get('/edit/:idsp', proControl.edit);
router.get('/:filter', proControl.filter);





const multer  = require('multer')
const objUpload = multer({ dest: 'uploads/' });
router.post('/addProduct',objUpload.single('file_anh'), proControl.add);
router.post('/edit/:idsp',objUpload.single('file_anh'), proControl.edit);



module.exports = router;