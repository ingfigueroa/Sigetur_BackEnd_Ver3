import { Router } from "express";
import { getValorOficialDolar} from "../controllers/apipublicas.controllers.js";

const router = Router();

router.get("/valordolaroficial", getValorOficialDolar); //route para mandar el mail manda el mail


export default router;