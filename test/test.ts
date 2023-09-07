import express, { Response, Application, Request, Router } from "express";
import { REDIS_URL, client } from "../config/dbConnect";
import { dbConnect } from "../src/server";
require("dotenv").config();
import request from 'supertest';

const app = express();

describe("Test The movie path", () => {
    beforeAll( () => {
        dbConnect();

    })
    Router().get(`${process.env.API_BASE_URL}/movie/search`, (req: Request, res: Response) => {

        test("Returns movie response", () => {
            return request(app)
            .get(`${process.env.API_BASE_URL}/movie/search`)
            .expect(200);
        });
    
        afterAll( () => {
            client.disconnect()
            .then( disconnected => {
                console.log(`Redis server running on port ${REDIS_URL.split(':')[2]} has been disconnected.`)
            })
        })

    })
});