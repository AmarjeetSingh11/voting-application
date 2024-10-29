const express = require('express')
const {
    handlerAddCandidate,
    handlerUpdateCandidate,
    handlerDeleteCandidate
} = require('../controller/candidate')
const router = express.Router();

router.post('/add-candidate',handlerAddCandidate);
router.put('/update-candidate',handlerUpdateCandidate);
router.delete('/delete-candidate',handlerDeleteCandidate);

module.exports = router;