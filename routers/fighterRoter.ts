import { Router } from "express";

import { compareStarCount } from "../controllers/fightersController.js";
import schemaValidator from "../middlewares/schemaValidator.js";
import { battleSchema } from "../schemas/battleSchema.js";

const fightersRouter = Router();

fightersRouter.post("/battle", schemaValidator(battleSchema), compareStarCount);
fightersRouter.get("/ranking", ()=>{});

export default fightersRouter;