import { Router } from "express";



import { getEmail } from '../controllers/usuarios.controllers.js';


const router = Router();

router.get("/usuarioemail",  getEmail)

export default router;