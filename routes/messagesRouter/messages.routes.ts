// const express = require("express");
// const messageRouter = express.Router();
// const messageController = require("../../controllers/messages/messages.controllers").messageController;
// const displayMessages = require("../../controllers/messages/messages.controllers").displayMessages;
//
// /**
//  * @swagger
//  * tags:
//  *   name: Messages
//  *   description: This is the API about messages.
//  */
//
// /**
//  * @swagger
//  * /api/v1/message/sendmessage:
//  *   post:
//  *     summary: Send a new message.
//  *     description: Send a new message with the provided details.
//  *     tags: [Messages]
//  *     parameters:
//  *       - in: body
//  *         name: message
//  *         description: The message object to be sent.
//  *         required: true
//  *         schema:
//  *           type: object
//  *           properties:
//  *             senderId:
//  *               required: true
//  *             receiverId:
//  *               required: true
//  *             message:
//  *               required: true
//  *
//  *     responses:
//  *       200:
//  *         description: Message sent successfully.
//  *       400:
//  *         description: Bad request - Invalid input.
//  *       500:
//  *         description: Internal server error.
//  */
// messageRouter.post('/sendmessage', messageController);
// /**
//  * @swagger
//  * tags:
//  *   name: Messages
//  *   description: This is the API about messages.
//  */
//
// /**
//  * @swagger
//  * /api/v1/message/receivedmessages:
//  *   post:
//  *     summary: received a new message.
//  *     description: get a new messages with the provided details.
//  *     tags: [Messages]
//  *     parameters:
//  *       - in: body
//  *         name: message
//  *         description: The message object to be received.
//  *         required: true
//  *         schema:
//  *           type: object
//  *           properties:
//  *            loggerUserId:
//  *               required: true
//  *
//  *     responses:
//  *       200:
//  *         description: Messages.
//  *       400:
//  *         description: Bad request - Invalid input.
//  *       500:
//  *         description: Internal server error.
//  */
// messageRouter.post('/receivedmessages', displayMessages);
//
// module.exports = messageRouter;
//
