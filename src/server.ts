import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

// Cors
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

// Middlewares
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
