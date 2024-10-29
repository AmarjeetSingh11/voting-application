const express = require('express')
const {
    handlerGetProfile,
    handlerUpdateProfile
} = require('../controller/userProfile')
const router = express.Router();

router.get('/getProfile',handlerGetProfile);
router.put('/updateProfile',handlerUpdateProfile);
module.exports = router;