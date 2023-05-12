const mongoose = require('mongoose');3

const {Schema} = mongoose;

const blogSchema = new Schema({
    title : {type: String, required:true},
    content : {type: String, required:true},
    photoPath : {type: String, required:true},
    aurthor : {type: mongoose.SchemaTypes.ObjectId, ref: 'users'}
},
{timestamps: true}
);

module.exports = mongoose.model('Blog',blogSchema,'blog');