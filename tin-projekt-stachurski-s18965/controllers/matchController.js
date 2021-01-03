const MatchRepository = require('../repository/mysql2/MatchRepository');
const PlayerRepository = require('../repository/mysql2/PlayerRepository');


exports.showMatchList = (req, res, next) => {
        MatchRepository.getMatches()
            .then(matches => {
                res.render('pages/match/list', {
                    matches: matches,
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
                pageTitle: 'Nowy mecz',
                btnLabel: 'Dodaj mecz',
                formAction: '/matches/add',
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
                pageTitle: 'Szczegóły meczu',
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
            res.render('pages/match/details-edit', {
                match: match,
                allPlayers: allPlayers,
                formMode: 'edit',
                pageTitle: 'Edycja meczu',
                btnLabel: 'Edytuj mecz',
                formAction: '/matches/edit',
                navLocation: 'match'
            });
        });
}



exports.addMatch = (req, res, next) => {

    const matchData = { ...req.body };
    MatchRepository.createMatch(matchData)
        .then( result => {
            res.redirect('/matches');
        });

};

exports.updateMatch = (req, res, next) => {

    const matchId = req.body.id;
    const matchData = { ...req.body };
    MatchRepository.updateMatch(matchId, matchData)
        .then( result => {
            res.redirect('/matches');
        });

};

exports.deleteMatch = (req, res, next) => {

    const matchId = req.params.matchId;
    MatchRepository.deleteMatch(matchId)
        .then( () => {
            res.redirect('/matches');
        });

};

