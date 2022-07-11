import axios from "axios";
import fighterRepositorie, { Fighter } from "../repositories/fightersRepositorie.js";
import {AxiosResponse} from "axios";
//import Fighter from "../repositories/fightersRepositorie.js";

interface Teste {
    stargazers_count: number;
}

async function compareStarCount(firstUser: string, secondUser: string) {

    let firstUserRepos: AxiosResponse<Teste[]>;
    let secondUserRepos: AxiosResponse<Teste[]>;
    
    try {
        firstUserRepos = await axios.get<Teste[]>(`https://api.github.com/users/${firstUser}/repos`);
        secondUserRepos = await axios.get<Teste[]>(`https://api.github.com/users/${secondUser}/repos`);    
    } catch (error) {
        throw {type: "Not Found", message: "User not found", error};
    }
    
    let firstUserStars = 0;
    let secondUserStars = 0;
    firstUserRepos.data.forEach(repo => firstUserStars += repo.stargazers_count);
    secondUserRepos.data.forEach(repo => secondUserStars += repo.stargazers_count);
    //TODO: salvar no banco de dados
    if(firstUserStars > secondUserStars) {
        await fighterRepositorie.updateFighter({username: firstUser, wins: 1, losses: 0, draws: 0});
        await fighterRepositorie.updateFighter({username: secondUser, wins: 0, losses: 1, draws: 0});
        return {
            winner: firstUser,
            loser: secondUser,
            draw: false
        };
    }
    else if(secondUserStars > firstUserStars) {
        await fighterRepositorie.updateFighter({username: firstUser, wins: 0, losses: 1, draws: 0});
        await fighterRepositorie.updateFighter({username: secondUser, wins: 1, losses: 0, draws: 0});
        return {
            winner: secondUser,
            loser: firstUser,
            draw: false
        };
    }
    else {
        await fighterRepositorie.updateFighter({username: firstUser, wins: 0, losses: 0, draws: 1});
        await fighterRepositorie.updateFighter({username: secondUser, wins: 0, losses: 0, draws: 1});
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