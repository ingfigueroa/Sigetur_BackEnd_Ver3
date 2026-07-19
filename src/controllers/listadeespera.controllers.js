import {
  getConnection,
  sql
} from '../database/connection.js';


export const putAsignarTurnoListaDeEspera = async (req, res) => {
  
  const { 
     idlistadeespera,
     idturno,
     idpac,
     idos,
     obs,
     idusuario  } = req.body ;

     

  try {
    const pool = await getConnection();
    const request = pool.request();

   


      request.input("idlistadeespera", sql.Int, idlistadeespera)
      request.input("idturno", sql.Int, idturno)
      request.input("idpaciente", sql.Int, idpac)
      request.input("idos", sql.Int, idos)
      request.input("obs", sql.VarChar, obs)
      request.input("idusuario", sql.Int, idusuario)

    const result = await request.execute("sp_listadeespera_actualizar_idturno");

    res.status(200).json({ message: "Turno asignado correctamente" });
  } catch (error) {
    
    res.status(500).json({ error: error.message });
  }
};


export const postListaDeEspera = async (req, res) => {
  try {
    
    const {
      idcliente,
      idprofesional,
      idpaciente,
      idhoradesde,
      idhorahasta,
      fechadesde,
      fechahasta,
      lunes,
      martes,
      miercoles,
      jueves,
      viernes,
      sabado,
      domingo,
      observaciones,
      idusuario
    } = req.body;
  
       


   
    const pool = await getConnection();
    const request = pool.request();

 

     request.input('idcliente', sql.Int, idcliente);
    request.input('IDProfesional', sql.Int, idprofesional);
    request.input('IDPaciente', sql.Int, idpaciente);
    request.input('IDHoraDesde', sql.Int, idhoradesde);
    request.input('IDHoraHasta', sql.Int, idhorahasta);
    request.input('FechaDesde', sql.Date, fechadesde);
    request.input('FechaHasta', sql.Date, fechahasta);

    request.input('Lunes', sql.Bit, lunes);
    request.input('Martes', sql.Bit, martes);
    request.input('Miercoles', sql.Bit, miercoles);
    request.input('Jueves', sql.Bit, jueves);
    request.input('Viernes', sql.Bit, viernes);
    request.input('Sabado', sql.Bit, sabado);
    request.input('Domingo', sql.Bit, domingo);

    request.input('Observaciones', sql.VarChar, observaciones);
    request.input('idusuario', sql.Int, idusuario);

    const result = await request.execute('sp_crear_lista_de_espera');

    return res.json({
      success: true,
      data: {
        mensaje: "Alta exitosa"
      }
    });


  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'Error en el servidor'
    });
  }
};


export const postBajaFilaListaDeEspera = async (req, res) => {
  try {
    const {
      id
    } = req.body;

    const pool = await getConnection();
    const request = pool.request();

    request.input('id', sql.Int, id);
    

    const result = await request.execute('sp_darDeBaja_filalistadeespera');

    return res.json({
      success: true,
      data: {
        mensaje: "Baja exitosa"
      }
    });


  } catch (error) {
   
    return res.status(500).json({
      message: 'Error en el servidor'
    });
  }
};


export const getListadeEspera = async (req, res) => {
  try {
    const {

      pagina,
      cantidadPorPagina,
      apellidoPaciente,
      apellidoProfesional,
      idcliente
    } = req.query;

    const page = parseInt(pagina) || 1;
    const limit = parseInt(cantidadPorPagina) || 20;
    const offset = (page - 1) * limit;

    const pool = await getConnection();
    const request = pool.request();
    let result;
    

    request.input( 'idcliente', sql.Int, idcliente);
      request.input( 'ApellidoPaciente', sql.VarChar, apellidoPaciente );
    request.input( 'ApellidoProfesional', sql.VarChar, apellidoProfesional);
    request.input( 'Offset', sql.Int, offset);
    request.input( 'Limit', sql.Int, limit);

   
    result = await request.execute('sp_Buscar_ListadeEspera');

    /*  return res.json(result.recordset); */
    return res.json({
      total: result.recordsets[0][0].Total, 
      registros: result.recordsets[1]
    });


  } catch (error) {
   
    return res.status(500).json({
      message: 'Error en el servidor'
    }); // Enviar un mensaje de error al cliente
  }
};