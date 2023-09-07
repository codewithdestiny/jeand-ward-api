import axios from "axios";
import { NextFunction, Request, Response } from "express";
import { client } from "../../config/dbConnect";
require('dotenv').config();

export const MovieController = {
    searchMovie : async (req: Request, res: Response, next : NextFunction) => {
        const {title, type, year, } = req.body;

        if(title == "" ){
            return res.status(400).json({"error": "movie title is required", "status": res.statusMessage})
        }
        else if(type == ""){
            return res.status(400).json({"status": res.statusMessage, "error": "either movie, series, episode is required"})
        }
        else{

            //add pagination

            const apiData = {
                apikey : `${process.env.OMDB_API_KEY}`,
                t : title,
                type: type,
                y : year,
                r: "json",
            };
            axios.get(`${process.env.OMDB_API_URL}`, {params: apiData})
            .then( response => {
                client.hSet(title, {
                    "title": response.data['Title'],
                    "year": response.data['Year'],
                    "rated": response.data['Rated'],
                    "released": response.data['Released'],
                    "description": response.data['Plot'],
                    "language": response.data['Language'],
                    "actors": response.data['Actors'],
                    "type": response.data['Type'],
                    "imdbRating": response.data['imdbRating'],
                    "country": response.data['Country'],
                    "writer": response.data['Writer'],
                    "runtime": response.data['Released']
                })
                .then(savedObject => {
                    return res.status(400).json({"data": response.data})
                })
                .catch(err => {
                    return res.status(200).json({"error": `${err}`})
                })
            })
            .catch(err => {console.log(`Error occurred - ${err}`)})


        }
        
    },
    getAllMovie :async (req: Request, res: Response, next : NextFunction) => {
        client.hGetAll("The Legend")
    }
};