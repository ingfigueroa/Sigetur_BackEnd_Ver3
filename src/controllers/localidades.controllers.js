
import { getConnection, sql } from '../database/connection.js';

export const getLocalidades = async (req, res) => {
    try {
      const { idprovincia } = req.query
      const pool = await getConnection();
      const request = pool.request();
      let result;

      request.input('IDprovincia', sql.Int, idprovincia )
      console.log(idprovincia)
      result = await request.execute('sp_Buscar_Localidades');
      
      return res.json(result.recordset); 
    } catch (error) {
      console.error('Error en la ejecución del procedimiento almacenado:', error);
      return res.status(500).json({ message: 'Error en el servidor' }); // Enviar un mensaje de error al cliente
    } finally {
      if (pool) {
        pool.close(); // Cerrar la conexión a la base de datos
      }
    }
  };