
import { Router } from "express";
import multer from "multer";

import {verificarTokenUsuario} from "../middleware/auth.js";

import authorize from "../middleware/authorize.js";

import ROLES from "../constants/roles.js";

import {
    getTiposEstudio,
    subirYGuardarArchivo,
    mostrarImagenMedica,
    getTiposEstudioIDPaciente
} from "../controllers/tiposestudio.controllers.js";


const router = Router();

const upload = multer({
    dest: "uploads"
});

router.get("/tiposestudio",verificarTokenUsuario,  authorize([ROLES.ADMIN, ROLES.SECRETARIA]), getTiposEstudio);

router.post(
    "/subirarchivo",
    upload.single("archivos"),verificarTokenUsuario,  authorize([ROLES.ADMIN, ROLES.SECRETARIA]),
    subirYGuardarArchivo
);


router.get(
    "/obtenerimagendrive",  mostrarImagenMedica
);

router.get("/estudiosmedicosbuscar",verificarTokenUsuario,  authorize([ROLES.ADMIN, ROLES.SECRETARIA]), getTiposEstudioIDPaciente);

export default router;
