import {
  getConnection,
  sql
} from '../database/connection.js';

export const getPacientes = async (req, res) => {
  try {
    const {
      Apellido,
      VarDni,
      pagina,
      cantidadPorPagina
    } = req.query;

    const page = parseInt(pagina) || 1;
    const limit = parseInt(cantidadPorPagina) || 20;
    const offset = (page - 1) * limit;


    const pool = await getConnection();
    const request = pool.request();
    let result;

    if (VarDni > 0) {

      request.input('DNI', sql.Int, VarDni);
      result = await request.execute('sp_Buscar_Pacientes_Dni');
    } else if (Apellido != null && Apellido != '') {

      request.input('Apellido', sql.VarChar, Apellido);
      request.input('Offset', sql.Int, offset);
      request.input('Limit', sql.Int, limit);
 
      result = await request.execute('sp_Buscar_Pacientes_Apellido');
    } else {

      let Apellido = '';
      request.input('Apellido', sql.VarChar, Apellido);
      request.input('Offset', sql.Int, offset);
      request.input('Limit', sql.Int, limit);
      result = await request.execute('sp_Buscar_Pacientes_Apellido');
    }


   /*  return res.json(result.recordset); */
     return res.json({
      total: result.recordsets[0][0].Total,
      registros: result.recordsets[1]
    });

  } catch (error) {
    console.error('Error en la ejecución del procedimiento almacenado:', error);
    return res.status(500).json({
      message: 'Error en el servidor'
    }); // Enviar un mensaje de error al cliente
  }
};
 

export const createPacientes = async (req, res) => {

  const {
    
    Nombres,
    Apellido,
    TipoDocumento,
    NroDocumento,
    EMail,
    FechaNacimiento,
    TECelular,
    Sexo,
    idusuario
  } = req.body || {};

  try {
    const pool = await getConnection();
    const request = pool.request();
    let result;



    /*  Los nombres de los paràmetros tienen que coincidir con estan definidos en el proce almacenado
    console.log('Profesional registrado exitosamente'); */
    
    request.input('Nombres', sql.VarChar, Nombres);
    request.input('Apellido', sql.VarChar, Apellido);
    request.input('TipoDocumento', sql.Int, TipoDocumento);
    request.input('NroDocumento', sql.Int, NroDocumento);
    request.input('EMail', sql.VarChar, EMail);
    request.input('FechaNacimiento', sql.Date, FechaNacimiento);
    request.input('TECelular', sql.VarChar, TECelular);
    request.input('Sexo', sql.Int, Sexo);
    request.input('idusuario', sql.Int, idusuario);
  


    request.output('RETORNO', sql.Int);
    request.output('Resultado', sql.Int);

    result = await request.execute('sp_crear_paciente');
    // Recuperación de los valores de los parámetros de salida
    const retorno = result.output.RETORNO;
    const resultado = result.output.Resultado;

    res.status(201).json({
      message: 'Paciente registrado exitosamente',
      retorno,
      resultado
    });

  } catch (error) {
    console.error('Error en la ejecución del procedimiento almacenado:', error);
    return res.status(500).json({
      message: 'Error en el servidor'
    }); // Enviar un mensaje de error al cliente
  }
};

export const getPacienteBuscarID = async (req, res) => {
  try {

    const {
      idpaciente
    } = req.query;

    const pool = await getConnection();
    const request = pool.request();
    let result;



    if (idpaciente > 0) {

      request.input('idpaciente', sql.Int, idpaciente);
      result = await request.execute('sp_Buscar_Pacientes_ID');

    }

    if (result && result.recordset) {
      // Procesar los resultados
      return res.json(result.recordset);
    } else {
      console.error('No se obtuvieron resultados de la consulta. Buscar por ID');
    }



  } catch (error) {
    console.error('Error en la ejecución del procedimiento almacenado:', error);
    return res.status(500).json({
      message: 'Error en el servidor'
    });
  }
};


export const getPacienteTurnosUltimos = async (req, res) => {
  try {

    const {
      idpaciente
    } = req.query;

    const pool = await getConnection();
    const request = pool.request();
    let result;



    if (idpaciente > 0) {

      request.input('idpaciente', sql.Int, idpaciente);
      result = await request.execute('sp_Buscar_Turnos_Paciente_Ultimos');

    }

    if (result && result.recordset) {
      // Procesar los resultados
      return res.json(result.recordset);
    } else {
      console.error('No se obtuvieron resultados de la consulta. Ultimos Turnos');
    }



  } catch (error) {
    console.error('Error en la ejecución del procedimiento almacenado:', error);
    return res.status(500).json({
      message: 'Error en el servidor'
    });
  }
};