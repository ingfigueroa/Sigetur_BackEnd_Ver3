import { verificarToken } from "./middlewares/auth.js";

app.get("/perfil", verificarToken, (req, res) => {
  res.json({
    mensaje: "Acceso permitido",
    user: req.user
  });
});