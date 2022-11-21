import cors from "cors";
import express, { json } from "express";
import "express-async-errors";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware.js";
import router from "./routers/index.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
export default app;
app.use(json());
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(router);
app.use(errorHandlerMiddleware);

const port = process.env.PORT ? parseInt(process.env.PORT) : 5000;
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server up and running on port ${port}`);
  });
}
