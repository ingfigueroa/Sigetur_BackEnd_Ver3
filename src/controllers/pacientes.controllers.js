import {
  getConnection,
  sql
} from '../database/connection.js';

export const getPacientes = async (req, res) => {
  try {
    const {
      idcliente,
      Apellido,
      VarDni,
      pagina,
      cantidadPorPagina
    } = req.query;
    console.log(idcliente)

    const page = parseInt(pagina) || 1;
    const limit = parseInt(cantidadPorPagina) || 20;
    const offset = (page - 1) * limit;


    const pool = await getConnection();
    const request = pool.request();
    let result;

    if (VarDni > 0) {
       request.input('idcliente', sql.Int, idcliente);
      request.input('DNI', sql.Int, VarDni);
      result = await request.execute('sp_Buscar_Pacientes_Dni');
    } else if (Apellido != null && Apellido != '') {
      request.input('idcliente', sql.Int, idcliente);
      request.input('Apellido', sql.VarChar, Apellido);
      request.input('Offset', sql.Int, offset);
      request.input('Limit', sql.Int, limit);
 
      result = await request.execute('sp_Buscar_Pacientes_Apellido');

    } else {

      let Apellido = '';
        request.input('idcliente', sql.Int, idcliente);
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
  try {

    const {
      idcliente,
      Nombres,
      Apellido,
      TipoDocumento,
      NroDocumento,
      EMail,
      FechaNacimiento,
      TECelular,
      Sexo,
      idusuario
    } = req.body;

    console.log(req.body)
    // VALIDACIONES
    if (!Nombres || !Apellido) {
      return res.status(400).json({
        message: 'Nombres y apellido son obligatorios'
      });
    }

    const pool = await getConnection();
    const request = pool.request();

    request.input('idcliente', sql.Int, idcliente);
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

    const result = await request.execute('sp_crear_paciente');

    return res.status(201).json({
      ok: true,
      message: 'Paciente registrado exitosamente',
      retorno: result.output.RETORNO,
      resultado: result.output.Resultado
    });

  } catch (error) {

    return res.status(500).json({
      ok: false,
      message: 'Error en el servidor'
    });
  }
};


export const updatePacientes = async (req, res) => {

  const {
    
    idpaciente,

    Nombres,
    Apellido,
    TipoDocumento,
    NroDocumento,
    EMail,
    fechaNacimiento,
    TECelular,
    idTipoSexoSelected
  } = req.body || {};

  try {
    const pool = await getConnection();
    const request = pool.request();
    let result;

     request.input('idpaciente', sql.Int, idpaciente);
    request.input('Nombres', sql.VarChar, Nombres);
    request.input('Apellido', sql.VarChar, Apellido);
    request.input('TipoDocumento', sql.Int, TipoDocumento);
    request.input('NroDocumento', sql.Int, NroDocumento);
    request.input('Email', sql.VarChar, EMail);
    request.input('FechaNacimiento', sql.Date, fechaNacimiento);
    request.input('TECelular', sql.VarChar, TECelular);
    request.input('Sexo', sql.Int, idTipoSexoSelected);

    result = await request.execute('sp_modificar_paciente');
    // Recuperación de los valores de los parámetros de salida


    res.status(201).json({
      message: 'Paciente registrado exitosamente'
     
    });

  } catch (error) {
    console.error(error.response?.data || error.message);
    
    return res.status(500).json({
      message: (error.response?.data || error.message)
    }); // Enviar un mensaje de error al cliente
  }
};


export const getPacienteBuscarID = async (req, res) => {
  try {

    const {
      idcliente,
      idpaciente
    } = req.query;

    const pool = await getConnection();
    const request = pool.request();
    let result;



    if (idpaciente > 0) {
      
      request.input('idcliente', sql.Int, idcliente);
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
      idcliente,
      idpaciente
    } = req.query;

    const pool = await getConnection();
    const request = pool.request();
    let result;


if (idpaciente > 0) {

  request.input('idcliente', sql.Int, idcliente);
  request.input('idpaciente', sql.Int, idpaciente);

  result = await request.execute('sp_Buscar_Turnos_Paciente_Ultimos');

}

if (result) {

  // Primer SELECT
  const total = result.recordsets[0];

  // Segundo SELECT
  const turnos = result.recordsets[1];

  return res.json({
    total: total[0]?.total || 0,
    registros: turnos
  });

} else {

  console.error('No se obtuvieron resultados de la consulta.');

}



  } catch (error) {
    console.error('Error en la ejecución del procedimiento almacenado:', error);
    return res.status(500).json({
      message: 'Error en el servidor'
    });
  }
};