import { Router } from "express";
import multer from "multer";

import {
    getTiposEstudio,
    subirYGuardarArchivo
} from '../controllers/tiposestudio.controllers.js';

const router = Router();

const upload = multer({
    dest: 'uploads'
});

router.get("/tiposestudio", getTiposEstudio);

router.post(
    "/subirarchivo",
    upload.single("archivos"),
    subirYGuardarArchivo
);

export default router;