
import { getConnection, sql } from '../database/connection.js';

export const getLocalidades = async (req, res) => {
    try {
      const { idprovincia } = req.query
      const pool = await getConnection();
      const request = pool.request();
      let result;
   
      request.input('idprovincia', sql.Int, idprovincia )
     
      result = await request.execute('sp_cargar_Localidades');
      
      return res.json(result.recordset); 
    } catch (error) {
     
      return res.status(500).json({ message: 'Error en el servidor' }); // Enviar un mensaje de error al cliente
    } 
  };