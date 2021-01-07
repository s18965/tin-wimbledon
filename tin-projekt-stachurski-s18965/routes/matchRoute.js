const express = require('express');
const router = express.Router();

const matchController = require('../controllers/matchController');
const authUtils = require('../util/authUtils');

router.get('/', matchController.showMatchList);
router.get('/add', authUtils.permitAuthenticatedUser, matchController.showAddMatchForm);
router.get('/details/:matchId', matchController.showMatchDetails);
router.get('/edit/:matchId', authUtils.permitAuthenticatedUser, matchController.showEditMatchDetails);

router.post('/add', authUtils.permitAuthenticatedUser, matchController.addMatch);
router.post('/edit', authUtils.permitAuthenticatedUser, matchController.updateMatch);
router.get('/delete/:matchId', authUtils.permitAuthenticatedUser, matchController.deleteMatch);

module.exports = router;
