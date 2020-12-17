const express = require('express');
const router = express.Router();

const playerController = require('../controllers/playerController');


router.get('/', playerController.showPlayerList);
router.get('/add', playerController.showAddPlayerForm);
router.get('/details/:playerId', playerController.showPlayerDetails);
router.get('/details/edit/:playerId', playerController.showEditPlayerDetails);
module.exports = router;
