import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET = process.env.JWT_SECRET;

export const verificarTokenUsuario = (req, res, next) => {

  

  const authHeader = req.headers.authorization;

  if (!authHeader) {

   

    return res.status(401).json({
      mensaje: "Token requerido"
    });
  }

  const token = authHeader.split(" ")[1];

 

  try {

    const decoded = jwt.verify(token, SECRET);

  

    req.user = decoded;

    next();

  } catch (error) {
 
   

    return res.status(401).json({
      mensaje: "Token inválido o expirado"
    });
  }
};

