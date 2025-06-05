import express from 'express';
import estadosRoutes from './routes/estados.routes.js';
import profesionalesRoutes from './routes/profesionales.routes.js';
import pacientesRoutes from './routes/pacientes.routes.js';
import obrassocialesRoutes from './routes/obrassociales.routes.js';
import profesionesRoutes from './routes/profesiones.routes.js';
import tipoSexoRoutes from './routes/tiposexo.routes.js';
import tipoDocumentoRoutes from './routes/tipodocumento.routes.js';
import provinciasRoutes from './routes/provincias.routes.js';
import localidadesRoutes from './routes/localidades.routes.js';
import turnosRoutes from './routes/turnos.routes.js';
import prestacionesRoutes from './routes/prestaciones.routes.js';

import cors from 'cors';


const app = express()

app.get('/', (req,res) =>{
  res.send('Bienvenido a SIGETUR')
})


app.use(cors({
  origin: 'http://localhost:5173',  // Permite solicitudes desde tu origen específico
  methods: ['GET', 'POST', 'PUT'],          // Permite solo métodos GET y POST, por ejemplo
  allowedHeaders: ['Content-Type'],  // Permite solo ciertos encabezados
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(estadosRoutes);
app.use(profesionalesRoutes);
app.use(pacientesRoutes);
app.use(obrassocialesRoutes);
app.use(profesionesRoutes);
app.use(tipoSexoRoutes);
app.use(tipoDocumentoRoutes);
app.use(provinciasRoutes);
app.use(localidadesRoutes);
app.use(turnosRoutes);
app.use(prestacionesRoutes);



export default app;