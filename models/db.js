const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://huuthiem:Anhthiem123@cluster0.vppscm2.mongodb.net/Asm?retryWrites=true&w=majority')
        .catch((err)=>{
            console.log('Loi ket noi');
            console.log(err);
        });

module.exports={    mongoose    }