const db = require('../../config/mysql2/db');

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
    const query = `SELECT p.id as id, p.firstName, p.lastName, p.birthDate, p.country, co.id as co_id,
        co.firstName, co.lastName, co.country as co_country
    FROM Player p
    left join Coach co on co.idPlayer = p.id 
    left join TennisMatch m on p.id = m.idPlayer1 or p.id = m.idPlayer2
    where p.id = ?`
    return db.promise().query(query, [coachId])
        .then( (results, fields) => {
            const firstRow = results[0][0];
            if(!firstRow) {
                return {};
            }
            const pl = {
                id: parseInt(id),
                firstName: firstRow.firstName,
                lastName: firstRow.lastName,
                birthDate: firstRow.birthDate,
                country: firstRow.country,
                employments: []
            }
            for( let i=0; i<results[0].length; i++ ) {
                const row = results[0][i];
                if(row.empl_id) {
                    const coach = {
                        id: row.co_id,
                        salary: row.salary,
                        dateFrom: row.dateFrom,
                        dateTo: row.dateTo,
                        department: {
                            _id: row.dept_id,
                            name: row.name,
                            budget: row.budget
                        }
                    };
                    emp.employments.push(employment);
                }
            }
            return emp;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.createCoach = (newPlayerData) => {
};

exports.updateCoach = (coachId, coachData) => {
};

exports.deleteCoach = (coachId) => {
    const sql = 'DELETE FROM Coach where id = ?'
    return db.promise().execute(sql, [coachId]);
};