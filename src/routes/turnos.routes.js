import { Router } from "express";

import {verificarTokenUsuario} from "../middleware/auth.js";

import authorize from "../middleware/authorize.js";

import ROLES from "../constants/roles.js";

import { getTurnosProfesionalFecha, putTurnosPasaraPendiente, getTurnosCrear, putTurnosCambiarEstados, getEstadosPorTurno, putTurnosAnularPorPedidoProfesional, getTurnosBuscarProfesionalDiaCancelado, getAgendaSemanalProfesionalFecha, getAgendaSemanalProfesionalFechaAgrupado, getTurnosConsultasPorFecha,getTurnoID, getTurnoLibreID, postEnviarTurnosManual, postSobreturnosCrear, getTurnosLibresProfesional_Falta_Mes, postTurnoCobrar, postTurnoRegistrarPrestaciones, getPrestacionesporTurno, getTurnoIDDetalle, getTurnosBuscarProfesionalDiaAtiende} from '../controllers/turnos.controllers.js';

const router = Router();

router.get("/turnoid", verificarTokenUsuario,  authorize([ROLES.ADMIN, ROLES.SECRETARIA]), getTurnoID);

router.get("/turnolibreid",verificarTokenUsuario,  authorize([ROLES.ADMIN, ROLES.SECRETARIA]), getTurnoLibreID);

router.get("/turnos",verificarTokenUsuario,  authorize([ROLES.ADMIN, ROLES.SECRETARIA]), getTurnosProfesionalFecha);

router.put("/turnos/pasarapendiente",verificarTokenUsuario,  authorize([ROLES.ADMIN, ROLES.SECRETARIA]), putTurnosPasaraPendiente);

router.get("/turnos/crearturnos",verificarTokenUsuario,  authorize([ROLES.ADMIN, ROLES.SECRETARIA]), getTurnosCrear);

router.post( "/turnos/sobreturno",verificarTokenUsuario,  authorize([ROLES.ADMIN, ROLES.SECRETARIA]), postSobreturnosCrear);

router.put("/turnos/cambiarestado",verificarTokenUsuario,  authorize([ROLES.ADMIN, ROLES.SECRETARIA]), putTurnosCambiarEstados);

router.get("/turnos/estadosporturno",verificarTokenUsuario,  authorize([ROLES.ADMIN, ROLES.SECRETARIA]), getEstadosPorTurno);

router.get("/turnos/turnoprofesionaldiacancelado",verificarTokenUsuario,  authorize([ROLES.ADMIN, ROLES.SECRETARIA]), getTurnosBuscarProfesionalDiaCancelado);

router.put("/turnos/estadosporturno",verificarTokenUsuario,  authorize([ROLES.ADMIN, ROLES.SECRETARIA]), getEstadosPorTurno);

router.put("/turnos/anularturnospedidoprofesional",verificarTokenUsuario,  authorize([ROLES.ADMIN, ROLES.SECRETARIA]), putTurnosAnularPorPedidoProfesional);

router.get("/turnos/ageseturproffecha",verificarTokenUsuario,  authorize([ROLES.ADMIN, ROLES.SECRETARIA]),getAgendaSemanalProfesionalFecha);


router.get('/turnos/AgeSemTurProfFechaAgrupado',verificarTokenUsuario,  authorize([ROLES.ADMIN, ROLES.SECRETARIA]), getAgendaSemanalProfesionalFechaAgrupado);

router.get('/turnos/consultasporfecha', verificarTokenUsuario,  authorize([ROLES.ADMIN, ROLES.SECRETARIA]),getTurnosConsultasPorFecha);

router.post('/turnos/postEnviarTurnosManual',verificarTokenUsuario,  authorize([ROLES.ADMIN, ROLES.SECRETARIA]), postEnviarTurnosManual);

router.get('/turnos/turnoslibresfechames',verificarTokenUsuario,  authorize([ROLES.ADMIN, ROLES.SECRETARIA]), getTurnosLibresProfesional_Falta_Mes)

router.post('/turnos/cobrar',verificarTokenUsuario,  authorize([ROLES.ADMIN, ROLES.SECRETARIA]), postTurnoCobrar)

router.post('/turnos/registrarprestaciones',verificarTokenUsuario,  authorize([ROLES.ADMIN, ROLES.SECRETARIA]), postTurnoRegistrarPrestaciones)

router.get('/turnos/prestacionesporturno',verificarTokenUsuario,  authorize([ROLES.ADMIN, ROLES.SECRETARIA]), getPrestacionesporTurno)

router.get("/turnoid/detalle", verificarTokenUsuario,  authorize([ROLES.ADMIN, ROLES.SECRETARIA]), getTurnoIDDetalle);

router.get("/turnos/turnoprofesionaldiaatiende",verificarTokenUsuario,  authorize([ROLES.ADMIN, ROLES.SECRETARIA]), getTurnosBuscarProfesionalDiaAtiende);


 



export default router;  