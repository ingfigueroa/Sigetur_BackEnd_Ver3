import { Router } from "express";

import {verificarTokenUsuario} from "../middleware/auth.js";

import authorize from "../middleware/authorize.js";

import ROLES from "../constants/roles.js";

import { createProfesionales, getProfesionales, getProfesionalProfesion, getProfesionalesHorarios,getProfesionalBuscarID, putProfesionalPasaraPasivo, getProfesionalFechaCambioHorario, putProfesionalCambioHorarioMultiple, getIDProfesionalBuscarxEmail } from '../controllers/profesionales.controllers.js';

const router = Router();

router.get("/profesionales",  verificarTokenUsuario,  authorize([ROLES.ADMIN, ROLES.SECRETARIA]),  getProfesionales);


router.get("/profesionaleshorarios", verificarTokenUsuario,  authorize([ROLES.ADMIN, ROLES.SECRETARIA, ROLES.PROFESIONAL]),  getProfesionalesHorarios);

router.get("/profesionalesProfesionid", verificarTokenUsuario, authorize(ROLES.ADMIN),getProfesionalProfesion);

router.post("/profesionalesadd", authorize([ROLES.ADMIN, ROLES.SECRETARIA]), createProfesionales);

router.get("/profesionalid", getProfesionalBuscarID);

router.get("/idprofesionalemail", getIDProfesionalBuscarxEmail);

router.put("/profesional/baja", authorize([ROLES.ADMIN, ROLES.SECRETARIA]), putProfesionalPasaraPasivo)

router.get("/profesional/fechacambiohorario", authorize([ROLES.ADMIN, ROLES.SECRETARIA]), getProfesionalFechaCambioHorario)

router.post("/profesional/cambiohorariomultiple",authorize([ROLES.ADMIN, ROLES.SECRETARIA]),  putProfesionalCambioHorarioMultiple)

//router.post("/passwordtransitoria", postCrearCliente);


export default router;