const PlayerRepository = require('../repository/mysql2/PlayerRepository');

exports.showPlayerList = (req, res, next) => {

    PlayerRepository.getPlayers()
        .then(players => {
            res.render('pages/player/list', {
                players: players,
                navLocation: 'player'
            });
        });
}

exports.showAddPlayerForm = (req, res, next) => {
    res.render('pages/player/new', {navLocation: 'player'});
}

exports.showPlayerDetails = (req, res, next) => {
    res.render('pages/player/details', {navLocation: 'player'});
}

exports.showEditPlayerDetails = (req, res, next) => {
    res.render('pages/player/details-edit', {navLocation: 'player'});
}

