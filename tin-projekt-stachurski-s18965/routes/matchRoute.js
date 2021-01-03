const express = require('express');
const router = express.Router();

const matchController = require('../controllers/matchController');


router.get('/', matchController.showMatchList);
router.get('/add', matchController.showAddMatchForm);
router.get('/details/:matchId', matchController.showMatchDetails);
router.get('/edit/:matchId', matchController.showEditMatchDetails);

router.post('/add', matchController.addMatch);
router.post('/edit', matchController.updateMatch);
router.get('/delete/:matchId', matchController.deleteMatch);

module.exports = router;
