var myMD = require('../models/product.model');
exports.getlistCat=async(req,res,next)=>{
    let user ="";
    if(req.session.userLogin){
        user= req.session.userLogin.username;
    }
  

   var listCat = await myMD.catModel.find();
                                  
   console.log(listCat);

    res.render('category/cat',{cats: listCat,user:user,msg :""});
};
exports.delete= async(req,res,next)=>{
    let idcat = req.params.idcat;
    let msg='';
    let user ="";
    if(req.session.userLogin){
        user= req.session.userLogin.username;
    }
   var listCat = await myMD.catModel.find();
    let listSpofCat = await myMD.spModel.find({id_cat:idcat}).populate('id_cat','_id, name');
    console.log(listSpofCat);
    if(listSpofCat==null){
        try {
            await myMD.catModel.deleteOne({_id:idcat});
              msg= "Đã Xóa";
              
          } catch (error) {
              msg='Lỗi '+ error.message;
          }
    }else msg= "Tồn tại sản phẩm thuộc thể loại này!! "    
    
   
     res.render('category/delete-cat', {cats: listCat,user:user, msg :msg});
 };