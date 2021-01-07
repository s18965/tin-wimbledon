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

    let allPlayers;

    PlayerRepository.getPlayers()
        .then(players => {
            allPlayers = players;

            res.render('pages/coach/new', {
                allPlayers: allPlayers,
                coach: {},
                pageTitle: 'Nowy trener',
                formMode: 'createNew',
                btnLabel: 'Dodaj trenera',
                formAction: '/coaches/add',
                validationErrors: [],
                navLocation: 'coach'
            });
        })

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
    const coachId = req.params.coachId;

    PlayerRepository.getPlayers()
        .then(players => {
            allPlayers = players;

            return CoachRepository.getCoachById(coachId);
        })
        .then(coach => {
            res.render('pages/coach/details-edit', {
                coach: coach,
                allPlayers: allPlayers,
                formMode: 'edit',
                pageTitle: 'Edycja trenera',
                btnLabel: 'Edytuj trenera',
                formAction: '/coaches/edit',
                validationErrors: [],
                navLocation: 'coach'
            });
        })
}


exports.addCoach = (req, res, next) => {

    const coachData = { ...req.body };
    console.log(req.body.idPlayer);

    CoachRepository.createCoach(coachData)
        .then( result => {
            res.redirect('/coaches');
        }).catch(err => {


        let allPlayers;
        PlayerRepository.getPlayers()
            .then(players => {
                allPlayers = players;

                console.log(req.body.idPlayer);
                console.log(err.details);

                res.render('pages/coach/new', {
                    coach: coachData,
                    allPlayers: allPlayers,
                    pageTitle: 'Dodawanie trenera',
                    formMode: 'createNew',
                    btnLabel: 'Dodaj trenera',
                    formAction: '/coaches/add',
                    navLocation: 'coach',
                    validationErrors: err.details
                });
            })
    });
};

exports.updateCoach = (req, res, next) => {

    const coachId = req.body.id;
    console.log(req.body.idPlayer);

    const coachData = { ...req.body };
    CoachRepository.updateCoach(coachId, coachData)
        .then( result => {
            res.redirect('/coaches');
        }).catch(err => {
        console.log(err.details);

        let allPlayers;
        PlayerRepository.getPlayers()
            .then(players => {
                allPlayers = players;
                res.render('pages/coach/details-edit', {
                    coach: coachData,
                    allPlayers: allPlayers,
                    pageTitle: 'Edycja trenera',
                    formMode: 'edit',
                    btnLabel: 'Edytuj trenera',
                    formAction: '/coaches/edit',
                    navLocation: 'coach',
                    validationErrors: err.details
                })
            })
    });
};

exports.deleteCoach = (req, res, next) => {

    const coachId = req.params.coachId;
    CoachRepository.deleteCoach(coachId)
        .then( () => {
            res.redirect('/coaches');
        })

};





