const MatchRepository = require('../repository/mysql2/MatchRepository');

exports.getMatches = (req, res, next) => {
    MatchRepository.getMatches()
        .then(matches => {
            res.status(200).json(matches);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getMatchById = (req, res, next) => {
    const matchId = req.params.matchId;
    MatchRepository.getMatchById(matchId)
        .then(match => {
            if(!match) {
                res.status(404).json({
                    message: 'Match with id: '+matchId+' not found'
                })
            } else {
                res.status(200).json(match);
            }
        });
};

exports.createMatch = (req, res, next) => {
    MatchRepository.createMatch(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateMatch = (req, res, next) => {
    const matchId = req.params.matchId;
    MatchRepository.updateMatch(matchId, req.body)
        .then(result => {
            res.status(200).json({message: 'Match updated!', match: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteMatch = (req, res, next) => {
    const matchId = req.params.matchId;
    MatchRepository.deleteMatch(matchId)
        .then(result => {
            res.status(200).json({message: 'Removed match', match: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};