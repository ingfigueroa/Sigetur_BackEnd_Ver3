import {getConnection, sql} from '../database/connection.js';


/* export const getObrasSocialesPorPaciente = async (req, res) => {
  
  const { idPaciente } = req.query;  // Se obtiene el idPaciente desde los parámetros de la ruta

 
  
  try {
      const pool = await getConnection();
      const request = pool.request();
      let result;

      
      request.input('idpaciente', sql.Int, idPaciente);
 
      result = await request.execute('sp_obras_sociales_por_paciente');
    console.log("Resultado SP:", result);
    return res.json(result.recordset);
    
  } catch (error) {
    console.error('Error en la ejecución del procedimiento almacenado:', error);
    return res.status(500).json({ message: 'Error en el servidor' }); // Enviar un mensaje de error al cliente
  } 
}; */

// controlador en tu backend


export const getObrasSocialesPorPaciente = async (req, res) => {
  try {
    const { idpaciente } = req.query; // viene de ?idPaciente=2304
    
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("idpaciente", sql.Int, idpaciente) // tiene que coincidir exacto
      .execute("sp_obras_sociales_por_paciente");

  
    res.json(result.recordset); // devolvés solo el recordset
  } catch (error) {
    console.error("Error ejecutando SP:", error);
    res.status(500).send(error.message);
  }
};



export const getObrasSociales = async (req, res) =>{

try {
  
    const {
      Nombre,
      sigla,
      bandera,
      pagina,
      cantidadPorPagina
    } = req.query;
  
    const page = parseInt(pagina) || 1;
    const limit = parseInt(cantidadPorPagina) || 20;
    const offset = (page - 1) * limit;
    
    const pool = await getConnection();
    const request = pool.request();

   
    request.input('obrasocial', sql.VarChar, Nombre);
    
    request.input('sigla', sql.VarChar, sigla);
    request.input('activopasivo', sql.Int, bandera);
      request.input('Offset', sql.Int, offset);
      request.input('Limit', sql.Int, limit);

    const result = await request.execute('sp_buscar_obras_sociales');


   // return res.json(result.recordset);
   return res.json({
      
      
      total: result.recordsets[0][0].Total,
      registros: result.recordsets[1]
    });

} catch (error) {
  console.error('Error en la ejecución del procedimiento almacenado:', error);
  return res.status(500).json({ message: 'Error en el servidor' }); // Enviar un mensaje de error al cliente
}
};


export const putObraSocialDesafectarPaciente = async (req, res) => {
 try {
  const {
    idpaciente,
    idobrasocial,
    idusuario
   
  } = req.body || {};

  
    const pool = await getConnection();
    const request = pool.request();
    let result;
    const altabaja = 0;



    request.input('idpaciente', sql.Int, idpaciente);
    request.input('idobrasocial', sql.Int, idobrasocial);
    request.input('altabaja', sql.Bit, altabaja);
    request.input('idusuario', sql.Int, idusuario);


    result = await request.execute('sp_paciente_obrasocial_transitar_activo_pasivo');



    return res.status(201).json({
      message: 'Profesional dado de baja éxitosamente',

    });
  } catch (error) {

    return res.status(500).json({
      message: 'Error en el servidor'
    }, error);
  }
};


export const putObraSocialAsignarPaciente = async (req, res) => {


 try {
  const {
    idpaciente,
    idobrasocial,
    
    idusuario
   
  } = req.body || {};

 
    const pool = await getConnection();
    const request = pool.request();
    let result;
    const altabaja = 1;

    

    request.input('idpaciente', sql.Int, idpaciente);
    request.input('idobrasocial', sql.Int, idobrasocial);
    request.input('altabaja', sql.Bit, altabaja);
    request.input('idusuario', sql.Int, idusuario);
    


    result = await request.execute('sp_paciente_obrasocial_transitar_activo_pasivo');


    res.status(201).json({
      message: 'Obra social asignada exitósamente'

    });
  } catch (error) {
    console.error('Error en la ejecución del procedimiento almacenado:', error);
    res.status(500).json({
      message: 'Error en el servidor'
    });
  }
};


export const putObraSocialActivar = async (req, res) => {


 try {
  const {
   
    idobrasocial
   
  } = req.body || {};

 
    const pool = await getConnection();
    const request = pool.request();
    let result;
    



   
    request.input('id', sql.Int, idobrasocial);
    
    
   


    result = await request.execute('sp_obrasocial_transitar_activo');


    res.status(201).json({
      message: 'Obra social asignada exitósamente'

    });
  } catch (error) {
    console.error('Error en la ejecución del procedimiento almacenado:', error);
    res.status(500).json({
      message: 'Error en el servidor'
    });
  }
};


