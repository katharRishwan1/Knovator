const mongoose = require('mongoose');

module.exports = mongoose.model(
    'user',
    new mongoose.Schema({
        username:String,
        password:String,
        isDeleted:{type:Boolean,default:false}
    },
    {timestamps:true,versionKey:false}
),'user'
)