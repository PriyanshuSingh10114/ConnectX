const express = require('express');
const router = express.Router();
const { getMessages, createMessage } = require('../controllers/message.controller');
const { validateMessage, validate } = require('../validators/message.validator');

router.get('/', getMessages);
router.post('/', validateMessage, validate, createMessage);

module.exports = router;
