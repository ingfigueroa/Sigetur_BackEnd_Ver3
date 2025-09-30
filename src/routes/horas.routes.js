import { Router } from "express";

import { getHoras, getHorasMananaTardeNoche} from "../controllers/horas.controllers.js"

const router = Router();

router.get("/horaslistar", getHoras);

router.get('/horasmananatardenoche', getHorasMananaTardeNoche)

export default router;

