const mongoose = require('mongoose')

const usertenderSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tenders',
        required: true
    },
    // current login user
    usertender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    file:{
        type:String,
        required:true
    },
    paid:{
        type:Boolean,
        default:false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    

})

// tenderSchema.index({ name: 'text', description: 'text' });
module.exports = mongoose.model('Usertender', usertenderSchema)