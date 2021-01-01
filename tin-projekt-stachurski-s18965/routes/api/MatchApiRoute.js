const express = require('express');
const router = express.Router();

const matchApiController = require('../../api/MatchAPI');

router.get('/', matchApiController.getMatches);
router.get('/:matchId', matchApiController.getMatchById);
router.post('/', matchApiController.createMatch);
router.put('/:matchId', matchApiController.updateMatch);
router.delete('/:matchId', matchApiController.deleteMatch);

module.exports = router;