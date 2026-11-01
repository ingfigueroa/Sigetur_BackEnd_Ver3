import { google } from 'googleapis';
import http from 'http';
import url from 'url';
import 'dotenv/config';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:3000/oauth2callback'; // Exactamente la que tienes habilitada

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

const scopes = ['https://www.googleapis.com/auth/drive'];

const authorizeUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: scopes,
});

// Levantamos un servidor temporal en el puerto 3000 para capturar la respuesta de Google
const server = http.createServer(async (req, res) => {
    try {
        const qs = url.parse(req.url, true).query;
        if (qs.code) {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end('<h1>¡Autenticación exitosa!</h1><p>Ya puedes cerrar esta pestaña y volver a la terminal.</p>');
            
            server.close();

            // Intercambiamos el código por los tokens
            const { tokens } = await oauth2Client.getToken(qs.code);
            
            console.log('\n----------------------------------------');
            console.log('¡TUVIMOS ÉXITO! COPIA ESTE REFRESH TOKEN:');
            console.log('----------------------------------------');
            console.log(tokens.refresh_token);
            console.log('----------------------------------------\n');
        }
    } catch (e) {
        console.error('Error al obtener el token:', e);
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('Error al autenticar.');
    }
});

server.listen(3000, () => {
    console.log('\n1. Abre este enlace en tu navegador:\n');
    console.log(authorizeUrl);
    console.log('\n2. Esperando a que autorices en el navegador...\n');
});