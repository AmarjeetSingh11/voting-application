const express = require('express');
const {
    handlerVote,
} = require('../controller/voting')
const router = express.Router();

router.post('/vote/:candidateId',handlerVote);


module.exports = router;