import { Router } from "express";
import { getValidarCodigoEmail, postCrearCliente, getValoresPantallaInicio} from "../controllers/clientes.controllers.js";

const router = Router();

router.get("/validarcodigoemail", getValidarCodigoEmail); //route para mandar el mail manda el mail

router.post("/crearcliente", postCrearCliente);

router.get("/valorespantallainicio", getValoresPantallaInicio);






export default router;