const db = require('../../config/mysql2/db');

exports.getMatches = () => {
    return db.promise().query('SELECT t.*, p.id as pid, p.firstName as player1FistName, p.lastName as player1LastName, r.firstName, r.lastName, w.firstName as winnerFirstName, w.LastName as winnerLastName FROM TennisMatch t inner join Player p on t.idPlayer1=p.id inner join Player r on t.idPlayer2=r.id inner join Player w on t.idWinner=w.id ')
        .then( (results, fields) => {
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.getMatchById = (matchId) => {
    const query = `SELECT t.*, p.country as p_country, r.country as r_country, p.id as pid, r.id as rid, concat(p.firstName, ' ',p.lastName) as player, 
       concat(r.firstName, ' ',r.lastName) as rival, concat(w.firstName, ' ',w.lastName) as winner 
FROM TennisMatch t inner join Player p on t.idPlayer1=p.id inner join 
            Player r on t.idPlayer2=r.id inner join Player w on t.idWinner=w.id where t.id = ?`
    return db.promise().query(query, [matchId])
        .then( (results, fields) => {
            const firstRow = results[0][0];
            if(!firstRow) {
                return {};
            }
            const match = {
                id: parseInt(matchId),
                court: firstRow.court,
                round: firstRow.roundNumber,
                scorePlayer: firstRow.scorePlayer1,
                scoreRival: firstRow.scorePlayer2,
                player: firstRow.player,
                rival: firstRow.rival,
                winner: firstRow.winner,
                date: firstRow.date,
                players: []
            }


            for( let i=0; i<results[0].length; i++ ) {
                const row = results[0][i];

                const player = {
                    id: parseInt(row.pid),
                    player: row.player,
                    country: row.p_country
                };

                const rival = {
                    id: parseInt(row.rid),
                    player:firstRow.rival,
                    country: row.r_country
                };

                match.players.push(player);
                match.players.push(rival);

            }
            return match;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};


exports.createMatch = (newMatchData) => {
};

exports.updateMatch = (matchId, matchData) => {
    const sql = `UPDATE TennisMatch set firstName = ?, lastName = ?, country = ?, birthDate = ? where id = ?`;
    return db.promise().execute(sql, [data.firstName, data.lastName, data.country, data.birthDate, matchId]);
};

exports.deleteMatch = (matchId) => {
    const sql = 'DELETE FROM TennisMatch where id = ?'
    return db.promise().execute(sql, [matchId]);
};