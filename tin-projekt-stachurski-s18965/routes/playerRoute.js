const express = require('express');
const router = express.Router();

const playerController = require('../controllers/playerController');
const authUtils = require('../util/authUtils');

router.get('/', playerController.showPlayerList);
router.get('/add', authUtils.permitAuthenticatedUser, playerController.showAddPlayerForm);
router.get('/details/:playerId', playerController.showPlayerDetails);
router.get('/edit/:playerId', authUtils.permitAuthenticatedUser, playerController.showEditPlayerDetails);

router.post('/add', authUtils.permitAuthenticatedUser, playerController.addPlayer);
router.post('/edit', authUtils.permitAuthenticatedUser, playerController.updatePlayer);
router.get('/delete/:playerId', authUtils.permitAuthenticatedUser, playerController.deletePlayer);

module.exports = router;

