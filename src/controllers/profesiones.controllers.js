
import { getConnection } from '../database/connection.js';

export const getProfesiones = async (req, res) => {
    try {
           
      const pool = await getConnection();
      const request = pool.request();
      let result;
          
      result = await request.execute('sp_Buscar_Profesiones');
           
      return res.json(result.recordset);
      
    } catch (error) {
        console.error('Error en la ejecución del procedimiento almacenado:', error);
        return res.status(500).json({ message: 'Error en el servidor' });
    } 
};