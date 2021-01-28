const CoachRepository = require('../repository/mysql2/CoachRepository');
const PlayerRepository = require('../repository/mysql2/PlayerRepository');
const i18n = require('i18n')

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
                pageTitle: i18n.__('coach.form.add.pageTitle'),
                formMode: 'createNew',
                btnLabel: i18n.__('coach.form.add.btnLabel'),
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
                pageTitle: i18n.__('coach.form.add.details'),
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
                pageTitle: i18n.__('coach.form.edit.pageTitle'),
                btnLabel: i18n.__('coach.form.edit.btnLabel'),
                formAction: '/coaches/edit',
                validationErrors: [],
                navLocation: 'coach'
            });
        })
}


exports.addCoach = (req, res, next) => {

    const coachData = { ...req.body };

    CoachRepository.createCoach(coachData)
        .then( result => {
            res.redirect('/coaches');
        }).catch(err => {

        let allPlayers;
        PlayerRepository.getPlayers()
            .then(players => {
                allPlayers = players;

                res.render('pages/coach/new', {
                    allPlayers: allPlayers,
                    coach: coachData,
                    pageTitle: i18n.__('coach.form.add.pageTitle'),
                    formMode: 'createNew',
                    btnLabel: i18n.__('coach.form.add.btnLabel'),
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

        let allPlayers;
        PlayerRepository.getPlayers()
            .then(players => {
                allPlayers = players;
                res.render('pages/coach/details-edit', {
                    coach: coachData,
                    allPlayers: allPlayers,
                    pageTitle: i18n.__('coach.form.edit.pageTitle'),
                    formMode: 'edit',
                    btnLabel: i18n.__('coach.form.edit.btnLabel'),
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





