import {
  getConnection,
  sql
} from '../database/connection.js';

export const getEmail = async (req, res) => {
  try {
    const {
      email
    } = req.query;

 

    const pool = await getConnection();
    const request = pool.request();
    let result;


    
       request.input('email', sql.VarChar, email);

     
     
      result = await request.execute('sp_Buscar_usuario_Email');

    

    return res.json({
      total: result.recordsets[0][0].Total,
      registros: result.recordsets[1]
    });



  } catch (error) {
    
    return res.status(500).json({
      message: 'Error en el servidor'
    });
  }
};