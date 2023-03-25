exports.doLogin=(req,res,next)=>{
    res.render('users/login');
};

exports.doSignUp=(req,res,next)=>{
    res.render('users/signup');
};

exports.getListAcc=(req,res,next)=>{
    let users=[
        {id: 1,username:"tuanban113", password:"113", email:"tuandxt203@gmail.com", role:"admin"},
        {id: 2,username:"xuantuan", password:"113", email:"tuanxuan@gmail.com", role:"user"},

        
    ]
    res.render('users/users', {users:users});
};
exports.changePass=(req,res,next)=>{
    res.render('users/changePass')
}
