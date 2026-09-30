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
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET
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

        console.error(
            'Error al subir y guardar archivo:',
            error
        );

        return res.status(500).json({
            ok: false,
            mensaje: error.message
        });
    }
};
