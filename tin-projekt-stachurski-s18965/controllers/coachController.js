const CoachRepository = require('../repository/mysql2/CoachRepository');
const PlayerRepository = require('../repository/mysql2/PlayerRepository');


exports.showCoachList = (req, res, next) => {

    CoachRepository.getCoaches()
        .then(coaches => {
            res.render('pages/coach/list', {
                coaches: coaches,
                navLocation: 'coach'
            });
        });
}

exports.showAddCoachForm = (req, res, next) => {

    res.render('pages/coach/new', {
        coach: {},
        pageTitle: 'Nowy trener',
        formMode: 'createNew',
        btnLabel: 'Dodaj trenera',
        formAction: '/coaches/add',
        navLocation: 'coach'
    });

}

exports.showCoachDetails = (req, res, next) => {
    const coachId = req.params.coachId;
    CoachRepository.getCoachById(coachId)
        .then(coach => {
            res.render('pages/coach/details', {
                coach: coach,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły trenera',
                formAction: '',
                navLocation: 'coach'
            });
        });
}


exports.showEditCoachDetails = (req, res, next) => {

    let allPlayers;
    PlayerRepository.getPlayers()
        .then(players => {
            allPlayers = players;

            res.render('pages/coach/details-edit', {
                players: players,
                formMode: 'edit',
                pageTitle: 'Edycja trenera',
                btnLabel: 'Edytuj trenera',
                formAction: '/coaches/edit',
                navLocation: 'coach'
            });
        })

}


exports.addCoach = (req, res, next) => {

    const coachData = { ...req.body };
    CoachRepository.createCoach(coachData)
        .then( result => {
            res.redirect('/coaches');
        });

};

exports.updateCoach = (req, res, next) => {

    const coachId = req.body.id;
    const coachData = { ...req.body };
    CoachRepository.updateCoach(coachId, coachData)
        .then( result => {
            res.redirect('/coaches');
        });

};

exports.deleteCoach = (req, res, next) => {

    const coachId = req.params.coachId;
    CoachRepository.deleteCoach(coachId)
        .then( () => {
            res.redirect('/coaches');
        });

};





