import {
  getConnection,
  sql
} from '../database/connection.js'

import {formatearFechaLargaConelAnio_llegafechalarga} from '../utils/fechas.js'


import nodemailer from 'nodemailer';
import {
  generarTokenHash
} from '../utils/correo.js'

const pool = await getConnection();






export const postCrearCuenta = async (req, res) => {

  const {
    email
  } = req.body;
  const {
    token,
    hash
  } = generarTokenHash();




  try {


    //tendria que guardar el codigo y el mail 
    //para despues comparar


    const result = await createCodigoCrearCuenta(email, hash);


    if (!result.ok) {
      return res.json({
        ok: false,
        message: result.message
      });
    }



    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });


    const linkRegistro = `http://localhost:5173/crearcuentapasodos?token=${token}`;

    await transporter.sendMail({
      from: `SIGETUR <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "SIGETUR - CREAR CUENTA DE ACCESO",
      html: `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    
    <h2 style="color:#0d6efd;">Bienvenido a SIGETUR</h2>
    
    <p>
      Hemos recibido una solicitud para crear una cuenta de acceso en el sistema.
    </p>
    <h2>Tu código es:</h2>
        <h1 >${token}</h1>
        <p>Válido por 10 minutos</p>
        
    <p>
      Para completar el proceso de registro, hacé clic en el botón que aparece a continuación:
    </p>

    <div style="margin: 30px 0;">
      <a href="${linkRegistro}" 
         style="padding:12px 25px; background:#0d6efd; color:white; text-decoration:none; border-radius:5px; font-weight:bold;">
         Enviar Código
      </a>
    </div>

    <p>
      Este enlace te permitirá acceder al formulario de registro donde podrás definir tu contraseña 
      y completar tus datos personales.
    </p>

    <p>
      Por razones de seguridad, este enlace puede tener una validez limitada.
    </p>

    <hr style="margin:30px 0;" />

    <p style="font-size: 14px; color: #777;">
      Si no solicitaste la creación de esta cuenta, podés ignorar este mensaje.
    </p>

    <p style="font-size: 14px; color: #777;">
      Este es un mensaje automático, por favor no responder.
    </p>

    <p style="margin-top:20px;">
      Saludos,<br/>
      <strong>Equipo SIGETUR</strong>
    </p>

  </div>`,
    });

    res.status(200).json({
      ok: true,
      message: "Mail enviado correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      message: "Error al enviar el mail",
    });
  }
};




export const tokenResetPassword = async (email, token) => {


  try {
    if (!email || !token) {
      throw new Error('Email y token son requeridos');
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });


    const linkRegistro = `http://localhost:5173/resetpassword?token=${token}`;
    // 📤 Enviar mail
    await transporter.sendMail({
      from: `SIGETUR <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "SIGETUR - ACTUALIZAR CONTRASEÑA",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          
          <h2 style="color:#0d6efd;">SIGETUR - ACTUALIZAR CONTRASEÑA</h2>
          
          <p>Hemos recibido un pedido de cambio o actualización de contraseña.</p>

          <h3>Tu código provisorio es:</h3>
          <h1 style="letter-spacing:2px;">${token}</h1>
          <p>Válido por 20 minutos</p>
          
          <p>Para completar el proceso, hacé clic en el siguiente botón:</p>

          <div style="margin: 30px 0;">
            <a href="${linkRegistro}" 
               style="padding:12px 25px; background:#0d6efd; color:white; text-decoration:none; border-radius:5px; font-weight:bold;">
               Cambiar contraseña
            </a>
          </div>

          <p>Este enlace te permitirá acceder al formulario de actualización de contraseña.</p>

          <hr style="margin:30px 0;" />

          <p style="font-size: 14px; color: #777;">
            Si no solicitaste este cambio, podés ignorar este mensaje.
          </p>

          <p style="font-size: 14px; color: #777;">
            ESTE ES UN MENSAJE AUTOMÁTICO, NO RESPONDER.
          </p>

          <p style="margin-top:20px;">
            Saludos,<br/>
            <strong>Equipo SIGETUR</strong>
          </p>

        </div>
      `,
    });

    return true;
  } catch (error) {
    console.error('Error enviando mail:', error);
    return false;

  }

};

export const createCodigoCrearCuenta = async (email, tokenhash) => {


  try {
    const pool = await getConnection();
    const request = pool.request();



    request.input('email', sql.VarChar, email);
    request.input('tokenhash', sql.VarChar, tokenhash);

    const result = await request.execute('sp_crear_codigo_crear_cuenta');

    // 👇 Tomar el primer resultado
    const respuesta = result.recordset[0];

    if (respuesta.Resultado === 0) {
      // Email ya existe
      return {
        ok: false,
        message: respuesta.Mensaje
      };
    }

    if (respuesta.Resultado === 1) {
      // Todo OK
      return {
        ok: true,
        message: respuesta.Mensaje
      };
    }

    // Error SQL
    return {
      ok: false,
      message: respuesta.Mensaje
    };

  } catch (error) {
    console.error('Error en el procedimiento:', error);
    throw error; // 🔥 importante
  }
};

export const postEnviarRecordatorioxMailTodaLaGrilla = async (req, res) => {
  try {

    const {
      turnos,
      clinica

    }
     = req.body;

    let enviados = 0;
let omitidos = 0;
  
    for (const turno of turnos) {
      
      if (!turno.emailpaciente || turno.emailpaciente.trim() === "") {
        omitidos++;
        continue;
      }
     
      await enviarRecordatorioTurno(
        turno,
       
        clinica
      );

      enviados++;
    }


    res.status(200).json({
      ok: true,
      cantidad: turnos.length
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      ok: false,
      message: error.message
    });
  }
};

export const postEnviarRecordatorioxMailPacienteSeleccionado = async (req, res) => {
  try {

    const {
      turno,
     
      clinica

    }
     = req.body;


  
  
      await enviarRecordatorioTurno(
        turno,
        
        clinica
      );



    res.status(200).json({
      ok: true,
      cantidad: turnos.length
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      ok: false,
      message: error.message
    });
  }
};

export const enviarRecordatorioTurno = async (turno, clinica) => {
  try {
    
   
    if (turno.estado === 'PENDIENTE'){

        
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        await transporter.sendMail({
          from: `SIGETUR <${process.env.EMAIL_USER}>`,
          to: turno.emailpaciente,
          subject: "Recordatorio de Turno",
          html: `
            <h3>Estimado/a ${turno.apenompaciente}</h3>
            <h4>Desde ${clinica}</h4>
            <h3>Queremos recordarle que posee un turno con el profesional ${turno.apenomprof},</h3>
            <h3>con los siguientes datos:</h3>

            <ul>
              <li>Fecha: ${formatearFechaLargaConelAnio_llegafechalarga(turno.fecha)}</li> 
              <li>Hora: ${turno.hora}</li>
              <li>Servicio: ${turno.servicio}</li>
              <li>Obra Social: ${turno.os}</li>
              
             

            </ul> 

            <p>Saludos.</p>
          `,
        });

        return true;
    }

  } catch (error) {
    console.error(error);
    return false;
  }
};