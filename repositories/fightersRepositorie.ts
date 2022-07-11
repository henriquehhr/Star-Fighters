import db from "./../database/database.js";

export interface Fighter {
    username: string;
    wins: number;
    losses: number;
    draws: number;
}

async function updateFighter(fighter: Fighter){

    const {username, wins, losses, draws} = fighter;
    const fighterData = await db.query<Fighter>("SELECT * FROM fighters WHERE username = $1", [fighter]);
    if(fighterData.rowCount === 0) {
        await db.query(
            `INSERT INTO fighters (username, wins, losses, draws)
            VALUES ($1, $2, $3, $4)`, [username, wins, losses, draws]
        );
        return;
    }
    const query = wins ? "wins" : (losses ? "losses" : (draws ? "draws" : ""));
    const value = wins ? fighterData.rows[0].wins : (losses ? fighterData.rows[0].losses : (draws ? fighterData.rows[0].draws : 0));
    await db.query(
        `UPDATE fighters
        SET ` + query + ` = $1
        WHERE username = $2`,
        [value + 1, username]
    );

}

async function getRanking() {

    const fighters = await db.query<Fighter>(
        `SELECT username, wins, losses, draws
        FROM fighters ORDER BY wins DESC, draws DESC`
    );
    
    return fighters.rows;
}

const fighterRepositorie = {updateFighter, getRanking};
export default fighterRepositorie;