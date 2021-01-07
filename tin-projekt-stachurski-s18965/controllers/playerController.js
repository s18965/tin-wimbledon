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
    res.render('pages/player/new', {
        player: {},
        pageTitle: 'Nowy zawodnik',
        formMode: 'createNew',
        btnLabel: 'Dodaj zawodnika',
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
                pageTitle: 'Szczegóły zawodnika',
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
                pageTitle: 'Edycja zawodnika',
                btnLabel: 'Edytuj zawodnika',
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
                pageTitle: 'Dodawanie zawodnika',
                formMode: 'createNew',
                btnLabel: 'Dodaj zawodnika',
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
            pageTitle: 'Edytowanie zawodnika',
            formMode: 'edit',
            btnLabel: 'Edytuj zawodnika',
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

