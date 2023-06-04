const express = require('express');
const router = express.Router();

const { newUser } = require('../../controllers/users/index');

router.post('/users', newUser);

module.exports = router;
