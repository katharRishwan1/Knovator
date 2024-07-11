const mongoose = require('mongoose');

module.exports = mongoose.model(
    'post',
    new mongoose.Schema({
        title:String,
        body:String,
        createdBy:{ type:mongoose.Schema.Types.ObjectId,ref:'user'},
        status:{type:String,enum:['active','inactive']},
        geoLocation:{
            latitude:Number,
            longitude:Number,
        },
        isDeleted: { type:Boolean,default:false}
    },
    { timestamps:true,versionKey:false}
),
'post'
)