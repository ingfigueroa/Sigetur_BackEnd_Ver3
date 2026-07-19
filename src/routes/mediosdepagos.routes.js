import { Router } from "express";

import { getMediosdePagos, getTarjetasCreditoDebito} from "../controllers/mediosdepagos.controllers.js"

const router = Router();

router.get("/mediosdepagos", getMediosdePagos);
router.get("/tarjetascreditodebito", getTarjetasCreditoDebito);

export default router;

