// File: messageController.js
const Message = require('../models/message');

exports.createMessage = async (req, res) => {
    const { user, messages } = req.body;

    try {
        const newMessage = new Message({ user, messages });
        await newMessage.save();

        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.readMessages = async (req, res) => {
    try {
        const messages = await Message.find();
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};