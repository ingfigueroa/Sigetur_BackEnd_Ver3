import { Router } from "express";
import { postCrearCuenta, createCodigoCrearCuenta, tokenResetPassword, postEnviarRecordatorioxMailTodaLaGrilla, postEnviarRecordatorioxMailPacienteSeleccionado} from "../controllers/correo.controllers.js";
import { token } from "morgan";

const router = Router();


router.post("/crearcodigoadd", createCodigoCrearCuenta);

//todo lo que es mail
router.post("/crearcuenta", postCrearCuenta); //route para mandar el mail manda el mail
router.get("/tokenresetpassword", tokenResetPassword); //route para mandar el token por mail
router.post("/correos/urlenviarrecordatorioxmailtodalagrilla", postEnviarRecordatorioxMailTodaLaGrilla)
router.post("/correos/urlenviarrecordatorioxmailpacienteseleccionado", postEnviarRecordatorioxMailPacienteSeleccionado)

export default router;