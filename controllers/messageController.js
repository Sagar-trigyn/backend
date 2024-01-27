// File: messageController.js
const Message = require('../models/message');
const User = require('../models/user');
// exports.createMessage = async (req, res) => {
//     const { user,sender,body } = req.body;

//     try {
//         const newMessage = new Message({ user,sender,body });
//         await newMessage.save();

//         res.status(201).json(newMessage);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.createMessage = async (req, res) => {
//     const { sender, body, userId } = req.body;

//     try {
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         const newMessage = { sender, body };
//         console.log(newMessage,'newMessage')
//         user.messages.push(newMessage);

//         await user.save();

//         res.status(201).json(newMessage);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };
exports.createMessage = async (req, res) => {
    const { userId, message } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        message.forEach(msg => {
            user.messages.push(msg);
        });

        await user.save();

        res.status(201).json(user);
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