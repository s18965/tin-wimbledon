const MatchRepository = require('../repository/mysql2/MatchRepository');
const PlayerRepository = require('../repository/mysql2/PlayerRepository');
const i18n = require('i18n');
const authUtils = require('../util/authUtils');


exports.showMatchList = (req, res, next) => {
        MatchRepository.getMatches()
            .then(matches => {
                res.render('pages/match/list', {
                    matches: matches,
                    banner: req.query.banner,
                    navLocation: 'match'
                });
            });
}

exports.showAddMatchForm = (req, res, next) => {
    let allPlayers;
    PlayerRepository.getPlayers()
        .then(players => {
            allPlayers = players;
            res.render('pages/match/new', {
                match: {},
                formMode: 'createNew',
                allPlayers: allPlayers,
                pageTitle: i18n.__('match.form.add.pageTitle'),
                btnLabel: i18n.__('match.form.add.btnLabel'),
                formAction: '/matches/add',
                validationErrors: [],
                navLocation: 'match'
            });
        });
}

exports.showMatchDetails = (req, res, next) => {

    const matchId = req.params.matchId;
    MatchRepository.getMatchById(matchId)
        .then(match => {
            res.render('pages/match/details', {
                match: match,
                formMode: 'showDetails',
                pageTitle: i18n.__('match.form.add.details'),
                formAction: '',
                navLocation: 'match'
            });
        });
}

exports.showEditMatchDetails = (req, res, next) => {

        const matchId = req.params.matchId;
        let allPlayers;
        PlayerRepository.getPlayers()
                .then(players => {
                    allPlayers = players
                    return MatchRepository.getMatchById(matchId)
                })

        .then(match => {

            let canChange = authUtils.permitCorrectUser(req.session.loggedUser.id, match.idPlayer1);
            if(!canChange){
                canChange = authUtils.permitCorrectUser(req.session.loggedUser.id, match.idPlayer2);
            }
            if(canChange || req.session.loggedUser.level==2) {
                res.render('pages/match/details-edit', {
                    match: match,
                    allPlayers: allPlayers,
                    formMode: 'edit',
                    pageTitle: i18n.__('match.form.edit.pageTitle'),
                    btnLabel: i18n.__('match.form.edit.btnLabel'),
                    formAction: '/matches/edit',
                    validationErrors: [],
                    navLocation: 'match'
                });
            }else{
                res.redirect('/unauthorised');
            }
        });
}



exports.addMatch = (req, res, next) => {

    const matchData = { ...req.body };
    MatchRepository.createMatch(matchData)
        .then( result => {
            res.redirect('/matches?banner=add');
        }).catch(err => {

        let allPlayers;
        PlayerRepository.getPlayers()
            .then(players => {
                allPlayers = players;


                res.render('pages/match/new', {
                    match: matchData,
                    allPlayers: allPlayers,
                    pageTitle: i18n.__('match.form.add.pageTitle'),
                    formMode: 'createNew',
                    btnLabel: i18n.__('match.form.add.btnLabel'),
                    formAction: '/matches/add',
                    navLocation: 'match',
                    validationErrors: err.details
                });
            })
    });

};

exports.updateMatch = (req, res, next) => {


    const matchId = req.body.id;
    const matchData = { ...req.body };

    MatchRepository.updateMatch(matchId, matchData)
        .then( result => {
            res.redirect('/matches?banner=update');
        }).catch(err => {


        let allPlayers;
        PlayerRepository.getPlayers()
            .then(players => {
                allPlayers = players;

                res.render('pages/match/details-edit', {
                    match: matchData,
                    allPlayers: allPlayers,
                    formMode: 'edit',
                    pageTitle: i18n.__('match.form.edit.pageTitle'),
                    btnLabel: i18n.__('match.form.edit.btnLabel'),
                    formAction: '/matches/edit',
                    validationErrors: err.details,
                    navLocation: 'match'
                });
            })
    });

};

exports.deleteMatch = (req, res, next) => {

    const matchId = req.params.matchId;
    MatchRepository.getMatchById(matchId)
        .then(match => {
            let canChange = authUtils.permitCorrectUser(req.session.loggedUser.id, match.idPlayer1);
            if(!canChange ){
                canChange = authUtils.permitCorrectUser(req.session.loggedUser.id, match.idPlayer2);
            }
            if(canChange || req.session.loggedUser.level==2) {

        MatchRepository.deleteMatch(matchId)
            .then(() => {
                res.redirect('/matches?banner=delete');
            });
    }else{
        res.redirect('/unauthorised');
    }});
};

