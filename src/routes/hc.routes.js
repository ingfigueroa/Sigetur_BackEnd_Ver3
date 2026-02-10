import { Router } from "express";

import { createHCAnamnesisMedica, createHCAnamnesisOdontologica, getHCAnamnesisMedicas} from '../controllers/hc.controllers.js';

const router = Router();

router.post("/hcanamnesismedicaadd", createHCAnamnesisMedica);
router.post("/hcanamnesisodontologicaadd", createHCAnamnesisOdontologica);

router.get("/hcanamnesismedicabuscar", getHCAnamnesisMedicas);


export default router;