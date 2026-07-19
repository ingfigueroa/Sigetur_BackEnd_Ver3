import {
  getConnection,
  sql
} from '../database/connection.js';

import bcrypt from 'bcrypt';

import { generarTokenHash, verificarToken } from '../utils/correo.js';
import { tokenResetPassword} from '../controllers/correo.controllers.js'



export const getProfesionales = async (req, res) => {
  try {
    const {
      idcliente,
      Apellido,
      VarDni,
      idprofesion,
      pagina,
      cantidadPorPagina
    } = req.query;


  
    const page = parseInt(pagina) || 1;
    const limit = parseInt(cantidadPorPagina) || 20;
    let offset;

    if (page > 1){
         offset = (page - 1) * limit;
    }else{
       offset = page;
    }
    
  
    const pool = await getConnection();
    const request = pool.request();
    let result;
  
    if (VarDni > 0) {

      request.input('Dni', sql.Int, VarDni);
        
      result = await request.execute('sp_Buscar_Profesional_Dni');
  
    } else if (Apellido != null && Apellido != '') {
      request.input('idcliente', sql.Int, idcliente);
      request.input('Apellido', sql.VarChar, Apellido);
      request.input('Offset', sql.Int, offset);
      request.input('Limit', sql.Int, limit);
      result = await request.execute('sp_Buscar_Profesionales_Apellido');
      

    } else if (idprofesion > 0) {
       request.input('idcliente', sql.Int, idcliente);
      request.input('idprofesion', sql.Int, idprofesion);
      request.input('Offset', sql.Int, offset);
      request.input('Limit', sql.Int, limit);
      result = await request.execute('sp_Buscar_Profesionales_Profesion');
    } else {
    
   
      //let ApellidoVacio = '';
       request.input('idcliente', sql.Int, idcliente);
      request.input('Apellido', sql.VarChar, Apellido);
      request.input('Offset', sql.Int, offset);
      request.input('Limit', sql.Int, limit);
      result = await request.execute('sp_Buscar_Profesionales_Apellido');
    }


 
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
  const { token, hash } = generarTokenHash();

  
  const {
    idcliente,
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
    request.input('idcliente', sql.Int, idcliente);
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
    request.input('passwordtransitoria', sql.VarChar, hash )
    request.input('Nuevo', sql.Int, nuevo);
    request.output('Resultado', sql.Int)

    

    result = await request.execute('sp_crear_profesional');

    // 👇 agarrás el primer resultado
    const data = result.recordset;
   
   

      res.status(201).json({
      message: 'Profesional registrado exitosamente',
     
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
      idcliente,
      idprofesional
    } = req.query;

    const pool = await getConnection();
    const request = pool.request();
    let result;



    if (idprofesional > 0) {
      request.input('idcliente', sql.Int, idcliente);
      request.input('idprofesional', sql.Int, idprofesional);
      result = await request.execute('sp_Buscar_Profesional_ID');

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
export const getIDProfesionalBuscarxEmail = async (req, res) => {
  try {
    const {
      email,
      idcliente
    } = req.query;

 

    const pool = await getConnection();
    const request = pool.request();
    let result;



    if (idcliente > 0) {
       request.input('email', sql.VarChar, email);
      request.input('idcliente', sql.Int, idcliente);
      result = await request.execute('sp_Buscar_idprofesional_idcliente_email');

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


export const getProfesionalFechaCambioHorario = async (req, res) => {
  try {
    const {
      idprofesional
    } = req.query;

    const pool = await getConnection();
    const request = pool.request();
    let result;



    if (idprofesional > 0) {
      
      request.input('idprofesional', sql.Int, idprofesional);
      result = await request.execute('sp_Buscar_Profesional_Fecha_Cambios_Horarios');

    }
    


    if (result && result.recordset) {

      // Procesar los resultados
      return res.json(result.recordset);
    }



  } catch (error) {
    console.error('Error en la ejecución del procedimiento almacenado:', error);
    return res.status(500).json({
      message: 'Error en el servidor'
    });
  }
};


export const putProfesionalPasaraPasivo = async (req, res) => {
  try {
    
    const {
      idprofesional,
      observaciones,
      idusuario
    } = req.body || {}; 





    const pool = await getConnection();
    const request = pool.request();
    let result;

    request.input('idprofesional', sql.Int, idprofesional);
   
    request.input('observaciones', sql.VarChar, observaciones);
    request.input('idusuario', sql.Int, idusuario);
   


    result = await request.execute('sp_profesional_transitar_pasivo');



    return res.status(201).json({
      message: 'Profesional dado de baja éxitosamente',

    });
  } catch (error) {

    return res.status(500).json({
      message: 'Error en el servidor'
    }, error);
  }
};


export const putProfesionalCambioHorarioMultiple = async (req, res) => {
  try {
    const pool = await getConnection();

    // req.body es un array de objetos (payload que envía el frontend)
    const horarios = req.body;

    if (!horarios || horarios.length === 0) {
      return res.status(400).json({ message: "No se recibieron horarios." });
    }

    // Tomo los valores comunes del primer elemento
    const idprofesional = horarios[0].idprofesional;
    const fecha = horarios[0].fechadesde;       // viene como fechadesde
    const idusuario = 1;        // O el que uses en tu sesión

    // Armamos la tabla que coincida con el tipo Tabla_Horarios en SQL
    const tabla = new sql.Table("Tabla_Horarios");
    tabla.columns.add("IDDia", sql.Int);
    tabla.columns.add("MT", sql.Bit);
    tabla.columns.add("MD", sql.Int);
    tabla.columns.add("MH", sql.Int);
    tabla.columns.add("MI", sql.Int);
    tabla.columns.add("TT", sql.Bit);
    tabla.columns.add("TD", sql.Int);
    tabla.columns.add("TH", sql.Int);
    tabla.columns.add("TI", sql.Int);
    tabla.columns.add("NT", sql.Bit);
    tabla.columns.add("ND", sql.Int);
    tabla.columns.add("NH", sql.Int);
    tabla.columns.add("NI", sql.Int);

    // Cargamos las filas
    for (const h of horarios) {
      tabla.rows.add(
        h.iddia,
        h.mananatrabaja,
        h.idmananadesde,
        h.idmananahasta,
        h.idmananaintervalo,
        h.tardetrabaja,
        h.idtardedesde,
        h.idtardehasta,
        h.idtardeintervalo,
        h.nochetrabaja,
        h.idnochedesde, 
        h.idnochehasta,
        h.idnocheintervalo
      );
    }

    // Ejecutamos el procedimiento
    const request = pool.request();
    request.input("idprofesional", sql.Int, idprofesional);
    request.input("fecha", sql.Date, fecha);
    request.input("Tabla_Nuevos_Horarios", tabla);
    request.input("idusuario", sql.Int, idusuario);

    await request.execute("sp_profesional_nuevo_horario");

    return res.status(201).json({ message: "Horarios cargados con éxito." });
  } catch (error) {
    console.error("Error en putProfesionalCambioHorarioMultiple:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

