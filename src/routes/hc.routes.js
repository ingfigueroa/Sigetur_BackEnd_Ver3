import { Router } from "express";

import { createHCAnamnesisMedica, createHCAnamnesisOdontologica, getHCAnamnesisMedicas, getHCAnamnesisOdontologica, getHCSituacionDentaria, createHCOdontogramaFoto, getHCUltimaFoto, getHCNro, createHC} from '../controllers/hc.controllers.js';

const router = Router();

router.post("/hccreate", createHC);
router.post("/hcamadd", createHCAnamnesisMedica);
router.post("/hcaoadd", createHCAnamnesisOdontologica);
router.post("/hcodontogramaadd", createHCOdontogramaFoto);

router.get("/hcnrobuscar", getHCNro);

router.get("/hcambuscar", getHCAnamnesisMedicas);
router.get("/hcaobuscar", getHCAnamnesisOdontologica);

router.get("/hcodsituaciondentaria", getHCSituacionDentaria); 
router.get("/hcodultimafoto", getHCUltimaFoto);


   
 
export default router;