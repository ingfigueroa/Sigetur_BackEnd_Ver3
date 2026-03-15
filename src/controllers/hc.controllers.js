import {
  getConnection,
  sql
} from '../database/connection.js';



export const createHC = async (req, res) => {

  const {
    idpaciente,
    idprofesional,
    idusuario
  } = req.body || {};

  try {
    const pool = await getConnection();
    const request = pool.request();
    let result;



    /*  Los nombres de los paràmetros tienen que coincidir con estan definidos en el proce almacenado
    console.log('Profesional registrado exitosamente'); */

    request.input('idpaciente', sql.Int, idpaciente);
    request.input('idprofesional', sql.Int, idprofesional);
    request.input('idusuario', sql.Int, idusuario);
   


    result = await request.execute('sp_crear_historia_clinica');


    res.status(201).json({
      message: 'Historia clínica registrada exitosamente'

    });
  } catch (error) {
    console.error('Error en la ejecución del procedimiento almacenado:', error);
    res.status(500).json({
      message: 'Error en el servidor'
    });
  }
};


export const createHCAnamnesisMedica = async (req, res) => {

 const data = req.body;

  try {

  
    const pool = await getConnection();
    const request = pool.request();

    
    // recorrer todos los campos enviados
    Object.entries(data).forEach(([key, value]) => {
      request.input(key, value ?? null);
    });

 
    await request.execute('sp_crear_hc_anamnesis_medica');
    // Recuperación de los valores de los parámetros de salida
   
    res.status(201).json({
      message: 'Anamnesis Médica registrada exitosamente'
      /* retorno,
      resultado */
    }); 

  } catch (error) {
    console.error('Error en la ejecución del procedimiento almacenado:', error);
    return res.status(500).json({
      message: 'Error en el servidor'
    }); // Enviar un mensaje de error al cliente
  }
};


export const createHCAnamnesisOdontologica = async (req, res) => {

 const data = req.body;

  console.log("QUERY:", req.body);

  try {

  
    const pool = await getConnection();
    const request = pool.request();

    
    // recorrer todos los campos enviados
    Object.entries(data).forEach(([key, value]) => {
      request.input(key, value ?? null);
    });

 
    await request.execute('sp_crear_hc_anamnesis_odontologica');
    // Recuperación de los valores de los parámetros de salida
   
    res.status(201).json({
      message: 'Anamnesis Odontologica registrada exitosamente'
      /* retorno,
      resultado */
    }); 

  } catch (error) {
    console.error('Error en la ejecución del procedimiento almacenado:', error);
    return res.status(500).json({
      message: 'Error en el servidor'
    }); // Enviar un mensaje de error al cliente
  }
};


export const createHCOdontogramaFoto = async (req, res) => {

 const data = req.body; // Debe ser un array

 
 
  if (!Array.isArray(data) || data.length === 0) {
    return res.status(400).json({
      message: "Debe enviar una lista de piezas del odontograma"
    });
  }

 
  try {

    const pool = await getConnection();

    // Crear TVP
    const tvp = new sql.Table("dbo.hc_odontogramafotoactual");

    tvp.columns.add("idhc", sql.Int);
    tvp.columns.add("idpieza", sql.Int);
    tvp.columns.add("idcara", sql.Int);
    tvp.columns.add("idsituaciondentaria", sql.Int);
    tvp.columns.add("idprofesional", sql.Int);
    tvp.columns.add("observaciones", sql.VarChar(150));
    tvp.columns.add("idusuario", sql.Int);
    

    // Agregar filas al TVP
    data.forEach(item => {

      tvp.rows.add(
        item.idhc,
        item.idpieza,
        item.idcara,
        item.idsituaciondentaria,
        item.idprofesional,
        item.observaciones || null,
        item.idusuario
      );

    });

    // Ejecutar procedimiento almacenado
    await pool.request()
      .input("NuevaFoto", tvp)
      .execute("dbo.sp_crear_hc_odontograma_foto_actual");

      console.log("Foto odontograma registrada exitosamente")
    return res.status(201).json({
      message: "Foto odontograma registrada exitosamente"
       
    });

  } catch (error) {
    console.error("Error en la ejecución del procedimiento:", error);

    return res.status(500).json({
      message: "Error en el servidor"
    });
  }
};

export const getHCAnamnesisMedicas = async (req, res) =>{

try {
 

    const {
      idpaciente
      
    } = req.query;
  
     
    const pool = await getConnection();
    const request = pool.request();

   
   
      request.input('idpaciente', sql.Int, idpaciente);

    const result = await request.execute('sp_buscar_hc_paciente_am');


   // return res.json(result.recordset);
   return res.json({
    
      anamnesis: result.recordsets[0][0] || null,
      antecedentesFamiliares: result.recordsets[1] || [],
      alergias: result.recordsets[2] || [],
      patologiasClinicas: result.recordsets[3] || []

    });

} catch (error) {
  console.error('Error en la ejecución del procedimiento almacenado:', error);
  return res.status(500).json({ message: 'Error en el servidor' }); // Enviar un mensaje de error al cliente
}
};


export const getHCNro = async (req, res) =>{

try {
 

    const {
      idpaciente
      
    } = req.query;
  
     
    const pool = await getConnection();
    const request = pool.request();
    request.input('idpaciente', sql.Int, idpaciente);

    const { recordset } = await request.execute('sp_buscar_hc_nro');
    res.json(recordset);

} catch (error) {
  console.error('Error en la ejecución del procedimiento almacenado:', error);
  return res.status(500).json({ message: 'Error en el servidor' }); // Enviar un mensaje de error al cliente
}
};


export const getHCAnamnesisOdontologica = async (req, res) =>{

try {
 

    const {
      idpaciente
      
    } = req.query;
  
    
    const pool = await getConnection();
    const request = pool.request();

    request.input('idpaciente', sql.Int, idpaciente);

    const result = await request.execute('sp_Buscar_hc_paciente_ao');


   // return res.json(result.recordset);
   return res.json({
    
      anamnesisodontologica: result.recordsets[0][0] || null,
      anormalidades: result.recordsets[1] || [],
      dificultades: result.recordsets[2] || [],
      dolores: result.recordsets[3] || [],
      lesiones: result.recordsets[4] || []

    });

} catch (error) {
  console.error('Error en la ejecución del procedimiento almacenado:', error);
  return res.status(500).json({ message: 'Error en el servidor' }); // Enviar un mensaje de error al cliente
}
};


export const getHCSituacionDentaria = async (req, res) => {
  try {
  
    const pool = await getConnection();
    const request = pool.request();

    const result = await request.execute('sp_buscar_hc_odontograma_situaciones');
    
    return res.json(result.recordsets); // ✅ enviar respuesta al cliente

  } catch (error) {
    console.error('Error en la ejecución del procedimiento almacenado:', error);
    return res.status(500).json({
      message: 'Error en el servidor'
    });
  }
};


export const getHCUltimaFoto = async (req, res) => {
  try {
  
    
    const {
      idpaciente
      
    } = req.query;
    const pool = await getConnection();
    const request = pool.request();
     request.input('idpaciente', sql.Int, idpaciente);

    const result = await request.execute('sp_buscar_hc_odontograma_ultima_foto');
    
    return res.json(result.recordsets); // ✅ enviar respuesta al cliente

  } catch (error) {
    console.error('Error en la ejecución del procedimiento almacenado:', error);
    return res.status(500).json({
      message: 'Error en el servidor'
    });
  }
};
