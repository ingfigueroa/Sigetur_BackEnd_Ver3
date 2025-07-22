import {
  getConnection,
  sql
} from '../database/connection.js';


export const getTurnosCrear = async (req, res) => {
  try {
    const {
      idusuario,
      fecha,
      idprof
    } = req.query;

    const pool = await getConnection();
    const request = pool.request();
    let result;



    request.input('IDUsuario', sql.Int, idusuario);
    request.input('IDProf', sql.Int, idprof);
    request.input('Fecha', sql.Date, fecha);



    result = await request.execute('sp_crear_turnos');



    return res.json(result.recordset);


  } catch (error) {
    console.error('Error en la ejecución del procedimiento almacenado:', error);
    return res.status(500).json({
      message: 'Error en el servidor'
    });
  }
};


export const getTurnosProfesionalFecha = async (req, res) => {
  try {

    const {
      IDProf,
      Fecha
    } = req.query;

    const pool = await getConnection();
    const request = pool.request();
    let result;



    request.input('IDProf', sql.VarChar, IDProf);
    request.input('Fecha', sql.Date, Fecha);

    result = await request.execute('sp_Buscar_Turno_Profesional_Fecha');



    return res.json(result.recordset);


  } catch (error) {
    console.error('Error en la ejecución del procedimiento almacenado:', error);
    return res.status(500).json({
      messaSge: 'Error en el servidor'
    });
  }
};


export const getTurnoID = async (req, res) => {
  try {

    const {
      idturno
    } = req.query;

    const pool = await getConnection();
    const request = pool.request();
    let result;



    request.input('idturno', sql.Int, idturno);


    result = await request.execute('sp_Buscar_Turno_ID');



    //return res.json(result.recordset);
    return res.json(result.recordset[0] || null);


  } catch (error) {
    console.error('Error en la ejecución del procedimiento almacenado:', error);
    return res.status(500).json({
      messaSge: 'Error en el servidor'
    });
  }
};



export const getAgendaSemanalProfesionalFechaAgrupado = async (req, res) => {
  try {

    const {
      idprof,
      fecha
    } = req.query;


    const pool = await getConnection();
    const request = pool.request();
    let result;

    request.input('idprofesional', sql.Int, idprof);
    request.input('fechaInicio', sql.Date, fecha);


    result = await request.execute('sp_agenda_semanal_proxima_semana');

    return res.json(result.recordset);


  } catch (error) {

    return res.status(500).json({
      messaSge: 'Error en el servidor'
    });
  }
};

export const getAgendaSemanalProfesionalFecha = async (req, res) => {
  try {

    const {
      idprof,
      fecha
    } = req.query;


    const pool = await getConnection();
    const request = pool.request();
    let result;

    request.input('idprofesional', sql.Int, idprof);
    request.input('fechaInicio', sql.Date, fecha);


    result = await request.execute('sp_agenda_semanal_turnos_x_horario_x_profesional');

    return res.json(result.recordset);


  } catch (error) {
    console.error('Error en la ejecución del procedimiento almacenado:', error);
    return res.status(500).json({
      messaSge: 'Error en el servidor'
    });
  }
};

export const getTurnosBuscarProfesionalDiaCancelado = async (req, res) => {
  try {
    const {
      idprof,
      fecha
    } = req.query;

    const pool = await getConnection();
    const request = pool.request();
    let result;




    request.input('idprofesional', sql.VarChar, idprof);
    request.input('fecha', sql.Date, fecha);



    result = await request.execute('sp_Buscar_turnos_profesional_dia_cancelado');



    return res.json(result.recordset);


  } catch (error) {
    console.error('Error en la ejecución del procedimiento almacenado:', error);
    return res.status(500).json({
      messaSge: 'Error en el servidor'
    });
  }
};




export const getEstadosPorTurno = async (req, res) => {
  try {
    const {
      idturno
    } = req.query;

    const pool = await getConnection();
    const request = pool.request();
    let result;



    request.input('idturno', sql.Int, idturno);


    result = await request.execute('sp_buscar_turno_observaciones');



    return res.json(result.recordset);


  } catch (error) {
    console.error('Error en la ejecución del procedimiento almacenado:', error);
    return res.status(500).json({
      messaSge: 'Error en el servidor'
    });
  }
};


export const putTurnosPasaraPendiente = async (req, res) => {
  try {
    const {
      IDTurno,
      IDPac,
      IDOS,
      Obs,
      IDUsuario
    } = req.body || {};





    const pool = await getConnection();
    const request = pool.request();
    let result;

    request.input('IDTurno', sql.Int, IDTurno);
    request.input('IDPac', sql.Int, IDPac);
    request.input('IDOS', sql.Int, IDOS);
    request.input('Obs', sql.VarChar, Obs);
    request.input('IDUsuario', sql.Int, IDUsuario);
    request.output('Resultado', sql.Int);


    result = await request.execute('sp_turno_transitar_pendiente');



    return res.status(201).json({
      message: 'Profesional registrado exitosamente',

    });
  } catch (error) {

    return res.status(500).json({
      message: 'Error en el servidor'
    }, error);
  }
};


export const putTurnosAnularPorPedidoProfesional = async (req, res) => {
  try {
    const {
      idprofesional,
      observaciones,
      fecha,
      idusuario
    } = req.body || {};


    const pool = await getConnection();
    const request = pool.request();
    let result;



    request.input('idprofesional', sql.Int, idprofesional);
    request.input('observaciones', sql.VarChar, observaciones);
    request.input('fecha', sql.Date, fecha);
    request.input('idusuario', sql.Int, idusuario);
    request.output('salida', sql.VarChar);







    result = await request.execute('sp_turno_anular_todos_por_dia');
    const salida = result.output.salida;

    return res.status(201).json({

      message: 'Turnos anulados exitosamente',

    });
  } catch (error) {

    return res.status(500).json({
      message: 'Error en el servidor'
    }, error);
  }
};




export const putTurnosCambiarEstados = async (req, res) => {
  try {
    const {
      IDTurno,
      idestado,
      Observaciones,
      IDUsuario,
      vieneDE
    } = req.body || {};


    const pool = await getConnection();
    const request = pool.request();
    let result;
    //pasar PRESENTE NO COBRADO
    if (idestado == "7") {


      if (vieneDE == "PNC") {
        request.input('IDTurno', sql.Int, IDTurno);
        request.input('estado', sql.Int, idestado);
        request.input('Observaciones', sql.VarChar, Observaciones);
        request.input('IDUsuario', sql.Int, IDUsuario);
        result = await request.execute('sp_turno_transitar_presente');
      } else if (vieneDE == "ANULAR") {

        request.input('IDTurno', sql.Int, IDTurno);
        request.input('Observaciones', sql.VarChar, Observaciones);
        request.input('IDUsuario', sql.Int, IDUsuario);

        result = await request.execute('sp_turno_transitar_anulado');
      }
    }

    res.status(200).json({
      message: 'Estado cambiado correctamente'
    });

  } catch (error) {
    // Aquí ocurrió un error, asegúrate de usar res.status antes de enviar un objeto JSON
    res.status(500).json({
      message: 'Error en el servidor'
    });
  }
}

export const getTurnosConsultasPorFecha = async (req, res) => {
  try {
    const {
      fechadesde,
      fechahasta,
      idprofesion,
      idestado,
      pagina,
      cantidadPorPagina
    } = req.query;

    const page = parseInt(pagina) || 1;
    const limit = parseInt(cantidadPorPagina) || 20;
    const offset = (page - 1) * limit;

    // Validación rápida
    if (!fechadesde || !fechahasta) {
      console.log('Fechas no válidas:', fechadesde, fechahasta);
      return res.status(400).json({
        message: 'Fechas requeridas'
      });
    }



    const pool = await getConnection();
    const request = pool.request();

    request.input('fechadesde', sql.Date, fechadesde);
    request.input('fechahasta', sql.Date, fechahasta);
    request.input('idprofesion', sql.Int, idprofesion);
    request.input('idestado', sql.Int, idestado);
    request.input('Offset', sql.Int, offset);
    request.input('Limit', sql.Int, limit);



    const result = await request.execute('sp_Consulta_Turnos_Por_Fecha');

    /* return res.json(result.recordset); */
    return res.json({
      total: result.recordsets[0][0].Total,
      registros: result.recordsets[1]
    });

  } catch (error) {
    console.error('Error en la ejecución del procedimiento almacenado:', error);
    return res.status(500).json({
      message: 'Error en el servidor',
      error: error.message
    });
  }
};
