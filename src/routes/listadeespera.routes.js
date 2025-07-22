import { Router } from "express";

import { getListadeEspera, postListaDeEspera, postBajaFilaListaDeEspera} from "../controllers/listadeespera.controllers.js"

const router = Router();

router.get("/listadeesperalistar", getListadeEspera);
router.post("/listadeesperaalta", postListaDeEspera);
router.post("/listadeesperabajafila", postBajaFilaListaDeEspera);

export default router;
