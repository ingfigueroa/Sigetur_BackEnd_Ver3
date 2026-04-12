import {
  getConnection,
  sql
} from '../database/connection.js'





export const postCrearCliente = async (req, res) => {

  const {
    email,
	  razonsocial,
	  tipocliente
  } = req.body || {};



  try {
    const pool = await getConnection();
    const request = pool.request();

   



    /*  Los nombres de los paràmetros tienen que coincidir con estan definidos en el proce almacenado
    console.log('Profesional registrado exitosamente'); */
    
    request.input('email', sql.VarChar, email);
    request.input('razonsocial', sql.VarChar, razonsocial);
    request.input('tipocliente', sql.VarChar, tipocliente);
    



    const result = await request.execute('sp_crear_cliente');
    // Recuperación de los valores de los parámetros de salida
    


    // 👇 agarrás el primer resultado
    const data = result.recordset[0];

    res.status(201).json({
      message: 'Paciente registrado exitosamente',
      idcliente: data.idcliente,
      idusuario: data.idusuario
    });

  } catch (error) {
    console.error('Error en la ejecución del procedimiento almacenado:', error);
    return res.status(500).json({
      message: 'Error en el servidor'
    }); // Enviar un mensaje de error al cliente
  }
};

export const getValidarCodigoEmail = async (req, res) => {
  
 const {
    
    email,
    codigo
  } = req.query;

  try {
    const pool = await getConnection();
    const request = pool.request();

    request.input('email', sql.VarChar, email);
    request.input('codigo', sql.Int, codigo);

  

    const result = await request.execute('sp_validar_codigo_email_crear_cuenta');

    res.json(result.recordset[0]); // 👈 IMPORTANTE
     
  } catch (error) {
    console.error('Error en el procedimiento:', error);
    throw error; // 🔥 importante
  }
};