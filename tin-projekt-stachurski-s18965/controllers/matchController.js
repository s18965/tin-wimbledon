exports.showMatchList = (req, res, next) => {
    res.render('pages/match/list', {navLocation: 'match'});
}

exports.showAddMatchForm = (req, res, next) => {
    res.render('pages/match/new', {navLocation: 'match'});
}

exports.showMatchDetails = (req, res, next) => {
    res.render('pages/match/details', {navLocation: 'match'});
}

exports.showEditMatchDetails = (req, res, next) => {
    res.render('pages/match/details-edit', {navLocation: 'match'});
}


