const { render } = require('express/lib/response');
const myMD= require('../models/user.model');

exports.doLogin= async(req,res,next)=>{
    let msg ='';
    if(req.method=='POST'){
        try {
            let objU= await myMD.userModel.findOne({username: req.body.username});

            console.log(objU);
            if(objU != null){
                if(objU.password==req.body.passwd){
                    // đúng thông tin --> lưu vào session
                    req.session.userLogin = objU;
                    console.log("Đăng nhập by : "+req.session.userLogin.username);
                    // chuyển trang về trang quản trị
                    return res.redirect('/index');

                }else{
                    msg='Sai pass'
                    
                }
            }else{
                msg='Không tồn tại tài khoản: '+req.body.username;
            }
            
        } catch (error) {
            msg ='Lỗi : '+error.message;
            console.log(error);
        }
    }


    
    res.render('users/login', {msg:msg});
};



exports.getListAcc= async (req,res,next)=>{
    let user ="";
    if(req.session.userLogin){
        user= req.session.userLogin.username;
    }
   let dieu_kien_loc= null;
   if(typeof(req.query.username) !='undefined' && req.query.username!=""){
    dieu_kien_loc={username: req.query.username};
   }
   var listU= await myMD.userModel.find(    dieu_kien_loc   ).sort({username:1});
    res.render('users/users', {users:listU, user:user,});
};
exports.changePass= async(req,res,next)=>{
    let msg= '';
    let userLogin= req.session.userLogin;
    console.log(userLogin);

    if(req.method== 'POST'){
       if(req.body.passwd==userLogin.password){
        if(req.body.passwd1==req.body.passwd11 && req.body.passwd1!=null){
            try {
                await myMD.userModel.findByIdAndUpdate({_id: userLogin._id}, {password:req.body.passwd1});
                msg="Đã sửa thành công";
                console.log("Đã sửa mật khẩu");
            } catch (error) {
                msg="Lỗi :"+error.message;
                console.log(error);
            }
        }else{
            msg='Mật khẩu mới không khớp'
        }
        
       }else{
        msg= 'Mật khẩu cũ không đúng'
       }
        
    }
   


    res.render('users/changePass',{msg:msg})
}
exports.addUser= async(req, res, next)=>{
    let user ="";
    if(req.session.userLogin){
        user= req.session.userLogin.username;
    }
    let msg= '';
    if(req.method== 'POST'){
        let objU= new myMD.userModel();
        objU.username= req.body.username;
        objU.email= req.body.email;
        objU.password= req.body.password;
        objU.role= req.body.role;
        
        try {
            let new_user= await objU.save();
            console.log(new_user);
            msg="ĐÃ thêm thành công";
        } catch (error) {
            msg="Lỗi :"+error.message();
            console.log(error);
        }
    }
   
    
    var listU= await myMD.userModel.find();

    res.render('users/users',{users:listU, user:user, msg :msg});

}


exports.dangky= async(req, res, next)=>{
    let msg= '';
    if(req.method== 'POST'){
       if(req.body.username != ""){
        let objkt=  await myMD.userModel.findOne({username:req.body.username});
        if(objkt==null){
            if(req.body.passwd != req.body.passwd2){
                msg = 'Xác nhận password không đúng';
                return res.render('users/signup', {msg:msg});
            }
            
            
            try {
                let objU= new myMD.userModel();
                objU.username= req.body.username;
                objU.email= req.body.email;
                objU.password= req.body.passwd;
                objU.role= req.body.role;
                let new_user= await objU.save();
                console.log(new_user);
                msg="Đăng ký thành công";
            } catch (error) {
                msg="Lỗi :"+error.message();
                console.log(error);
            }
        }else msg='Đã tồn tại tài khoản: '+req.body.username;
       }else msg='Chưa nhập tài khoản';
        
    }
    
    res.render('users/signup',{msg:msg});

}

exports.editUser= async (req,res,next)=>{
    let msg= '';
    let iduser = req.params.iduser;

    if(req.method== 'POST'){
        let objU= new myMD.userModel();
        objU.username= req.body.username;
        objU.email= req.body.email;
        objU.password= req.body.password;
        objU.role= req.body.role;
        objU._id= iduser;
        
        try {
            await myMD.userModel.findByIdAndUpdate({_id: iduser}, objU);
            
            msg="Đã sửa thành công";
        } catch (error) {
            msg="Lỗi :"+error.message;
            console.log(error);
        }
    }
    try {
        var objUser= await myMD.userModel.findById(iduser);
        console.log(objUser);
       
        
    } catch (error) {
        msg='Lỗi '+ error.message;
    }
    res.render('users/edit-user', {msg:msg, objU: objUser});
}
exports.logout = async(req,res,next)=>{
    
       req.session.userLogin=null;
       res.render('home/index',{user:""});
    
    };

exports.delete= async(req,res,next)=>{
    let iduser = req.params.iduser;
    let msg='';
    try {
        await myMD.userModel.deleteOne({_id:iduser});
        msg= "Đã Xóa";
        
    } catch (error) {
        msg='Lỗi '+ error.message;
    }
    
        res.render('users/delete-user', { msg :msg});
    };


