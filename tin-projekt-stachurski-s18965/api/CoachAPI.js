const CoachRepository = require('../repository/mysql2/CoachRepository');

exports.getCoaches = (req, res, next) => {
    CoachRepository.getCoaches()
        .then(coaches => {
            res.status(200).json(coaches);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getCoachById = (req, res, next) => {
    const coachId = req.params.coachId;
    CoachRepository.getCoachById(coachId)
        .then(coach => {
            if(!coach) {
                res.status(404).json({
                    message: 'Coach with id: '+coachId+' not found'
                })
            } else {
                res.status(200).json(coach);
            }
        });
};

exports.createCoach = (req, res, next) => {
    CoachRepository.createCoach(req.body)
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

exports.updateCoach = (req, res, next) => {
    const coachId = req.params.coachId;
    CoachRepository.updateCoach(coachId, req.body)
        .then(result => {
            res.status(200).json({message: 'Coach updated!', coach: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteCoach = (req, res, next) => {
    const coachId = req.params.coachId;
    CoachRepository.deleteCoach(coachId)
        .then(result => {
            res.status(200).json({message: 'Removed coach', coach: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};