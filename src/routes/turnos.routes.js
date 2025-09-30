import { Router } from "express";

import { getTurnosProfesionalFecha, putTurnosPasaraPendiente, getTurnosCrear, putTurnosCambiarEstados, getEstadosPorTurno, putTurnosAnularPorPedidoProfesional, getTurnosBuscarProfesionalDiaCancelado, getAgendaSemanalProfesionalFecha, getAgendaSemanalProfesionalFechaAgrupado, getTurnosConsultasPorFecha,getTurnoID, getTurnoLibreID, postEnviarTurnosManual, postSobreturnosCrear, getTurnosLibresProfesional_Falta_Mes } from '../controllers/turnos.controllers.js';

const router = Router();

router.get("/turnoid", getTurnoID);

router.get("/turnolibreid", getTurnoLibreID);

router.get("/turnos", getTurnosProfesionalFecha);

router.put("/turnos/pasarapendiente", putTurnosPasaraPendiente);

router.get("/turnos/crearturnos", getTurnosCrear);

router.post( "/turnos/sobreturno", postSobreturnosCrear);

router.put("/turnos/cambiarestado", putTurnosCambiarEstados);

router.get("/turnos/estadosporturno", getEstadosPorTurno);

router.get("/turnos/turnoprofesionaldiacancelado", getTurnosBuscarProfesionalDiaCancelado);

router.put("/turnos/estadosporturno", getEstadosPorTurno);

router.put("/turnos/anularturnospedidoprofesional", putTurnosAnularPorPedidoProfesional);

router.get("/turnos/ageseturproffecha",getAgendaSemanalProfesionalFecha);

router.get('/turnos/AgeSemTurProfFechaAgrupado', getAgendaSemanalProfesionalFechaAgrupado);

router.get('/turnos/consultasporfecha', getTurnosConsultasPorFecha);

router.post('/turnos/postEnviarTurnosManual', postEnviarTurnosManual);

router.get('/turnos/turnoslibresfechames', getTurnosLibresProfesional_Falta_Mes)






export default router; 