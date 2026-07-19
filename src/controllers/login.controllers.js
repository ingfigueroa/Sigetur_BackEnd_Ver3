import bcrypt from 'bcrypt';

import { getConnection, sql } from '../database/connection.js';

import { generarTokenHash, verificarToken, generarHash} from '../utils/correo.js'

import {tokenResetPassword} from '../controllers/correo.controllers.js'

import jwt from "jsonwebtoken";



export const getControlarToken = async (req, res) => {
    try {
      const {token } = req.query

      
          // 🔑 generar hash
        const passwordHash = generarHash(token); 

        

      const pool = await getConnection();
      const request = pool.request();
      let result;

  
       request.input('tokenhash', sql.VarChar, passwordHash )
     
      result = await request.execute('sp_buscar_token_usuario');
   
       
      

     const idusuario = result.recordset[0].idusuario;

      // ✅ token válido
      return res.json(idusuario);
     



    } catch (error) {
      console.error( error);
      return res.status(500).json({ message: 'Error en el servidor' }); // Enviar un mensaje de error al cliente
    
    }
  };


  
export const getIdUsuario = async (email) => {
    try {
 
      const pool = await getConnection();
      const request = pool.request();
  

  
       request.input('email', sql.VarChar, email )
     
     const result = await request.execute('sp_buscar_id_usuario');

      const idUsuario = result?.recordset?.[0]?.id;

      if (!idUsuario || idUsuario === 0) {
        throw new Error('No se puede resetear la password');
      }

      // ✅ token válido
          return idUsuario;
          
    } catch (error) {
      console.error( error);
      return res.status(500).json({ message: 'Error en el servidor' }); // Enviar un mensaje de error al cliente
    
    }
  };

  
export const postUpdatePassword = async (req, res) => {
    try {
      const {password, idusuario } = req.body;
      const pool = await getConnection();
      const request = pool.request();
      let result;
    
      const saltRounds = 10;
      // 🔑 generar hash
      const passwordHash = await bcrypt.hash(password, saltRounds);

      
      request.input('password', sql.NVarChar, passwordHash )
      request.input('idusuario', sql.Int, idusuario )
     
      result = await request.execute('sp_usuario_actualizar_password');
      
     res.json(result.recordset[0].resultado); // 👈 IMPORTANTE
     
 


    } catch (error) {
      console.error('Error en la ejecución del procedimiento almacenado:', error);
      return res.status(500).json({ message: 'Error en el servidor' }); // Enviar un mensaje de error al cliente
    
    }
  };


  export const postAddTokenTransitorio = async (idusuario, tokenhash) => {
    try {
    
      const pool = await getConnection();
      const request = pool.request();
      let result;

  

      request.input('idusuario', sql.Int, idusuario )
      request.input('tokenhash', sql.VarChar, tokenhash )
     
      result = await request.execute('sp_crear_Token_Transitorio');
      return result.recordset // 👈 IMPORTANTE
     



    } catch (error) {
      console.error('Error en la ejecución del procedimiento almacenado:', error);
      return res.status(500).json({ message: 'Error en el servidor' }); // Enviar un mensaje de error al cliente
    
    }
  };

  
export const enviarTokenProfesional = async (req, res) => {

  const {token, hash} = generarTokenHash();

  const {email} = req.query;
try { 

      //validar mail soi existe, sino no enviamos o generamos token



      //tendria que guardar el codigo y el mail 
      //para despues comparar
     
      const idusuario = await getIdUsuario(email)
     
      const result = await postAddTokenTransitorio(idusuario, hash);

      const resp = await tokenResetPassword(email, token);
   

    return res.status(200).json({
      success: true,
     
    });

  } catch (error) {
    
    res.status(500).json({
      ok: false,
      message: "Error al generar el token.",
    });
  }
};


export const getUsuarioId = async (req, res) => {
    try {
      const {email } = req.query
      const pool = await getConnection();
      const request = pool.request();
      let result;

     
       request.input('usuario', sql.NVarChar, email )
     
      result = await request.execute('sp_usuario_existe');
      
      const id = result.recordset[0]?.id ?? 0;
      res.json({ id });



    } catch (error) {
      console.error('Error en la ejecución del procedimiento almacenado:', error);
      return res.status(500).json({ message: 'Error en el servidor' }); // Enviar un mensaje de error al cliente
    
    }
  };


export const getLoginUsuario = async (req, res) => {

const SECRET = process.env.JWT_SECRET;

  const { email, password } = req.body;

  try {
    const pool = await getConnection();
    const request = pool.request();

    request.input('email', sql.VarChar, email);


    const result = await request.execute('sp_login_usuario');


    const user = result.recordset[0];

    if (!user) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    const hashGuardado = user.ContraseniaHash;

    const isValid = await bcrypt.compare(password, hashGuardado);

    if (isValid) {

      // 🔐 1. armar payload
      const payload = {
        clienteid: user.clienteid,
        usuarioid: user.usuarioid,
        roles: [user.roles]
      };

   
      // 🔐 2. generar token
      const token = jwt.sign(payload, SECRET, {
        expiresIn: "1h"
      });

      // 🔐 3. sacar contraseña
      const { ContraseniaHash, ...userSinPassword } = user;

      // 🔐 4. devolver todo
      return res.json({
        isValid: true,
        user: userSinPassword,
        token
      });

    } else {
      return res.status(401).json({
        isValid: false,
        mensaje: "Contraseña incorrecta"
      });
    }

  } catch (error) {
    console.error('Error en el procedimiento:', error);
    return res.status(500).json({ error: "Error interno" });
  }
};;
