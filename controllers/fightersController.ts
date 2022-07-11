import { NextFunction, Request, Response } from "express";
import fightersService from "../services/fightersService.js";


interface battle {
    firstUser: string;
    secondUser: string;
};

export async function compareStarCount (req: Request, res: Response){
    const {firstUser, secondUser}: battle = req.body;
    const battleResult = await fightersService.compareStarCount(firstUser, secondUser);
    res.send(battleResult);
}

export async function getRanking (req: Request, res: Response){
    const ranking = await fightersService.getRanking();
    res.send(ranking);
}