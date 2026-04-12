import { Router } from "express";

import { createPacientes, getPacienteBuscarID, getPacientes, getPacienteTurnosUltimos, updatePacientes } from '../controllers/pacientes.controllers.js';

const router = Router();

router.get("/pacientes", getPacientes);

router.post("/pacienteadd", createPacientes);

router.post("/pacienteupdate", updatePacientes);

router.get("/pacienteid", getPacienteBuscarID);

router.get("/pacientesultimosturnos", getPacienteTurnosUltimos);
 

export default router;