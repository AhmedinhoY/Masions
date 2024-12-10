const HttpError = require("../models/http-error");
const mongoose = require("mongoose");
const Message = require("../models/message");
const Conversation = require("../models/conversation");
const User = require("../models/users");

exports.sendMessage = async (req, res, next) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user.id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    await newMessage.save();
    conversation.messages.push(newMessage._id);
    await conversation.save();

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error sending the message:", error);
    return next(
      new HttpError("Sending the message failed, please try again.", 500)
    );
  }
};

exports.getMessages = async (req, res, next) => {
  try {
    const { id: userToChatWithId } = req.params;
    const senderId = req.user.id;

    const conversation = await Conversation.findOne({
      participants: { $all: [userToChatWithId, senderId] },
    }).populate("messages");

    if (!conversation) {
      res.status(200).json([]);
    }

    res.status(200).json(conversation.messages);
  } catch (error) {
    console.error("Error getting the messages:", error);
    return next(
      new HttpError("Getting the messages failed, please try again.", 500)
    );
  }
};
