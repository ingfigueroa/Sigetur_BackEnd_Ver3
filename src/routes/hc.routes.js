import { Router } from "express";

import { createHCAnamnesisMedica, createHCAnamnesisOdontologica, getHCAnamnesisMedicas, getHCAnamnesisOdontologica, getHCSituacionDentaria, createHCOdontogramaFoto, getHCUltimaFoto, getHCNro, createHC, createHCDiagnostico, getHCDiagnostico} from '../controllers/hc.controllers.js';

const router = Router();

router.post("/hccreate", createHC);
router.post("/hcamadd", createHCAnamnesisMedica);
router.post("/hcaoadd", createHCAnamnesisOdontologica);
router.post("/hcodontogramaadd", createHCOdontogramaFoto);
router.post("/hcdiagnosticoadd", createHCDiagnostico);

router.get("/hcnrobuscar", getHCNro);

router.get("/hcambuscar", getHCAnamnesisMedicas);
router.get("/hcaobuscar", getHCAnamnesisOdontologica);

router.get("/hcodsituaciondentaria", getHCSituacionDentaria); 
router.get("/hcodultimafoto", getHCUltimaFoto);
router.get("/hcdiagnosticobuscar", getHCDiagnostico);


   
 
export default router;