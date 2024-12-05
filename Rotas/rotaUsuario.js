import { Router } from "express"
import UsuarioCtrl from "../Controle/usuarioCtrl.js"

const userCtrl = new UsuarioCtrl()
const rotaUsuario = Router()

rotaUsuario.post("/", userCtrl.gravar)
rotaUsuario.put("/:codigo", userCtrl.editar)
rotaUsuario.patch("/:codigo", userCtrl.editar)
rotaUsuario.delete("/:codigo", userCtrl.excluir)
rotaUsuario.get("/:codigo", userCtrl.consultar)
rotaUsuario.get("/", userCtrl.consultar)

export default rotaUsuario