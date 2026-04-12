import {
  getConnection,
  sql
} from '../database/connection.js'



const pool = await getConnection();
 const generarCodigo = () => {
      return Math.floor(100000 + Math.random() * 900000).toString();
   };


import nodemailer from "nodemailer";


export const postCrearCuenta = async (req, res) => {

  const { email} = req.body;
  const codigo = generarCodigo();

  try {



   //tendria que guardar el codigo y el mail 
   //para despues comparar
  

      const result = await createCodigoCrearCuenta(email,codigo);
     

    if (!result.ok){
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

   // const linkRegistro = `http://localhost:3000/configuracion?email=${email}`;

   const linkRegistro = `http://localhost:5173/crearcuentapasodos?codigo=${codigo}`;

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
        <h1 >${codigo}</h1>
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

export const createCodigoCrearCuenta = async (email, codigo) => {
  

  try {
    const pool = await getConnection();
    const request = pool.request();
          
      request.input('email', sql.VarChar, email);
      request.input('codigo', sql.Int, codigo);

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