const express = require('express');
const router = express.Router();

const matchController = require('../controllers/matchController');


router.get('/', matchController.showMatchList);
router.get('/add', matchController.showAddMatchForm);
router.get('/details/:matchId', matchController.showMatchDetails);
router.get('/details/edit/:matchId', matchController.showEditMatchDetails);
module.exports = router;
