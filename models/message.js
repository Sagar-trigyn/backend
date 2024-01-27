const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new mongoose.Schema({
    sender: { type: String, required: true },
    body: { type: String, required: true }
});

const MessageSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    messages: [messageSchema]
    
});

module.exports = mongoose.model('Message', MessageSchema);