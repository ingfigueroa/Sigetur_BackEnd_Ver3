import express from 'express';

import { getObrasSociales, getObrasSocialesPorPaciente, putObraSocialAsignarPaciente, putObraSocialDesafectarPaciente, putObraSocialActivar } from '../controllers/obrassociales.controllers.js';

const router = express.Router();

// Ruta para obtener todas las obras sociales
router.get('/obrassociales', getObrasSociales);

// Ruta para obtener obras sociales de un paciente específico
router.get('/obrassociales/paciente', getObrasSocialesPorPaciente);

router.put('/obrassociales/asignarapaciente', putObraSocialAsignarPaciente)

router.put('/obrassociales/desafectarapaciente', putObraSocialDesafectarPaciente)

router.put ('/obrassociales/activar', putObraSocialActivar)



export default router;