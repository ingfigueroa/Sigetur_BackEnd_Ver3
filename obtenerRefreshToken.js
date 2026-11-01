import 'dotenv/config';
import express from 'express';
import { google } from 'googleapis';

const app = express();

const PORT = 3000;

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
    //'http://localhost:3000/oauth2callback'
);

const SCOPES = [
    'https://www.googleapis.com/auth/drive'
];

// Ruta para iniciar autorización
app.get('/autorizar', (req, res) => {

    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: SCOPES
    });

    res.send(`
        <h2>Autorización de Google Drive</h2>
        <p>
            <a href="${authUrl}">
                Hacer clic aquí para autorizar SIGETUR
            </a>
        </p>
    `);
});

// Callback de Google
app.get('/oauth2callback', async (req, res) => {

    const code = req.query.code;

    if (!code) {
        return res.status(400).send('No se recibió el código de autorización.');
    }

    try {

        const { tokens } = await oauth2Client.getToken(code);

        console.log('\n==============================');
        console.log('TOKENS RECIBIDOS');
        console.log('==============================\n');

        console.log(tokens);

        console.log('\n==============================');
        console.log('GOOGLE_REFRESH_TOKEN');
        console.log('==============================\n');

        console.log(tokens.refresh_token);

        res.send(`
            <h2>Autorización correcta</h2>
            <p>El Refresh Token fue obtenido.</p>
            <p>Podés cerrar esta ventana.</p>
        `);

    } catch (error) {

        console.error('Error obteniendo tokens:', error.response?.data || error);

        res.status(500).send(`
            <h2>Error obteniendo el token</h2>
            <pre>${error.message}</pre>
        `);
    }
});

app.listen(PORT, () => {

    console.log(`
========================================
Servidor OAuth SIGETUR
========================================

Abrí en el navegador:

http://localhost:${PORT}/autorizar

========================================
`);
});