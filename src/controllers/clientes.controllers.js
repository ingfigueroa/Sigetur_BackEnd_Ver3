import {
  getConnection,
  sql
} from '../database/connection.js'



import {tokenResetPassword} from '../controllers/correo.controllers.js'

import { generarTokenHash, verificarToken } from '../utils/correo.js';




export const postCrearCliente = async (req, res) => {
  const { token, hash } = generarTokenHash();

  const {
    email,
	  razonsocial,
	  tipocliente
  } = req.body || {};

  try {
    const pool = await getConnection();
    const request = pool.request();
    
    request.input('email', sql.VarChar, email);
    request.input('razonsocial', sql.VarChar, razonsocial);
    request.input('tipocliente', sql.VarChar, tipocliente);
    request.input('tokenhash', sql.NVarChar, hash);

    const result = await request.execute('sp_crear_cliente'); 

    // 👇 agarrás el primer resultado
    const data = result.recordset[0];

    const tokenhash = await tokenResetPassword(email, token);

    res.status(201).json({
      message: 'Cliente registrado exitosamente',
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
    token
  } = req.query;

  try {
    const pool = await getConnection();
    const request = pool.request();
    
    request.input('email', sql.VarChar, email);
    
    const result = await request.execute('sp_buscar_token_crear_cuenta');

    const hashguardado = result.recordset[0].tokenhash;
    const verificado = verificarToken(token, hashguardado); //true o false

    return res.json(verificado); // 👈 IMPORTANTE
     
  } catch (error) {
    console.error('Error en el procedimiento:', error);
    throw error; // 🔥 importante
  }
};



export const getValoresPantallaInicio = async (req, res) => {
  
 const {
    
    idcliente,
    idusuario
  } = req.query;

  try {
    const pool = await getConnection();
    const request = pool.request();

    request.input('idcliente', sql.Int, idcliente);
    request.input('idusuario', sql.Int, idusuario);

  

    const result = await request.execute('sp_Buscar_Sigetur_Pantalla_Inicio');

    return res.json({
    
      cliente: result.recordsets[0] || null,
      usuario: result.recordsets[1] || null,
      cantidadprofesionales: result.recordsets[2] || null,
      perfil: result.recordsets[3] || null,
      

    });
     
  } catch (error) {
    console.error('Error en el procedimiento:', error);
    throw error; // 🔥 importante
  }
};



