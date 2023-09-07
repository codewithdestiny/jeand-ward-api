import express, { Application , Express, NextFunction, Request, Response} from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from 'cors';
require("dotenv").config();

export const app : Application = express();


app.use(helmet())

app.use(morgan('dev'));

app.use(express.json());

app.use(express.urlencoded({extended: true}));


app.use(`${process.env.API_BASE_URL}/movie`, require("../routes/movie"));

app.all("*", (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({"error": "No resource endpoint found!"});
})

cors({
    origin: ["http://localhost:3500", "http://localhost:3000"],
    methods: "PUT, GET, DELETE, POST",
    credentials: true,
});


