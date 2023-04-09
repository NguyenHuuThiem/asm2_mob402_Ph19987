var db = require('./db');
const spSchema= new db.mongoose.Schema(
    {
        name:{type: String, required: true},
        image:{type:String, required:false},
        price : {type : Number, required : true},
        description : {type : String , required: false},
        id_cat:{type:db.mongoose.Schema.Types.ObjectId, ref: 'catModel'}
    },
    {
        //kết nối tới bảng
        collection: 'product'
    }
);

// nếu muôn làm thêm về thể loại có thể định nghĩa ở đây.
const catSchema = new db.mongoose.Schema({
    name : {type: String, require: true},
    
},
{
    collection: 'category'
}
);


let spModel= db.mongoose.model('spModel', spSchema);
let catModel = db.mongoose.model('catModel', catSchema);

module.exports={spModel, catModel};