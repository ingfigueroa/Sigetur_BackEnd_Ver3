import { Router } from "express";

import { createPacientes, getPacienteBuscarID, getPacientes, getPacienteTurnosUltimos } from '../controllers/pacientes.controllers.js';

const router = Router();

router.get("/pacientes", getPacientes);

router.post("/pacienteadd", createPacientes);

router.get("/pacienteid", getPacienteBuscarID);

router.get("/pacientesultimosturnos", getPacienteTurnosUltimos);
 

export default router;