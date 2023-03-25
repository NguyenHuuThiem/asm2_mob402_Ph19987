exports.getListProduct=(req,res,next)=>{
    let products=[
        {id:1,cat:"Laptop", name:"Lenovo IdeaPab 3", image:"https://laptop88.vn/media/product/6631_81ew197c0rl__ac_sl1500_.jpg", comment:"Sản phẩm mới 100 % bảo hành 3 năm", cost:17000000 },
        {id:2, cat:"Phone", name:"Iphone 14 pro Max", image:"https://www.apple.com/v/iphone-14-pro/d/images/meta/iphone-14-pro_overview__3dn6st99cpea_og.png?202303062200", comment:"Sản phẩm mới 100 % bảo hành 1 năm", cost:35000000 },
        {id:3, cat:"Phone", name:"SamSung Galaxy Y", image:"https://cdn.tgdd.vn/Products/Images/42/50166/samsung-galaxy-y-s5360-nowatermark-300x300.jpg", comment:"Sản phẩm đã qua sử dụng 95%", cost:300000 },
        {id:4, cat:"Laptop",name:"Acer nitro 5", image:"https://no1computer.vn/images/products/2022/11/30/large/acer-nitro-5-rtx-3050-h1_1669799440.jpg", comment:"Sản phẩm mới 100 % bảo hành 3 năm", cost:20000000 },

    ]
    res.render('products/products', {products:products});
};

var fs = require('fs');
exports.add= (req, res, next)=>{
    console.log(req.file, req.body);
    if(req.method=='POST'){
        //xử lý file upload
        //di chuyển file từ thư mục tmp sang public/ uploads
        // fs.rename(đường dẫn gốc, đường dẫn mới, callback)

        fs.rename(req.file.path,
                    './public/templates/'+req.file.originalname,
                    (err)=>{
                        if(err)
                            console.log(err);
                        else {
                            console.log("Url : http://localhost:3000/templates/"+res.file.originalname);
                        }

        })
    }


    res.render('products/addProduct');
};


