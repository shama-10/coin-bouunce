const mongoose = require('mongoose');3

const {Schema} = mongoose;

const commentSchema = new Schema({
    content : {type: String, required:true},
    blog : {type: mongoose.SchemaTypes.ObjectId, ref: 'blogs'},
    aurthor : {type: mongoose.SchemaTypes.ObjectId, ref: 'users'}
},
{timestamps: true}
);

module.exports = mongoose.model('Comment',commentSchema,'comment');