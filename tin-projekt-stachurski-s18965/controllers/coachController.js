exports.showCoachList = (req, res, next) => {
    res.render('pages/coach/list', { navLocation: 'coach' });
}

exports.showAddCoachForm = (req, res, next) => {
    res.render('pages/coach/new', { navLocation: 'coach' });
}

exports.showCoachDetails = (req, res, next) => {
    res.render('pages/coach/details', {navLocation: 'coach'});
}

exports.showEditCoachDetails = (req, res, next) => {
    res.render('pages/coach/details-edit', {navLocation: 'coach'});
}




