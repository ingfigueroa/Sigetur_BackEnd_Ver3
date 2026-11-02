import { getConnection } from '../database/connection.js';



import sql from 'mssql';

import 'dotenv/config';
import { google } from 'googleapis';
import fs from 'fs';

export const getTiposEstudio = async (req, res) => {
    try {
           
      const pool = await getConnection();
      const request = pool.request();
      let result;
          
      result = await request.execute('sp_Buscar_tiposestudio');
           
      return res.json(result.recordset);
      
    } catch (error) {
        
        return res.status(500).json({ message: 'Error en el servidor' });
    } 
};

export const subirArchivoGoogleDrive = async (archivo) => {

    // ID de la carpeta de Google Drive
    const GOOGLE_DRIVE_FOLDER_ID =
        process.env.GOOGLE_DRIVE_FOLDER_ID;
        
const auth = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,     // 1° Parámetro: Client ID
        process.env.GOOGLE_CLIENT_SECRET, // 2° Parámetro: Client Secret
        process.env.GOOGLE_REDIRECT_URI   // 3° Parámetro: Redirect URI
    );

    auth.setCredentials({
        refresh_token: process.env.GOOGLE_REFRESH_TOKEN
    });

    const drive = google.drive({
        version: 'v3',
        auth
    });

    try {

        // ==========================================
        // Subir archivo a Google Drive
        // ==========================================

        const response = await drive.files.create({

            requestBody: {
                name: archivo.originalname,
                parents: [GOOGLE_DRIVE_FOLDER_ID]
            },

            media: {
                mimeType: archivo.mimetype,
                body: fs.createReadStream(archivo.path)
            },

            fields: 'id, name, webViewLink'
        });


        // ==========================================
        // Devolver información del archivo
        // ==========================================

        return {
            id: response.data.id,
            nombre: response.data.name,
            enlace: response.data.webViewLink
        };


    } catch (error) {

        console.error(
            'Error en la carga a Google Drive:',
            error
        );

        throw error;
    }
};



export const obtenerImagenGoogleDrive = async (idArchivo) => {
    
    const auth = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URI
    );

    auth.setCredentials({
        refresh_token: process.env.GOOGLE_REFRESH_TOKEN
    });

    const drive = google.drive({
        version: "v3",
        auth
    });

    const metadata = await drive.files.get({
        fileId: idArchivo,
        fields: "mimeType"
    });

    const respuesta = await drive.files.get(
        {
            fileId: idArchivo,
            alt: "media"
        },
        {
            responseType: "stream"
        }
    );

    return {
        mimeType: metadata.data.mimeType || "application/octet-stream",
        stream: respuesta.data
    };
};

export const mostrarImagenMedica = async (req, res) => {
    try {
        const { idDrive } = req.query;
        
        if (!idDrive) {
            return res.status(400).json({ mensaje: "Falta el ID de Google Drive." });
        }
        
        const imagen = await obtenerImagenGoogleDrive(idDrive);

        res.setHeader("Content-Type", imagen.mimeType);
        res.setHeader("Cache-Control", "private, no-store");

        imagen.stream.on("error", (error) => {
            console.error("Error en el stream de Google Drive:", error); // <-- Añadido
            if (!res.headersSent) {
                res.status(500).end();
            } else {
                res.destroy(error);
            }
        });

        imagen.stream.pipe(res);

    } catch (error) {
        // --- AQUÍ ESTÁ LA CLAVE PARA VER EL ERROR EN CONSOLA ---
        console.error("DETALLE DEL ERROR 500 EN GOOGLE DRIVE:", error.message || error);
        console.error(error); // Muestra el stack trace completo

        if (!res.headersSent) {
            res.status(500).json({
                mensaje: "No se pudo obtener la imagen médica.",
                error: error.message // Opcional: envíalo temporalmente al frontend para verlo en la consola del navegador
            });
        }
    }
};



export const postGuardarArchivoMedico = async ({
    idpaciente,
    idturno,
    googledriveid,
    googledrivelink,
    idtipoestudio,
    notasclinicas,
    idprofesional

}) => {

    try {

        const pool = await getConnection();

        const request = pool.request();

        request.input('idturno', sql.Int, idturno);
        request.input('idpaciente', sql.Int, idpaciente);
        request.input('idprofesional', sql.Int, idprofesional);
        
        request.input('googledriveid', sql.VarChar(255), googledriveid);
        request.input('googledrivelink', sql.VarChar(500), googledrivelink);
        request.input('idtipoestudio', sql.Int, idtipoestudio);
        request.input('notasclinicas', sql.VarChar(255), notasclinicas); 
       

        const result = await request.execute('sp_subir_archivos');

        const id = result.recordset[0].id;

      

        return id;


    } catch (error) {
  
        throw new Error('Error al guardar archivo médico: ' + error.message);

    }
};




export const subirYGuardarArchivo = async (req, res) => {

    try {
        console.log("DEBUG PRODUCCIÓN - FOLDER ID:", process.env.GOOGLE_DRIVE_FOLDER_ID ? "Existe" : "FALTA");
console.log("DEBUG PRODUCCIÓN - REFRESH TOKEN:", process.env.GOOGLE_REFRESH_TOKEN ? "Existe" : "FALTA");

        const archivoDrive = await subirArchivoGoogleDrive(req.file);

        const id = await postGuardarArchivoMedico({
            idpaciente: req.body.idpaciente,
            idturno: req.body.idturno,
            googledriveid: archivoDrive.id,
            googledrivelink: archivoDrive.enlace,
            idtipoestudio: req.body.idTipoEstudio,
            notasclinicas: req.body.notasclinicas,
            idprofesional: req.body.idprofesional
        });

        return res.status(200).json({
            ok: true,
            id: id
        });

    } catch (error) {
        console.error('--- ERROR DETALLADO EN GOOGLE DRIVE ---');
        console.error('Mensaje:', error.message);
        if (error.errors) {
            console.error('Errores de la API:', JSON.stringify(error.errors, null, 2));
        } else {
            console.error('Stack trace:', error.stack);
        }
        
        throw error;
    }
};

export const getTiposEstudioIDPaciente = async (req, res) => {
  try {
    const { idpaciente } = req.query;

   

    if (!idpaciente) {
      return res.status(400).json({
        message: "Falta el idpaciente",
      });
    }

    const pool = await getConnection();
    const request = pool.request();

    request.input("idpaciente", sql.Int, idpaciente);

    const result = await request.execute(
      "sp_Buscar_archivos_medicos_idpaciente"
    );

    return res.status(200).json(result.recordset);

  } catch (error) {
    console.error("Error al buscar estudios médicos:", error);

    return res.status(500).json({
      message: "Error en el servidor",
    });
  }
};
