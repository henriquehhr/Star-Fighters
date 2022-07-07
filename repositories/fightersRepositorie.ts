import db from "./../database/database.js";

async function updateFighter(fighter: string, win: boolean, defeat: boolean, draw: boolean){

    const fighterData = await db.query("SELECT * FROM fighters WHERE username = $1", [fighter]);
    if(fighterData.rowCount === 0) {
        await db.query(
            `INSERT INTO fighters (username, wins, losses, draws)
            VALUES ($1, $2, $3, $4)`, [fighter, +win, +defeat, +draw]
        );
        return;
    }
    const query = win ? "wins" : (defeat ? "losses" : (draw ? "draws" : ""));
    const value = win ? fighterData.rows[0].wins : (defeat ? fighterData.rows[0].losses : (draw ? fighterData.rows[0].draws : 0));
    await db.query(
        `UPDATE fighters
        SET ` + query + ` = $1
        WHERE username = $2`,
        [value + 1, fighter]
    );

}

const fighterRepositorie = {updateFighter};
export default fighterRepositorie;