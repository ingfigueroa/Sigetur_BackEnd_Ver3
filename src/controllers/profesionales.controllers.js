import {
  getConnection,
  sql
} from '../database/connection.js';

export const getProfesionales = async (req, res) => {
  try {
    const {
      Apellido,
      VarDni,
      idprofesion,
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

      request.input('Dni', sql.Int, VarDni);
        
      result = await request.execute('sp_Buscar_Profesionales_Dni');
  
    } else if (Apellido != null && Apellido != '') {
      request.input('Apellido', sql.VarChar, Apellido);
      request.input('Offset', sql.Int, offset);
      request.input('Limit', sql.Int, limit);
      result = await request.execute('sp_Buscar_Profesionales_Apellido');
      

    } else if (idprofesion > 0) {

      request.input('idprofesion', sql.Int, idprofesion);
      request.input('Offset', sql.Int, offset);
      request.input('Limit', sql.Int, limit);
      result = await request.execute('sp_Buscar_Profesionales_Profesion');
    } else {

      let Apellido = '';
      request.input('Apellido', sql.VarChar, Apellido);
      request.input('Offset', sql.Int, offset);
      request.input('Limit', sql.Int, limit);
      result = await request.execute('sp_Buscar_Profesionales_Apellido');
    }


   // return res.json(result.recordset);
   return res.json({
      total: result.recordsets[0][0].Total,
      registros: result.recordsets[1]
    });

  } catch (error) {
    console.error('Error en la ejecución del procedimiento almacenado:', error);
    return res.status(500).json({
      message: 'Error en el servidor'
    });
  }
};


export const getProfesionalesHorarios = async (req, res) => {
  try {
    const {
      idprofesional,
      fecha
    } = req.query;

    const pool = await getConnection();
    const request = pool.request();
    let result;


    request.input('idprofesional', sql.Int, idprofesional);
    request.input('fecha', sql.Date, fecha)
    result = await request.execute('sp_buscar_profesional_diashoras_trabaja');



    return res.json(result.recordset);


  } catch (error) {
    console.error('Error en la ejecución del procedimiento almacenado:', error);
    return res.status(500).json({
      message: 'Error en el servidor'
    });
  }
};

export const getProfesionalProfesion = async (req, res) => {
  try {
    const {
      idprofesional
    } = req.query;

    const pool = await getConnection();
    const request = pool.request();
    let result;



    if (idprofesional > 0) {

      request.input('idprofesional', sql.Int, idprofesional);
      result = await request.execute('sp_Buscar_ProfesionalYProfesion_ID');

    }

    if (result && result.recordset) {
      // Procesar los resultados
      return res.json(result.recordset);
    } else {
      console.error('No se obtuvieron resultados de la consulta.');
    }


    return res.json(result.recordset);
  } catch (error) {
    console.error('Error en la ejecución del procedimiento almacenado:', error);
    return res.status(500).json({
      message: 'Error en el servidor'
    });
  }
};


export const createProfesionales = async (req, res) => {

  const {
    idProfesional,
    Nombres,
    Apellido,
    TipoDocumento,
    NroDocumento,
    EMail,
    FechaNacimiento,
    TECelular,
    Sexo,
    CuitCuil,
    matriculanro,
    idtipoprofesion,
    idusuario,
    nuevo
  } = req.body || {};

  try {
    const pool = await getConnection();
    const request = pool.request();
    let result;



    /*  Los nombres de los paràmetros tienen que coincidir con estan definidos en el proce almacenado
    console.log('Profesional registrado exitosamente'); */

    request.input('idprofesional', sql.Int, idProfesional);
    request.input('Nombres', sql.VarChar, Nombres);
    request.input('Apellido', sql.VarChar, Apellido);
    request.input('TipoDocumento', sql.Int, TipoDocumento);
    request.input('NroDocumento', sql.Int, NroDocumento);
    request.input('EMail', sql.VarChar, EMail);
    request.input('FechaNacimiento', sql.Date, FechaNacimiento);
    request.input('TECelular', sql.VarChar, TECelular);
    request.input('Sexo', sql.Int, Sexo);
    request.input('CuilCuit', sql.BigInt, CuitCuil);
    request.input('matprof', sql.VarChar, matriculanro);
    request.input('IDTipoProfesion', sql.Int, idtipoprofesion);
    request.input('idusuario', sql.Int, idusuario);
    request.input('Nuevo', sql.Int, nuevo);
    request.output('Resultado', sql.Int)


    result = await request.execute('sp_crear_profesional');


    res.status(201).json({
      message: 'Profesional registrado exitosamente'

    });
  } catch (error) {
    console.error('Error en la ejecución del procedimiento almacenado:', error);
    res.status(500).json({
      message: 'Error en el servidor'
    });
  }
};

export const getProfesionalBuscarID = async (req, res) => {
  try {
    const {
      idprofesional
    } = req.query;

    const pool = await getConnection();
    const request = pool.request();
    let result;



    if (idprofesional > 0) {

      request.input('idprofesional', sql.Int, idprofesional);
      result = await request.execute('sp_Buscar_Profesionales_ID');

    }

    if (result && result.recordset) {
      // Procesar los resultados
      return res.json(result.recordset);
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