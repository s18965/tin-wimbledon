const db = require('../../config/mysql2/db');
const playerSchema = require('../../model/joi/Player');
const playerEditSchema = require('../../model/joi/PlayerEdit');
const authUtils = require('../../util/authUtils');

exports.getPlayers = () => {
    return db.promise().query('SELECT id,firstName,lastName,birthDate,country FROM Player')
        .then( (results, fields) => {
            console.log(results[0]);
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.getPlayerById = (playerId) => {
    const query = `SELECT p.id as id,  p.firstName, p.lastName, p.birthDate, p.country, p.email, co.id as co_id,
    co.firstName as coFN, co.lastName as coLN, co.country as co_country
    FROM Player p
    left join Coach co on co.idPlayer = p.id 
    where p.id = ?`

    const query1 = `SELECT p.id as pid, r.id as rid, t.id as tid,t.date as tdate, concat(p.firstName, ' ',p.lastName) as player, concat(r.firstName, ' ',r.lastName) as rival, r.id as rid ,concat(w.firstName, ' ',w.lastName) as winner
                    FROM TennisMatch t inner join Player p on t.idPlayer1=p.id inner join
                         Player r on t.idPlayer2=r.id inner join Player w on t.idWinner=w.id where p.id=? or r.id=?`

    return db.promise().query(query, [playerId])
        .then( (results, fields) => {
            const firstRow = results[0][0];
            if(!firstRow) {
                return {};
            }
            const pl = {
                id: parseInt(playerId),
                firstName: firstRow.firstName,
                lastName: firstRow.lastName,
                birthDate: firstRow.birthDate,
                country: firstRow.country,
                email: firstRow.email,
                coaches: [],
                matches: [],
            }

            for( let i=0; i<results[0].length; i++ ) {
                const row = results[0][i];
                if (row.co_id) {
                    const coach = {
                        id: parseInt(row.co_id),
                        firstName: row.coFN,
                        lastName: row.coLN,
                        country: row.co_country,
                        idPlayer:playerId
                    };

                    pl.coaches.push(coach);
                }
            }

                return db.promise().query(query1, [playerId,playerId])
                    .then( (results, fields) => {

                        for( let i=0; i<results[0].length; i++ ) {
                            const row = results[0][i];
                            if(row.tid) {
                                if(row.rid==playerId){
                                    const match = {
                                        id: parseInt(row.tid),
                                        rival: row.player,
                                        winner: row.winner,
                                        date: row.tdate,
                                        idPlayer1: row.pid,
                                        idPlayer2: row.rid
                                    }
                                    pl.matches.push(match);

                                }else{
                                    const match = {
                                        id: parseInt(row.tid),
                                        rival: row.rival,
                                        winner: row.winner,
                                        date: row.tdate,
                                        idPlayer1: row.pid,
                                        idPlayer2: row.rid
                                    }
                                    pl.matches.push(match);

                                }


                            }
                        }

                        return pl;
                    })

        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.createPlayer = (data) => {

    const vRes = playerSchema.validate(data, { abortEarly: false} );
    if(vRes.error) {
        return Promise.reject(vRes.error);
    }

    return checkEmailUnique(data.email)
        .then(emailErr => {
            if(emailErr.details) {
                return Promise.reject(emailErr);
            } else {
                const password = authUtils.hashPassword(data.password);
                const sql = 'INSERT into Player (firstName, lastName, country, birthDate, email, password) VALUES (?, ?, ?, ?,?,?)';
                return db.promise().execute(sql, [data.firstName, data.lastName, data.country, data.birthDate,data.email, password]);
            }
        })
        .catch(err => {
            return Promise.reject(err);
        });
};

exports.updatePlayer = (playerId, data) => {

    const vRes = playerEditSchema.validate(data, { abortEarly: false} );
    if(vRes.error) {
        console.log(vRes.error.details)
        return Promise.reject(vRes.error);
    }
    return checkEmailUnique(data.email, playerId)
        .then(emailErr => {
            if(emailErr.details) {
                return Promise.reject(emailErr);
            } else {
                const firstName = data.firstName;
                const lastName = data.lastName;
                const country = data.country;
                const birthDate = data.birthDate;

                if(data.password) {
                    const password = authUtils.hashPassword(data.password);
                    if(data.email){
                        const sql = `UPDATE Player set firstName = ?, lastName = ?, country = ?, birthDate = ?, email=?, password=? where id = ?`;
                        return db.promise().execute(sql, [firstName, lastName, country, birthDate,data.email, password, playerId]);
                    }else{
                        const sql = `UPDATE Player set firstName = ?, lastName = ?, country = ?, birthDate = ?, password=? where id = ?`;
                        return db.promise().execute(sql, [firstName, lastName, country, birthDate, password,playerId]);
                    }
                }else{
                    if(data.email){
                        const sql = `UPDATE Player set firstName = ?, lastName = ?, country = ?, birthDate = ?, email=? where id = ?`;
                        return db.promise().execute(sql, [firstName, lastName, country, birthDate, data.email, playerId]);
                    }else{
                        console.log(data)
                        const sql = `UPDATE Player set firstName = ?, lastName = ?, country = ?, birthDate = ? where id = ?`;
                        return db.promise().execute(sql, [firstName, lastName, country, birthDate, data.id]);
                    }

                }
            }
        })
        .catch(err => {
            return Promise.reject(err);
        });
};

exports.deletePlayer = (playerId) => {
    const sql1 = 'DELETE FROM Player where id = ?';
    const sql2 = 'DELETE FROM TennisMatch where  idPlayer2 = ? or idPlayer1 =?';
    const sql3 = 'DELETE FROM Coach where idPlayer= ?';

    return db.promise().execute(sql2, [playerId, playerId])
        .then(() => {
            return db.promise().execute(sql3, [playerId])

        })
        .then(() => {
            return db.promise().execute(sql1, [playerId])
        })
};


exports.deleteManyPlayers = (playersIds) => {
    const sql = 'DELETE FROM Player where id IN (?)'
    return db.promise().execute(sql, [playersIds]);
};

exports.findByEmail = (email) => {
    const query = `SELECT p.id as pid,  p.email, p.password, p.firstName, p.lastName, p.level FROM Player p where p.email = ?`

    return db.promise().query(query, [email])
        .then( (results, fields) => {
            const firstRow = results[0][0];
            if(!firstRow) {
                return {};
            }
            const pl = {
                id: parseInt(firstRow.pid),
                email: firstRow.email,
                password: firstRow.password,
                firstName: firstRow.firstName,
                lastName: firstRow.lastName,
                level: firstRow.level
            };
            return pl;

        })
        .catch(err => {
            console.log(err);
            throw err;
        });
}

checkEmailUnique = (email, empId) => {
    let sql, promise;
    if(empId) {
        sql = `SELECT COUNT(1) as c FROM Player where id != ? and email = ?`;
        promise = db.promise().query(sql, [empId, email]);
    } else {
        sql = `SELECT COUNT(1) as c FROM Player where email = ?`;
        promise = db.promise().query(sql, [email]);
    }
    return promise.then( (results, fields) => {
        const count = results[0][0].c;
        let err = {};
        if(count > 0) {
            err = {
                details: [{
                    path: ['email'],
                    message: 'Podany adres email jest już używany'
                }]
            };
        }
        return err;
    });
}