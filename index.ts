import express, {json} from "express";
import "express-async-errors";
import dotenv from "dotenv";

import errorHandler from "./middlewares/errorHandler.js";
import fightersRouter from "./routers/fighterRoter.js";

dotenv.config();

const app = express();
app.use(json());
app.use(fightersRouter);
app.use(errorHandler);

const port = +process.env.PORT || 5001;

app.listen(port, () => console.log(`Server live at port: ${port}`));