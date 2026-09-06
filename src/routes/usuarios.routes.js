import { Router } from "express";

import {verificarTokenUsuario} from "../middleware/auth.js";

import authorize from "../middleware/authorize.js";

import ROLES from "../constants/roles.js";

import { getEmail } from '../controllers/usuarios.controllers.js';


const router = Router();

router.get("/usuarioemail",  getEmail)

export default router;