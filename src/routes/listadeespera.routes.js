import { Router } from "express";

import { getListadeEspera, postListaDeEspera, postBajaFilaListaDeEspera, putAsignarTurnoListaDeEspera} from "../controllers/listadeespera.controllers.js"

const router = Router();

router.get("/listadeesperalistar", getListadeEspera);
router.post("/listadeesperaalta", postListaDeEspera);
router.post("/listadeesperabajafila", postBajaFilaListaDeEspera);
router.put("/listadeesperaasignarturno", putAsignarTurnoListaDeEspera);

export default router;
