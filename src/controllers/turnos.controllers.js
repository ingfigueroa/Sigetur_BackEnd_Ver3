import {
  getConnection,
  sql
} from '../database/connection.js';



export const getTurnosCrear = async (req, res) => {
  try {
    const {
      idusuario,
      fecha,
      idprofesional,
      idcliente
    } = req.query;

    const pool = await getConnection();
    const request = pool.request();
    let result;

   

    request.input('IDUsuario', sql.Int, idusuario);
    request.input('idprofesional', sql.Int, idprofesional);
    request.input('fecha', sql.Date, fecha);
    request.input('idcliente', sql.Int, idcliente);



    result = await request.execute('sp_crear_turnos');



    return res.json(result.recordset);


  } catch (error) {
    console.error('Error en la ejecución del procedimiento almacenado:', error);
    return res.status(500).json({
      message: 'Error en el servidor'
    });
  }
};

export const postSobreturnosCrear = async (req, res) => {
  try {


    const {
      idcliente,
      idprofesional,
      idpaciente,
      idobrasocial,
      fecha,
      observaciones,
      idusuario
    } = req.body;
    const fechaSolo = fecha.split('T')[0]; // "2025-08-08"


    const pool = await getConnection();
    const request = pool.request();
    let result;






     request.input('idcliente', sql.Int, idcliente);
    request.input('idprofesional', sql.Int, idprofesional);
    request.input('idpaciente', sql.Int, idpaciente);
    request.input('idobrasocial', sql.Int, idobrasocial);
    request.input('fecha', sql.Date, fechaSolo);
    request.input('observaciones', sql.VarChar, observaciones);
    request.input('idusuario', sql.Int, idusuario);


    result = await request.execute('sp_crear_sobreturno');
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
      idprofesional,
      fecha,
      idcliente
    } = req.query;

    const pool = await getConnection();
    const request = pool.request();
    let result;


     request.input('idcliente', sql.Int, idcliente);
    request.input('IDProf', sql.Int, idprofesional);
    request.input('Fecha', sql.Date, fecha);

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


export const getTurnoLibreID = async (req, res) => {
  try {

    const {
      idturno
    } = req.query;

    const pool = await getConnection();
    const request = pool.request();
    let result;



    request.input('idturno', sql.Int, idturno);


    result = await request.execute('sp_Buscar_Turno_Libre_ID');


    //return res.json(result.recordset);
    return res.json(result.recordset[0] || null);


  } catch (error) {
    
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
      message: 'Error en el servidor'
    });
  }
};

export const getAgendaSemanalProfesionalFecha = async (req, res) => {
  try {

    const {
      idcliente,
      idprof,
      fecha,
      idusuario
    } = req.query;


    const pool = await getConnection();
    const request = pool.request();
    let result;

     request.input('idcliente', sql.Int, idcliente);
    request.input('idprofesional', sql.Int, idprof);
    request.input('fechaInicio', sql.Date, fecha);
    request.input('idusuario', sql.Int, idusuario)

    result = await request.execute('sp_agenda_semanal_turnos_x_horario_x_profesional');


    return res.json(result.recordset);


  } catch (error) {
    console.error('Error en la ejecución del procedimiento almacenado:', error);
    return res.status(500).json({
      message: 'Error en el servidor'
    });
  }
};

export const getTurnosBuscarProfesionalDiaCancelado = async (req, res) => {
  try {
    const {
      idcliente,
      idprofesional,
      fecha
    } = req.query;



    const pool = await getConnection();
    const request = pool.request();
    let result;



    request.input('idcliente', sql.Int, idcliente);
    request.input('idprofesional', sql.Int, idprofesional);
    request.input('fecha', sql.Date, fecha);



    result = await request.execute('sp_Buscar_turnos_profesional_dia_cancelado'); 



    return res.json(result.recordset);


  } catch (error) {
    console.error('Error en la ejecución del procedimiento almacenado:', error);
    return res.status(500).json({
      message: 'Error en el servidor'
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
    
      idturno,
      idpaciente,
      idos,
      Obs,
      idusuario
    } = req.body || {};





    const pool = await getConnection();
    const request = pool.request();
    let result;

  
    request.input('idturno', sql.Int, idturno);
    request.input('idpaciente', sql.Int, idpaciente);
    request.input('idobrasocial', sql.Int, idos);
    request.input('Obs', sql.VarChar, Obs);
    request.input('idusuario', sql.Int, idusuario);
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
      idcliente,
      idprofesional,
      observaciones,
      fecha,
      idusuario
    } = req.body || {};


    const pool = await getConnection();
    const request = pool.request();
    let result;



    request.input('idcliente', sql.Int, idcliente);
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
    
      idturno,
      idestado,
      observaciones,
      idusuario,
      vieneDE
    } = req.body || {};

    const idestadoparseado = parseInt(idestado, 10)
    const pool = await getConnection();
    const request = pool.request();
    let result;

 

    //pasar PRESENTE NO COBRADO
    if (idestadoparseado === 7) {

  
      if (vieneDE === "PNC") {//PRESENTE NO COBRADO

       
      
        request.input('idturno', sql.Int, idturno);
        request.input('estado', sql.Int, idestado);
        request.input('observaciones', sql.VarChar, observaciones);
        request.input('idusuario', sql.Int, idusuario);
        result = await request.execute('sp_turno_transitar_presente');

      } else if (vieneDE === "ANULAR") {
       

       
        request.input('idturno', sql.Int, idturno);
        request.input('observaciones', sql.VarChar, observaciones);
        request.input('idusuario', sql.Int, idusuario);

        result = await request.execute('sp_turno_transitar_anulado');
      }
     
    }

    res.status(200).json({
      message: 'Estado cambiado correctamente'
    });

  } catch (error) {
     console.log("ERROR: " + error)
     
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


export const getTurnosLibresProfesional_Falta_Mes = async (req, res) => {
  try {
    const {
      idcliente,
      idprofesional,
      fechadesde,
      fechahasta


    } = req.query;

   /*  const page = parseInt(pagina) || 1;
    const limit = parseInt(cantidadPorPagina) || 20;
    const offset = (page - 1) * limit; */

    // Validación rápida
    if (!fechadesde || !fechahasta) {

      return res.status(400).json({
        message: 'Fechas requeridas'
      });
    }

 

    const pool = await getConnection();
    const request = pool.request();

    request.input('idcliente', sql.Int, idcliente);
    request.input('idprofesional', sql.Int, idprofesional);
    request.input('fechainicio', sql.Date, fechadesde);
    request.input('fechafinal', sql.Date, fechahasta);
/* 
    request.input('Offset', sql.Int, offset);
    request.input('Limit', sql.Int, limit); */



    const result = await request.execute('sp_Buscar_Turnos_libres_Profesional_Mes_Activo');

    /* return res.json(result.recordset); */
    return res.json({
      fechasagrupadas: result.recordsets[0].map(r => r.fecha), // lista de fechas
      total: result.recordsets[1][0].Total, // el COUNT(*)
      registros: result.recordsets[2] // los turnos
    });

 
  } catch (error) {
    console.error('Error en la ejecución del procedimiento almacenado:', error);
    return res.status(500).json({
      message: 'Error en el servidor',
      error: error.message
    });
  }
};

import nodemailer from "nodemailer";
// controllers/correoController.js
export const postEnviarTurnosManual = async (req, res) => {
  const {
    turnos
  } = req.body;
  const emailprofesional = turnos[0].email


  try {
    const contenidoHTML = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Turnos del Profesional: ${turnos[0].apenomprof} - ${turnos[0].servicio}</h2>
        <p>Fecha: <strong>${new Date(turnos[0].fecha).toLocaleDateString('es-AR')}</strong></p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <thead>
            <tr style="background-color: #007bff; color: white;">
             <th style="border: 1px solid #ccc; padding: 8px;">Estado</th>
              <th style="border: 1px solid #ccc; padding: 8px;">Hora</th>
              <th style="border: 1px solid #ccc; padding: 8px;">Paciente</th>
              <th style="border: 1px solid #ccc; padding: 8px;">DNI</th>
              <th style="border: 1px solid #ccc; padding: 8px;">Obra Social</th>
             
             
          
            </tr>
          </thead>
          <tbody>
            ${turnos
              .map(
                (t) => `
              <tr>
                <td style="border: 1px solid #ccc; padding: 8px;">${t.estado}</td>
                <td style="border: 1px solid #ccc; padding: 8px;">${t.hora}</td>
                <td style="border: 1px solid #ccc; padding: 8px;">${t.apenompaciente}</td>
                <td style="border: 1px solid #ccc; padding: 8px;">${t.nroDoc}</td>
                <td style="border: 1px solid #ccc; padding: 8px;">${t.os}</td>
               
              
              
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
        <p style="margin-top: 30px;">Este correo fue generado automáticamente. Por favor no responder.</p>
      </div>
    `;
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'sigetur@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD // Usá una App Password
      }
    });

    await transporter.sendMail({
      from: 'sigetur@gmail.com',
      to: emailprofesional, // <-- ACÁ está el mail de destino
      subject: `TURNOS DEL ${new Date(turnos[0].fecha).toLocaleDateString('es-AR')}`,
      html: contenidoHTML,
    });

    res.status(200).json({
      mensaje: "Correo enviado correctamente."
    });
  } catch (error) {
    console.error("Error al enviar correo:", error);
    res.status(500).json({
      mensaje: "Error al enviar correo."
    });
  }
};


export const postTurnoCobrar = async (req, res) => {
  try {


    const {

    idturno, 
	  idusuario,
	  observaciones,
	  idformapago,
	  idtarjeta,
	  nrotarjeta,
	  fechavto,
    titular,
    montoTotalaCobrar,
    vienede,
	
    } = req.body;
    

  

    const pool = await getConnection();
    const request = pool.request();
    let result;
 

     request.input('idturno', sql.Int, idturno);
    
    request.input('idusuario', sql.Int, idusuario);


    request.input('observaciones', sql.VarChar, observaciones);
     request.input('idformapago', sql.Int, idformapago);
    request.input('idtarjeta', sql.Int, idtarjeta);
    request.input('nrotarjeta', sql.Int, nrotarjeta);

    request.input('fechavto', sql.Int, fechavto);
    request.input('titular', sql.VarChar, titular);
    request.input('montocobrado', sql.Numeric(10,2), montoTotalaCobrar);
    request.input('vienede', sql.VarChar, vienede);
    


    result = await request.execute('sp_Cobrar_Turno'); 
     return res.json(result.returnValue);


  } catch (error) {
    console.error('Error en la ejecución del procedimiento almacenado:', error);
    return res.status(500).json({
      message: 'Error en el servidor'
    });
  }
};

export const postTurnoRegistrarPrestaciones = async (req, res) => {
  try {


    const {

        idturno, 
      
        idusuario,
        montoTotalaCobrar,
        tabla_prestaciones
    } = req.body;

    

    const pool = await getConnection();
    const request = pool.request();
    let result;


  const tablaPrestaciones = new sql.Table("Tabla_Prestaciones");


// Deben estar en el MISMO ORDEN que el TYPE
tablaPrestaciones.columns.add("idprestacion", sql.Int);
tablaPrestaciones.columns.add("idcapitulo", sql.Int);
tablaPrestaciones.columns.add("nombreprestacion", sql.NVarChar(200));
tablaPrestaciones.columns.add("cantidad", sql.Int);
tablaPrestaciones.columns.add("preciounitario", sql.Decimal(18,2));
tablaPrestaciones.columns.add("observaciones", sql.NVarChar(500));
tablaPrestaciones.columns.add("coseguro", sql.Int);
tablaPrestaciones.columns.add("cobraraobrasocial", sql.Decimal(18,2));
tablaPrestaciones.columns.add("cobrarapaciente", sql.Decimal(18,2));




tabla_prestaciones.forEach((p) => {

    tablaPrestaciones.rows.add(
        p.idprestacion,
        p.idcapitulo,
        p.nombreprestacion,
      
        parseInt(p.cantidad),

        p.preciounitario,
       

        p.observaciones,
        p.coseguro,
        p.cobraraobrasocial,
        p.cobrarapaciente,
        
    );

});


     request.input('idturno', sql.Int, idturno);
    request.input('idusuario', sql.Int, idusuario);


    request.input('totalacobrar', sql.Numeric(10,2), montoTotalaCobrar);

    request.input("tabla_prestaciones",tablaPrestaciones);


    result = await request.execute('sp_Registrar_Prestaciones_por_turno'); 
  
    return res.json(result.returnValue);



  } catch (error) {
    console.error('Error en la ejecución del procedimiento almacenado:', error);
    return res.status(500).json({
      message: 'Error en el servidor'
    });
  }
};

export const getPrestacionesporTurno = async (req, res) => {
  try {
    const {
      idturno
    } = req.query;

   

    // Validación rápida


    const pool = await getConnection();
    const request = pool.request();

    request.input('idturno', sql.Int, idturno);
   



    const result = await request.execute('sp_Buscar_prestaciones_x_turno');

   
    /* return res.json(result.recordset); */
    return res.json(result.recordset[0] || null);

  } catch (error) {
    
    return res.status(500).json({
      message: 'Error en el servidor',
      error: error.message
    });
  }
};

export const getTurnoIDDetalle = async (req, res) => {
  try {

    const {
      idturno
    } = req.query;

    const pool = await getConnection();
    const request = pool.request();
    let result;



    request.input('idturno', sql.Int, idturno);


    result = await request.execute('sp_Buscar_Turno_id_para_detalle');


    //return res.json(result.recordset);
    const turno = result.recordsets[0][0] || null;
    const prestaciones = result.recordsets[1] || [];
  
    return res.json({
        turno,
        prestaciones
    });


  } catch (error) {
    console.error('Error en la ejecución del procedimiento almacenado:', error);
    return res.status(500).json({
      messaSge: 'Error en el servidor'
    });
  }
};