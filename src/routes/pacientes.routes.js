import { Router } from "express";

import {verificarTokenUsuario} from "../middleware/auth.js";

import authorize from "../middleware/authorize.js";

import ROLES from "../constants/roles.js";

import { createPacientes, getPacienteBuscarID, getPacientes, getPacienteTurnosUltimos, updatePacientes, getPacienteBuscarxEmail } from '../controllers/pacientes.controllers.js';

const router = Router();

router.get("/pacientesget", verificarTokenUsuario, authorize([ROLES.ADMIN, ROLES.SECRETARIA, ROLES.PROFESIONAL]), getPacientes);

router.post("/pacienteadd",verificarTokenUsuario, authorize([ROLES.ADMIN, ROLES.SECRETARIA]), createPacientes);

router.post("/pacienteupdate", verificarTokenUsuario, authorize([ROLES.ADMIN, ROLES.SECRETARIA]), updatePacientes);

router.get("/pacienteid", verificarTokenUsuario, authorize([ROLES.ADMIN, ROLES.SECRETARIA, ROLES.PROFESIONAL]), getPacienteBuscarID);


router.get("/pacientesultimosturnos", verificarTokenUsuario, authorize([ROLES.ADMIN, ROLES.SECRETARIA, ROLES.PROFESIONAL]), getPacienteTurnosUltimos);

router.get("/pacienteemail", verificarTokenUsuario, authorize([ROLES.ADMIN, ROLES.SECRETARIA, ROLES.PROFESIONAL]), getPacienteBuscarxEmail);
 

export default router;