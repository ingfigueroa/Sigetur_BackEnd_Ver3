import { Router } from "express";

import { createProfesionales, getProfesionales, getProfesionalProfesion, getProfesionalesHorarios,getProfesionalBuscarID, putProfesionalPasaraPasivo, getProfesionalFechaCambioHorario, putProfesionalCambioHorarioMultiple } from '../controllers/profesionales.controllers.js';

const router = Router();

router.get("/profesionales", getProfesionales);

router.get("/profesionaleshorarios", getProfesionalesHorarios);

router.get("/profesionalesProfesionid", getProfesionalProfesion);

router.post("/profesionales", createProfesionales);

router.get("/profesionalid", getProfesionalBuscarID);

router.put("/profesional/baja", putProfesionalPasaraPasivo)

router.get("/profesional/fechacambiohorario", getProfesionalFechaCambioHorario)

router.post("/profesional/cambiohorariomultiple", putProfesionalCambioHorarioMultiple)


export default router;