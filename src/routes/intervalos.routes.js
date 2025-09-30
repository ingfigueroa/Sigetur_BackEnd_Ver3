import { Router } from "express";

import { getIntervalos} from "../controllers/intervalos.controllers.js"

const router = Router();

router.get("/intervaloslistar", getIntervalos);



export default router;