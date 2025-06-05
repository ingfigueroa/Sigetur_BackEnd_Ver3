import { Router } from "express";

import { getTurnosProfesionalFecha, putTurnosPasaraPendiente, getTurnosCrear, putTurnosCambiarEstados, getEstadosPorTurno, putTurnosAnularPorPedidoProfesional, getTurnosBuscarProfesionalDiaCancelado, getAgendaSemanalProfesionalFecha, getAgendaSemanalProfesionalFechaAgrupado, getTurnosConsultasPorFecha } from '../controllers/turnos.controllers.js';

const router = Router();

router.get("/turnos", getTurnosProfesionalFecha);

router.put("/turnos/pasarapendiente", putTurnosPasaraPendiente);

router.get("/turnos/crearturnos", getTurnosCrear);

router.put("/turnos/cambiarestado", putTurnosCambiarEstados);

router.get("/turnos/estadosporturno", getEstadosPorTurno);

router.get("/turnos/turnoprofesionaldiacancelado", getTurnosBuscarProfesionalDiaCancelado);

router.put("/turnos/estadosporturno", getEstadosPorTurno);

router.put("/turnos/anularturnospedidoprofesional", putTurnosAnularPorPedidoProfesional);

router.get("/turnos/ageseturproffecha",getAgendaSemanalProfesionalFecha);

router.get('/turnos/AgeSemTurProfFechaAgrupado', getAgendaSemanalProfesionalFechaAgrupado);

router.get('/turnos/consultasporfecha', getTurnosConsultasPorFecha);


export default router;