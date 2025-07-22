import { Router } from "express";

import { getHoras} from "../controllers/horas.controllers.js"

const router = Router();

router.get("/horaslistar", getHoras);

export default router;

