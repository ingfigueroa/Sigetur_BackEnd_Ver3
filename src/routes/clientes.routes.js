import { Router } from "express";
import { getValidarCodigoEmail, postCrearCliente} from "../controllers/clientes.controllers.js";

const router = Router();

router.get("/validarcodigoemail", getValidarCodigoEmail); //route para mandar el mail manda el mail

router.post("/crearcliente", postCrearCliente);


export default router;