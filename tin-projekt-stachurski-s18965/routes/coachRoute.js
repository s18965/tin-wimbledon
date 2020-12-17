const express = require('express');
const router = express.Router();

const coachController = require('../controllers/coachController');


router.get('/', coachController.showCoachList);
router.get('/add', coachController.showAddCoachForm);
router.get('/details/:coachId', coachController.showCoachDetails);
router.get('/details/edit/:coachId', coachController.showEditCoachDetails);
module.exports = router;
