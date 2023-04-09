const myMD= require('../models/product.model');

exports.getListProduct=async(req,res,next)=>{
   // thêm chức năng lọc
   let user ="";
    if(req.session.userLogin){
        user= req.session.userLogin.username;
    }
   let dieu_kien_loc= null;
   // giả sử lọc theo giá tiền
   if(typeof(  req.query.price) !='undefined'){
       dieu_kien_loc={price: req.query.price};
   }

   var listSP = await myMD.spModel.find(   dieu_kien_loc   )
                                   .populate('id_cat','_id, name');
   console.log(listSP);

    res.render('products/products', {products:listSP, user:user});
};


var fs = require('fs');
exports.add= async(req, res, next)=>{
    let msg='';
    console.log(req.file, req.body);
    let listCat = await myMD.catModel.find();
    if(req.method=='POST'){

        fs.rename(req.file.path,
            './public/templates/'+ req.file.originalname,
            (err)=>{
               if(err)
                   console.log(err);
               else{
                   // không có lỗi, tạo url, bỏ chữ public/
               console.log("Url: http://localhost:3000/templates/" +req.file.originalname );
               }
            }) 

            let objSP= new myMD.spModel();
            objSP.name= req.body.name;
            objSP.price= req.body.price;
            objSP.description= req.body.description;
            objSP.image= "http://localhost:3000/templates/"+req.file.originalname ;
            objSP.id_cat= req.body.category;
            
            try {
                let new_sp= await objSP.save();
                console.log(new_sp);
                msg="Đã thêm thành công";
                
            } catch (error) {
                msg="Lỗi :"+error.message;
                console.log(error);
            }
        }
    res.render('products/addProduct', {msg:msg, listCat:listCat});
};

exports.detail=async(req,res,next)=>{
    let idsp = req.params.idsp;
    let msg='';
    let cate= '';
    try {
        var objSP= await myMD.spModel.findById(idsp).populate('id_cat','_id, name');
        console.log(objSP);
        cate=objSP.id_cat.name;
        console.log(cate);

       
        
    } catch (error) {
        msg='Lỗi '+ error.message;
    }
   
     res.render('products/detail', {objSP:objSP, msg :msg, cate:cate});
 };

 exports.delete= async(req,res,next)=>{
    let idsp = req.params.idsp;
    let msg='';
    try {
      await myMD.spModel.deleteOne({_id:idsp});
        msg= "Đã Xóa";
        
    } catch (error) {
        msg='Lỗi '+ error.message;
    }
   
     res.render('products/delete-product', { msg :msg});
 };

 exports.edit= async (req,res, next)=>{
    let msg= '';
    let idsp = req.params.idsp;
    try {
        var objSP= await myMD.spModel.findById(idsp);
        var listCat = await myMD.catModel.find();

        
       
        
    } catch (error) {
        msg='Lỗi '+ error.message;
    }
    
   
    if(req.method=='POST'){

        fs.rename(req.file.path,
            './public/templates/'+ req.file.originalname,
            (err)=>{
               if(err)
                   console.log(err);
               else{
                   // không có lỗi, tạo url, bỏ chữ public/
               console.log("Url: http://localhost:3000/templates/" +req.file.originalname );
               }
            }) 

            let objSP= new myMD.spModel();
            objSP.name= req.body.name;
            objSP.price= req.body.price;
            objSP.description= req.body.description;
            objSP.image= "http://localhost:3000/templates/"+req.file.originalname ;
            objSP.id_cat= req.body.category;
            objSP._id=idsp
            
            try {
                await myMD.spModel.findByIdAndUpdate({_id: idsp}, objSP)
              
                msg="ĐÃ Sửa thành công";
            } catch (error) {
                msg="Lỗi :"+error.message;
                console.log(error);
            }
        }
   
    res.render('products/edit-product', {msg:msg, objSP: objSP, listCat:listCat,  });
 }
 exports.filter= async (req,res,next)=>{
    let user ="";
    var listSP=[];
    if(req.session.userLogin){
        user= req.session.userLogin.username;
    }
    let msg= '';
   if(req.params.filter=="dienthoai"){
        dieukien={id_cat:"6428940cbe7605e291c85dc3"};
        listSP = await myMD.spModel.find(dieukien)
        .populate('id_cat','_id, name');
   }else if(req.params.filter=="maytinh"){
        dieukien={id_cat:"64289420be7605e291c85dc4"};
        listSP = await myMD.spModel.find(dieukien)
        .populate('id_cat','_id, name');
   } else if(req.params.filter=="pricetang"){
         listSP = await myMD.spModel.find().sort({price:1})
        .populate('id_cat','_id, name');
    } else if(req.params.filter=="pricegiam"){
        listSP = await myMD.spModel.find().sort({price:-1})
        .populate('id_cat','_id, name');
    } 
   
  

  
   console.log(listSP);
   res.render('products/products',{products:listSP, msg:msg,user:user})

 }