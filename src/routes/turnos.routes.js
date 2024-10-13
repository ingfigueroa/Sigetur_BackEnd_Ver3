import { Router } from "express";

import { getTurnosProfesionalFecha, putTurnosPasaraPendiente, getTurnosCrear, putTurnosCambiarEstados, getEstadosPorTurno, putTurnosAnularPorPedidoProfesional } from '../controllers/turnos.controllers.js';

const router = Router();

router.get("/turnos", getTurnosProfesionalFecha);

router.put("/turnos/pasarapendiente", putTurnosPasaraPendiente);

router.get("/turnos/crearturnos", getTurnosCrear);

router.put("/turnos/cambiarestado", putTurnosCambiarEstados);

router.get("/turnos/estadosporturno", getEstadosPorTurno);

router.put("/turnos/estadosporturno", getEstadosPorTurno);

router.put("/turnos/anularturnospedidoprofesional", putTurnosAnularPorPedidoProfesional);




export default router;