import { NextFunction, Request, Response } from "express";
import fightersService from "../services/fightersService.js";

export async function compareStarCount (req: Request, res: Response){
    const {firstUser, secondUser} = req.body;
    const battleResult = await fightersService.compareStarCount(firstUser, secondUser);
    res.send(battleResult);
}