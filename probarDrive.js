import 'dotenv/config';
import { google } from 'googleapis';
import fs from 'fs';

console.log('CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? 'OK' : 'FALTA');
console.log('CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? 'OK' : 'FALTA');
console.log('REFRESH_TOKEN:', process.env.GOOGLE_REFRESH_TOKEN ? 'OK' : 'FALTA');
console.log('FOLDER_ID:', process.env.GOOGLE_DRIVE_FOLDER_ID ? 'OK' : 'FALTA');

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

async function subirArchivo() {

    try {

       /*      const response = await drive.files.create({
                requestBody: {
                    name: 'am.png',
                    parents: [process.env.GOOGLE_DRIVE_FOLDER_ID]
                },
                media: {
                    mimeType: 'text/plain',
                    body: fs.createReadStream('./am.png')
                },
                fields: 'id, name, webViewLink'
            });
 */
const response = await drive.files.create({
    requestBody: {
        name: 'am.png',
        parents: [process.env.GOOGLE_DRIVE_FOLDER_ID]
    },
    media: {
        mimeType: 'image/png',
        body: fs.createReadStream('./am.png')
    },
    fields: 'id, name, webViewLink'
});
        console.log('Archivo subido correctamente:');
        console.log(response.data);

    } catch (error) {

        console.error(
            'Error subiendo archivo:',
            error.response?.data || error.message
        );
    }
}

subirArchivo();