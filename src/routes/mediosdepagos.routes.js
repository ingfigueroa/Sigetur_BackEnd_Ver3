import { Router } from "express";

import { getMediosdePagos} from "../controllers/mediosdepagos.controllers.js"

const router = Router();

router.get("/mediosdepagos", getMediosdePagos);

export default router;

