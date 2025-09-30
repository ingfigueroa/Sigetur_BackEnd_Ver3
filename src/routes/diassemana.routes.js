import { Router } from "express";

import { getBuscar} from "../controllers/diassemana.controllers.js"

const router = Router();

router.get("/diassemanalistar", getBuscar);



export default router;

