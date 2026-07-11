const Message = require('../models/Message');

const getMessages = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    const total = await Message.countDocuments();
    const messages = await Message.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: messages, // Note: they will be sorted newest first, frontend might need to reverse them for display
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch messages', error: error.message });
  }
};

const createMessage = async (req, res) => {
  try {
    const { username, message } = req.body;

    const newMessage = await Message.create({
      username,
      message,
    });

    res.status(201).json({
      success: true,
      data: newMessage,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create message', error: error.message });
  }
};

module.exports = {
  getMessages,
  createMessage,
};
