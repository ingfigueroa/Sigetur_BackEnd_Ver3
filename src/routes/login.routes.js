import { Router } from "express";

import { getControlarToken, postUpdatePassword,  enviarTokenProfesional, getLoginUsuario} from '../controllers/login.controllers.js';

const router = Router();

router.get("/validartoken", getControlarToken);
router.post("/updatepassword", postUpdatePassword);
router.get("/enviartokenemailprofesional",  enviarTokenProfesional);
router.post("/loginusuario", getLoginUsuario)



export default router;