import { Router } from "express";
import { MovieController } from "../controller/model/MovieController";

const router = Router();

router.get('/search', MovieController.searchMovie);

module.exports = router;