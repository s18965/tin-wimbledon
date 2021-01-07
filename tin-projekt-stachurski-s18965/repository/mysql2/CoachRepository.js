const db = require('../../config/mysql2/db');
const coachSchema = require('../../model/joi/Coach');

exports.getCoaches = () => {
    return db.promise().query('SELECT * FROM Coach')
        .then( (results, fields) => {
            console.log(results[0]);
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.getCoachById = (coachId) => {
    const query = `SELECT p.id as id,  p.firstName, p.lastName, p.birthDate, p.country, co.id as co_id,
                          co.firstName as coFN , co.lastName as coLN, co.country as co_country
                   FROM Player p
                            right join Coach co on co.idPlayer = p.id
                           
                   where co.id = ?`
    return db.promise().query(query, [coachId])
        .then( (results, fields) => {
            const firstRow = results[0][0];
            if(!firstRow) {
                return {};
            }
            const coach = {
                id: parseInt(coachId),
                firstName: firstRow.coFN,
                lastName: firstRow.coLN,
                country: firstRow.co_country,
                idPlayer: firstRow.id,
                player: [],
            }

            for( let i=0; i<results[0].length; i++ ) {
                const row = results[0][i];
                if(row.id) {
                    const player = {
                        id: parseInt(row.id),
                        firstName: row.firstName,
                        lastName: row.lastName,
                        country: row.country
                    };

                    coach.player.push(player);
                }
            }

          return coach;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.createCoach = (data) => {

    const vRes = coachSchema.validate(data, { abortEarly: false} );
    if(vRes.error) {
        return Promise.reject(vRes.error);
    }


    const sql = 'INSERT into Coach (firstName, lastName, country, idPlayer) VALUES (?, ?, ?, ?)';
    return db.promise().execute(sql, [data.firstName, data.lastName, data.country, data.idPlayer]);
};

exports.updateCoach = (coachId, data) => {

    const vRes = coachSchema.validate(data, { abortEarly: false} );
    if(vRes.error) {
        return Promise.reject(vRes.error);
    }

    const sql = `UPDATE Coach set firstName = ?, lastName = ?, country = ?, idPlayer = ? where id = ?`;
    return db.promise().execute(sql, [data.firstName, data.lastName, data.country, data.idPlayer, coachId]);
};

exports.deleteCoach = (coachId) => {
    const sql1 = 'DELETE FROM Coach where id = ?';
    return db.promise().execute(sql1, [coachId])
};
