const express= require('express');
const {
    handlerSignUp,
    handlerLoginUser
} = require('../controller/user');
const router = express.Router();

router.post('/signup',handlerSignUp);
router.post('/login',handlerLoginUser);


module.exports = router;


