import {
  getConnection,
  sql
} from '../database/connection.js';



export const createHCAnamnesisMedica = async (req, res) => {

 const data = req.body;

  try {

  
    const pool = await getConnection();
    const request = pool.request();

    
    // recorrer todos los campos enviados
    Object.entries(data).forEach(([key, value]) => {
      request.input(key, value ?? null);
    });

 
    await request.execute('sp_crear_hc_anamnesis_medica');
    // Recuperación de los valores de los parámetros de salida
   
    res.status(201).json({
      message: 'Anamnesis Médica registrada exitosamente'
      /* retorno,
      resultado */
    }); 

  } catch (error) {
    console.error('Error en la ejecución del procedimiento almacenado:', error);
    return res.status(500).json({
      message: 'Error en el servidor'
    }); // Enviar un mensaje de error al cliente
  }
};


export const createHCAnamnesisOdontologica = async (req, res) => {

 const data = req.body;

  console.log("QUERY:", req.body);

  try {

  
    const pool = await getConnection();
    const request = pool.request();

    
    // recorrer todos los campos enviados
    Object.entries(data).forEach(([key, value]) => {
      request.input(key, value ?? null);
    });

 
    await request.execute('sp_crear_hc_anamnesis_odontologica');
    // Recuperación de los valores de los parámetros de salida
   
    res.status(201).json({
      message: 'Anamnesis Odontologica registrada exitosamente'
      /* retorno,
      resultado */
    }); 

  } catch (error) {
    console.error('Error en la ejecución del procedimiento almacenado:', error);
    return res.status(500).json({
      message: 'Error en el servidor'
    }); // Enviar un mensaje de error al cliente
  }
};


export const getHCAnamnesisMedicas = async (req, res) =>{

try {
 

    const {
      idpaciente
      
    } = req.query;
  
    console.log(idpaciente)

    
    const pool = await getConnection();
    const request = pool.request();

   
   
      request.input('idpaciente', sql.Int, idpaciente);

    const result = await request.execute('sp_buscar_hc_paciente_am');


   // return res.json(result.recordset);
   return res.json({
    
      anamnesis: result.recordsets[0][0] || null,
      antecedentesFamiliares: result.recordsets[1] || [],
      alergias: result.recordsets[2] || [],
      patologiasClinicas: result.recordsets[3] || []

    });

} catch (error) {
  console.error('Error en la ejecución del procedimiento almacenado:', error);
  return res.status(500).json({ message: 'Error en el servidor' }); // Enviar un mensaje de error al cliente
}
};
