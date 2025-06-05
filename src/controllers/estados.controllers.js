import {getConnection} from '../database/connection.js'



const pool = await getConnection();

export const getEstados = async (req, res) => {
    try {
     
      
      const pool = await getConnection();
      const request = pool.request();
      let result;
      
      result = await request.execute('sp_Buscar_Estados');
      return res.json(result.recordset);
      
    } catch (error) {
      console.error('Error en la ejecución del procedimiento almacenado:', error);
      return res.status(500).json({ message: 'Error en el servidor' }); // Enviar un mensaje de error al cliente
    }
  };




