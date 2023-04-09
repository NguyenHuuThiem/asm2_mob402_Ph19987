exports.index=(req,res,next)=>{
    let user ="";
    if(req.session.userLogin){
        user= req.session.userLogin.username;
    }
    res.render('home/index',{user:user});
};