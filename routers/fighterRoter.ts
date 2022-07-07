import { Router } from "express";

import { compareStarCount, getRanking } from "../controllers/fightersController.js";
import schemaValidator from "../middlewares/schemaValidator.js";
import { battleSchema } from "../schemas/battleSchema.js";

const fightersRouter = Router();

fightersRouter.post("/battle", schemaValidator(battleSchema), compareStarCount);
fightersRouter.get("/ranking", getRanking);

export default fightersRouter;