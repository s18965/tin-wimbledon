const PlayerRepository = require('../repository/mysql2/PlayerRepository');
const authUtil = require('../util/authUtils');
const i18n = require('i18n');

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    PlayerRepository.findByEmail(email)
        .then(emp => {
            if(!emp.password) {
                res.render('index', {
                    navLocation: '',
                    loginError: i18n.__('nav.login.wrongPassword')
                })
            } else if(authUtil.comparePasswords(password, emp.password) === true) {
                req.session.loggedUser = emp;
                res.redirect('/');
            } else {
                res.render('index', {
                    navLocation: '',
                    loginError: i18n.__('nav.login.wrongPassword')
                })
            }
        })
        .catch(err => {
            console.log(err);
        });

}

exports.logout = (req, res, next) => {
    req.session.loggedUser = undefined;
    res.redirect('/');
}