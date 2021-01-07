const express = require('express');
const router = express.Router();

const coachController = require('../controllers/coachController');
const authUtils = require('../util/authUtils');


router.get('/', coachController.showCoachList);
router.get('/add', authUtils.permitAuthenticatedUser, coachController.showAddCoachForm);
router.get('/details/:coachId', coachController.showCoachDetails);
router.get('/edit/:coachId', authUtils.permitAuthenticatedUser, coachController.showEditCoachDetails);

router.post('/add', coachController.addCoach);
router.post('/edit', authUtils.permitAuthenticatedUser, coachController.updateCoach);
router.get('/delete/:coachId', authUtils.permitAuthenticatedUser, coachController.deleteCoach);

module.exports = router;
