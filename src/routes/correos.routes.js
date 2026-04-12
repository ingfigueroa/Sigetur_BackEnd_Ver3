import { Router } from "express";
import { postCrearCuenta, createCodigoCrearCuenta } from "../controllers/correo.controllers.js";

const router = Router();

router.post("/crearcuenta", postCrearCuenta); //route para mandar el mail manda el mail
router.post("/crearcodigoadd", createCodigoCrearCuenta);

export default router;