const PlayerRepository = require('../repository/mysql2/PlayerRepository');
const i18n = require('i18n')

exports.showPlayerList = (req, res, next) => {
    PlayerRepository.getPlayers()
        .then(players => {
            res.render('pages/player/list', {
                players: players,
                navLocation: 'player',
                i18n:i18n
            });
        });
}

exports.showAddPlayerForm = (req, res, next) => {

    res.render('pages/player/new', {
        player: {},
        pageTitle: i18n.__('player.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: i18n.__('player.form.add.btnLabel'),
        formAction: '/players/add',
        validationErrors: [],
        navLocation: 'player',
    })
}


exports.showPlayerDetails = (req, res, next) => {

    const playerId = req.params.playerId;
    PlayerRepository.getPlayerById(playerId)
        .then(player => {
            res.render('pages/player/details', {
                player: player,
                formMode: 'showDetails',
                pageTitle: i18n.__('player.form.add.details'),
                formAction: '',
                navLocation: 'player'
            });
        });
}

exports.showEditPlayerDetails = (req, res, next) => {

    const playerId = req.params.playerId;
    PlayerRepository.getPlayerById(playerId)
        .then(player => {
            res.render('pages/player/details-edit', {
                player: player,
                formMode: 'edit',
                pageTitle: i18n.__('player.form.edit.pageTitle'),
                btnLabel: i18n.__('player.form.edit.btnLabel'),
                formAction: '/players/edit',
                validationErrors: [],
                navLocation: 'player'
            });
        });
}


exports.addPlayer = (req, res, next) => {

    const playerData = { ...req.body };
    PlayerRepository.createPlayer(playerData)
        .then( result => {
            res.redirect('/players');
        })
        .catch(err => {
            console.log(err.details);
            res.render('pages/player/new', {
                player: playerData,
                pageTitle: i18n.__('player.form.add.pageTitle'),
                formMode: 'createNew',
                btnLabel: i18n.__('player.form.add.btnLabel'),
                formAction: '/players/add',
                navLocation: 'player',
                validationErrors: err.details
            });
        });
};

exports.updatePlayer = (req, res, next) => {

    const playerId = req.body.id;
    const playerData = { ...req.body };
    PlayerRepository.updatePlayer(playerId, playerData)
        .then( result => {
            res.redirect('/players');
        })
        .catch(err => {
        res.render('pages/player/details-edit', {
            player: playerData,
            pageTitle: i18n.__('player.form.edit.pageTitle'),
            formMode: 'edit',
            btnLabel: i18n.__('player.form.edit.btnLabel'),
            formAction: '/players/edit',
            navLocation: 'player',
            validationErrors: err.details
        });
    });

};

exports.deletePlayer = (req, res, next) => {

    const playerId = req.params.playerId;
    PlayerRepository.deletePlayer(playerId)
        .then( () => {
            res.redirect('/players');
        });

};

