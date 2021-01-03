const express = require('express');
const router = express.Router();

const coachController = require('../controllers/coachController');

router.get('/', coachController.showCoachList);
router.get('/add', coachController.showAddCoachForm);
router.get('/details/:coachId', coachController.showCoachDetails);
router.get('/edit/:coachId', coachController.showEditCoachDetails);

router.post('/add', coachController.addCoach);
router.post('/edit', coachController.updateCoach);
router.get('/delete/:coachId', coachController.deleteCoach);

module.exports = router;
