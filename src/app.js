import dotenv from "dotenv";
dotenv.config();

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
import horasDelDia from './routes/horas.routes.js';
import listadeespera from './routes/listadeespera.routes.js'
import mediosdepagos from './routes/mediosdepagos.routes.js'
import intervalosRoutes from './routes/intervalos.routes.js' 
import diassemanaRoutes from './routes/diassemana.routes.js'
 
import hcRoutes from './routes/hc.routes.js'
import correosRoutes from './routes/correos.routes.js';
import clientesRoutes from './routes/clientes.routes.js';

import loginRoutes from './routes/login.routes.js';

import usuarioRoutes from './routes/usuarios.routes.js';

import cors from 'cors';




const app = express()

app.get('/', (req,res) =>{
  res.send('Bienvenido al sistema')
})




app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://sigetur.ar"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));




//middlewares
app.use(express.json()); //“Si llega información en formato JSON, interpretala y guardala en req.body
app.use(express.urlencoded({ extended: true })); //Convierte los datos del formulario en req.body.
//extended: true --- Permite enviar objetos complejos y estructuras anidadas. 
//usuario[direccion][calle]=SanMartin 
// se transforma en {
 /*  usuario: {
    direccion: {
      calle: "SanMartin"
    }
  }
} */

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
app.use(horasDelDia);
app.use(listadeespera);
app.use(mediosdepagos);
app.use(intervalosRoutes);
app.use(diassemanaRoutes);
app.use(hcRoutes);
app.use(correosRoutes);
app.use(clientesRoutes);
app.use(loginRoutes);
app.use(usuarioRoutes);







export default app;