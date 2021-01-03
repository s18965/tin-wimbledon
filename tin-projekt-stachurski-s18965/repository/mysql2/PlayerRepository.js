const db = require('../../config/mysql2/db');
const playerSchema = require('../../model/joi/Player');

exports.getPlayers = () => {
    return db.promise().query('SELECT * FROM Player')
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
    const query = `SELECT p.id as id,  p.firstName, p.lastName, p.birthDate, p.country, co.id as co_id,
    co.firstName as coFN , co.lastName as coLN, co.country as co_country
    FROM Player p
    left join Coach co on co.idPlayer = p.id 
    where p.id = ?`

    const query1 = `SELECT t.id as tid,t.date as tdate, concat(r.firstName, ' ',r.lastName) as rival, concat(w.firstName, ' ',w.lastName) as winner
                    FROM TennisMatch t inner join Player p on t.idPlayer1=p.id inner join
                         Player r on t.idPlayer2=r.id inner join Player w on t.idWinner=w.id where p.id=?`

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
                coaches: [],
                matches: []
            }

            for( let i=0; i<results[0].length; i++ ) {
                const row = results[0][i];
                if (row.co_id) {
                    const coach = {
                        id: parseInt(row.co_id),
                        firstName: row.coFN,
                        lastName: row.coLN,
                        country: row.co_country
                    };

                    pl.coaches.push(coach);
                }
            }

                return db.promise().query(query1, [playerId])
                    .then( (results, fields) => {

                        for( let i=0; i<results[0].length; i++ ) {
                            const row = results[0][i];
                            if(row.tid) {
                                const match = {
                                    id: parseInt(row.tid),
                                    rival: row.rival,
                                    winner: row.winner,
                                    date: row.tdate,
                                }

                                pl.matches.push(match);
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
    if(vRes) {
        return Promise.reject(vRes);
    }


    console.log('createPlayer');
    console.log(data);
    const sql = 'INSERT into Player (firstName, lastName, country, birthDate) VALUES (?, ?, ?, ?)';
    return db.promise().execute(sql, [data.firstName, data.lastName, data.country, data.birthDate]);
};

exports.updatePlayer = (playerId, data) => {
    const sql = `UPDATE Player set firstName = ?, lastName = ?, country = ?, birthDate = ? where id = ?`;
    return db.promise().execute(sql, [data.firstName, data.lastName, data.country, data.birthDate, playerId]);
};

exports.deletePlayer = (playerId) => {
    const sql1 = 'DELETE FROM Player where id = ?';
    const sql2 = 'DELETE FROM TennisMatch where  idPlayer2 = ? ';
    const sql3 = 'UPDATE Coach set idPlayer = 0 where idPlayer = ?';

    return db.promise().execute(sql1, [playerId])
        .then(() => {
            return db.promise().execute(sql2, [playerId])

        })
        .then(() => {
            return db.promise().execute(sql3, [playerId])
        })
};


exports.deleteManyPlayers = (playersIds) => {
    const sql = 'DELETE FROM Player where id IN (?)'
    return db.promise().execute(sql, [playersIds]);
};