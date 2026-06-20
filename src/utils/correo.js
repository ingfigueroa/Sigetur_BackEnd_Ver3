import bcrypt from 'bcrypt';

import nodemailer from 'nodemailer';

 /*  export const generarTokenHash =  () => {

    const tokenProvisorio = Math.floor(100000 + Math.random() * 900000).toString()
    
    const saltRounds = 10;
    const tokenHash = bcrypt.hash(tokenProvisorio, saltRounds);
  console.log(tokenHash)
    return tokenHash;
   };

 */

   import crypto from 'crypto';

export const generarTokenHash = () => {
  //esta funcion genera el token y luego el hash
  const token = crypto.randomInt(100000, 1000000).toString();

  const hash = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  return { token, hash };
};

export const verificarToken = (tokenIngresado, hashGuardado) => {
  const hashIngresado = crypto
    .createHash('sha256')
    .update(tokenIngresado)
    .digest('hex');

  return hashIngresado === hashGuardado;
};

export const generarHash = (token) => {
  
//esta funcion recibe el token genera el hash para luego compararla
  const hash = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  return  hash;
};

