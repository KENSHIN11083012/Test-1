import { Router } from "express";
import { agregar, allMovies } from "../controllers/peliculas.js";

const router = Router();

router.post("/add", agregar);

router.get("/", allMovies);

export default router;
