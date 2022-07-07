import axios from "axios";
import fighterRepositorie from "../repositories/fightersRepositorie.js";

async function compareStarCount(firstUser: string, secondUser: string) {

    let firstUserRepos;
    let secondUserRepos;
    
    try {
        firstUserRepos = await axios.get(`https://api.github.com/users/${firstUser}/repos`);
        secondUserRepos = await axios.get(`https://api.github.com/users/${secondUser}/repos`);    
    } catch (error) {
        throw {type: "Not Found", message: "User not found", error};
    }
    
    let firstUserStars = 0;
    let secondUserStars = 0;
    firstUserRepos.data.forEach(repo => firstUserStars += repo.stargazers_count);
    secondUserRepos.data.forEach(repo => secondUserStars += repo.stargazers_count);
    //TODO: salvar no banco de dados
    if(firstUserStars > secondUserStars) {
        await fighterRepositorie.updateFighter(firstUser, true, false, false);
        await fighterRepositorie.updateFighter(secondUser, false, true, false);
        return {
            winner: firstUser,
            loser: secondUser,
            draw: false
        };
    }
    else if(secondUserStars > firstUserStars) {
        await fighterRepositorie.updateFighter(firstUser, false, true, false);
        await fighterRepositorie.updateFighter(secondUser, true, false, false);
        return {
            winner: secondUser,
            loser: firstUser,
            draw: false
        };
    }
    else {
        await fighterRepositorie.updateFighter(firstUser, false, false, true);
        await fighterRepositorie.updateFighter(secondUser, false, false, true);
        return {
            winner: null,
            loser: null,
            draw: true
        };
    }
}

async function getRanking() {
    const ranking = {fighters: []};
    ranking.fighters = await fighterRepositorie.getRanking();
    return ranking;
}

const fightersService = {compareStarCount, getRanking};
export default fightersService;